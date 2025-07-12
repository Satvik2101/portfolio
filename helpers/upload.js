"use strict";

const { S3Client, GetObjectCommand, PutObjectCommand, DeleteObjectsCommand } = require("@aws-sdk/client-s3");
const { CloudFrontClient, CreateInvalidationCommand } = require("@aws-sdk/client-cloudfront");
const { readFile } = require("fs/promises");
const fs = require("fs");
const path = require("path");

// Configuration
const BUCKET = process.env.S3_BUCKET;
const CLOUDFRONT_DISTRIBUTION_ID = process.env.CLOUDFRONT_DISTRIBUTION_ID;
const MANIFEST_KEY = "manifest.json";
const LOCAL_MANIFEST_PATH = "build/manifest.json";
const LOCAL_ROOT = "web";
const AWS_REGION = "ap-south-1";

// AWS Clients
const s3 = new S3Client({
    region: AWS_REGION,
    endpoint: `https://s3.${AWS_REGION}.amazonaws.com`
});

const cloudfront = new CloudFrontClient({ region: AWS_REGION });

// Content type mapping
const CONTENT_TYPES = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.json': 'application/json',
    '.svg': 'image/svg+xml',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg'
};

/**
 * Validate required environment variables
 */
function validateEnvironment() {
    if (!BUCKET || BUCKET.length === 0 || !CLOUDFRONT_DISTRIBUTION_ID || CLOUDFRONT_DISTRIBUTION_ID.length === 0) {
        console.error("Bucket ID and CloudFront Distribution ID must be provided");
        process.exit(1);
    }
}

/**
 * Get remote manifest from S3
 */
async function getRemoteManifest() {
    try {
        const command = new GetObjectCommand({ Bucket: BUCKET, Key: MANIFEST_KEY });
        const { Body } = await s3.send(command);
        const bytes = await Body.transformToByteArray();
        return JSON.parse(Buffer.from(bytes).toString("utf-8"));
    } catch (error) {
        if (error.name === "NoSuchKey" || error.$metadata?.httpStatusCode === 404) {
            console.warn(`Remote manifest not found (key: ${MANIFEST_KEY}) — returning empty object.`);
            return {};
        }
        console.error("Failed to get remote manifest:", error);
        process.exit(1);
    }
}

/**
 * Compare local and remote manifests
 */
async function compareManifests() {
    const local = JSON.parse(await readFile(LOCAL_MANIFEST_PATH, "utf-8"));
    const remote = await getRemoteManifest();

    const upload = { new: [], changed: [] };
    const toDelete = [];
    const keep = [];

    // Check local files against remote
    for (const [file, hash] of Object.entries(local)) {
        if (!(file in remote)) {
            upload.new.push(file);
        } else if (remote[file] !== hash) {
            upload.changed.push(file);
        } else {
            keep.push(file);
        }
    }

    // Check for files to delete (in remote but not in local)
    for (const file of Object.keys(remote)) {
        if (!(file in local)) {
            toDelete.push(file);
        }
    }

    return { upload, delete: toDelete, keep };
}

/**
 * Get content type for a file
 */
function getContentType(file) {
    const extension = path.extname(file).toLowerCase();
    return CONTENT_TYPES[extension] || "application/octet-stream";
}

/**
 * Convert file path to S3 key (remove .html extension)
 */
function getS3Key(file) {
    return file.endsWith(".html") ? file.slice(0, -5) : file;
}

/**
 * Upload files to S3
 */
async function uploadToS3(compareResults) {
    const { upload, delete: toDelete } = compareResults;
    console.log("Upload plan:", compareResults);

    // Upload new and changed files
    const filesToUpload = [...upload.new, ...upload.changed];

    for (const file of filesToUpload) {
        const filePath = path.join(LOCAL_ROOT, file);
        const fileStream = fs.createReadStream(filePath);
        const key = getS3Key(file);

        const putCommand = new PutObjectCommand({
            Bucket: BUCKET,
            Key: key,
            Body: fileStream,
            ContentType: getContentType(file),
        });

        try {
            await s3.send(putCommand);
            console.log(`Uploaded: ${filePath} → ${key}`);
        } catch (error) {
            console.error(`Failed to upload ${file}:`, error);
        }
    }

    // Delete files that no longer exist locally
    if (toDelete.length > 0) {
        await deleteFromS3(toDelete);
    }
}

/**
 * Delete files from S3
 */
async function deleteFromS3(filesToDelete) {
    const deleteParams = {
        Bucket: BUCKET,
        Delete: {
            Objects: filesToDelete.map(file => ({ Key: getS3Key(file) })),
            Quiet: false,
        },
    };

    try {
        const result = await s3.send(new DeleteObjectsCommand(deleteParams));
        console.log("Deleted:", result.Deleted.map(obj => obj.Key));

        if (result.Errors && result.Errors.length) {
            console.error("Delete errors:", result.Errors);
        }
    } catch (error) {
        console.error("Batch delete failed:", error);
    }
}

/**
 * Invalidate changed files in CloudFront
 */
async function invalidateChangedFiles(compareResults) {
    const changedFiles = compareResults.upload.changed;

    if (changedFiles.length === 0) {
        console.log("No changed files to invalidate.");
        return;
    }

    const paths = changedFiles.map(file => "/" + getS3Key(file));
    console.log("Invalidating paths:", paths);

    const command = new CreateInvalidationCommand({
        DistributionId: CLOUDFRONT_DISTRIBUTION_ID,
        InvalidationBatch: {
            CallerReference: `invalidate-${Date.now()}`, // must be unique
            Paths: {
                Quantity: paths.length,
                Items: paths,
            },
        },
    });

    try {
        const result = await cloudfront.send(command);
        console.log("CloudFront invalidation created:", result.Invalidation.Id);
    } catch (error) {
        console.error("Failed to create CloudFront invalidation:", error);
    }
}

/**
 * Main upload function
 */
async function upload() {
    try {
        console.log("Starting upload process...");

        validateEnvironment();

        const compareResults = await compareManifests();
        await uploadToS3(compareResults);
        await invalidateChangedFiles(compareResults);

        console.log("Upload process completed successfully!");
    } catch (error) {
        console.error("Upload process failed:", error);
        process.exit(1);
    }
}

// Run the upload
upload();

