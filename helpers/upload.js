"use strict"
const { S3Client, GetObjectCommand, PutObjectCommand, DeleteObjectsCommand } = require("@aws-sdk/client-s3");
const {
    CloudFrontClient,
    CreateInvalidationCommand,
} = require("@aws-sdk/client-cloudfront");

const { readFile } = require("fs/promises");
const fs = require("fs");
const path = require("path")
const { exit } = require("process");

const BUCKET = "satvik-gupta";
const KEY = "manifest.json";
const LOCAL_MANIFEST_PATH = "web/manifest.json";
const LOCAL_ROOT = "web"
const TEMP_REMOTE_PATH = "build/manifest.json";

const s3 = new S3Client({
    region: "ap-south-1",
    endpoint: "https://s3.ap-south-1.amazonaws.com"
});

async function getRemoteManifest() {
    try {
        const command = new GetObjectCommand({ Bucket: BUCKET, Key: KEY });
        const { Body } = await s3.send(command);

        const bytes = await Body.transformToByteArray();
        return JSON.parse(Buffer.from(bytes).toString("utf-8"));

    } catch (e) {
        if (e.name === "NoSuchKey" || e.$metadata?.httpStatusCode === 404) {
            console.warn(`Remote manifest not found (key: ${KEY}) — returning empty object.`);
            return {};
        }
        console.log(e);
        exit(1);
    }
}

async function compareManifests() {
    const local = JSON.parse(await readFile(LOCAL_MANIFEST_PATH, "utf-8"));
    const remote = await getRemoteManifest();

    const upload = { new: [], changed: [] };
    const del = [];
    const keep = [];

    for (const [file, hash] of Object.entries(local)) {
        if (!(file in remote)) {
            upload.new.push(file);
        } else if (remote[file] !== hash) {
            upload.changed.push(file);
        } else {
            keep.push(file);
        }
    }

    for (const file of Object.keys(remote)) {
        if (!(file in local)) {
            del.push(file);
        }
    }

    return { upload, delete: del, keep };
}
// compareManifests().then(console.log).catch(console.error);

async function uploadToS3(compareResults) {
    const { upload, delete: toDelete } = compareResults;
    console.log(compareResults)
    // Upload new and changed files
    for (const file of [...upload.new, ...upload.changed]) {
        const filePath = path.join(LOCAL_ROOT, file);
        const fileStream = fs.createReadStream(filePath);
        const key = file.endsWith(".html") ? file.slice(0, -5) : file;
        const putCommand = new PutObjectCommand({
            Bucket: BUCKET,
            Key: key,
            Body: fileStream,
            ContentType: getContentType(file),
        });

        try {
            await s3.send(putCommand);
            console.log(`Uploaded: ${filePath} to ${key}`);
        } catch (err) {
            console.error(`Failed to upload ${file}:`, err);
        }
    }

    if (toDelete.length > 0) {

        const deleteParams = {
            Bucket: BUCKET,
            Delete: {
                Objects: toDelete.map(key => ({ Key: key })),
                Quiet: false,
            },
        };

        try {
            const result = await s3.send(new DeleteObjectsCommand(deleteParams));
            console.log("Deleted:", result.Deleted.map(obj => obj.Key));
            if (result.Errors && result.Errors.length) {
                console.error("Delete errors:", result.Errors);
            }
        } catch (err) {
            console.error("Batch delete failed:", err);
        }
    }

}

// Optional: naive content type helper
function getContentType(file) {
    if (file.endsWith(".html")) return "text/html";
    if (file.endsWith(".css")) return "text/css";
    if (file.endsWith(".js")) return "application/javascript";
    if (file.endsWith(".json")) return "application/json";
    if (file.endsWith(".svg")) return "image/svg+xml";
    if (file.endsWith(".png")) return "image/png";
    if (file.endsWith(".jpg") || file.endsWith(".jpeg")) return "image/jpeg";
    return "application/octet-stream"; // fallback
}


const cloudfront = new CloudFrontClient({ region: "ap-south-1" });

// Replace with your actual distribution ID
const CLOUDFRONT_DISTRIBUTION_ID = "E155KJRLQ7P4WG";

async function invalidateChangedFiles(compareResults) {
    const changedFiles = compareResults.upload.changed;

    if (!changedFiles.length) {
        console.log("No changed files to invalidate.");
        return;
    }

    const paths = changedFiles.map(file =>
        "/" + (file.endsWith(".html") ? file.slice(0, -5) : file)
    );
    console.log(paths)

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
    } catch (err) {
        console.error("Failed to create CloudFront invalidation:", err);
    }
}
async function main() {
    const compareResults = await compareManifests();
    await uploadToS3(compareResults);
    await invalidateChangedFiles(compareResults)
}

main()

