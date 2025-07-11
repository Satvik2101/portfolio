const { S3Client, GetObjectCommand } = require("@aws-sdk/client-s3");
const { pipeline } = require("stream/promises");
const { readFile } = require("fs/promises");
const fs = require("fs");
const { exit } = require("process");

const BUCKET = "satvik-gupta";
const KEY = "manifest.json";
const LOCAL_MANIFEST_PATH = "web/manifest.json";
const TEMP_REMOTE_PATH = "build/manifest.json";

const s3 = new S3Client({
    region: "ap-south-1",
    endpoint: "https://s3.ap-south-1.amazonaws.com"
});

async function getRemoteManifest() {
    try {
        const command = new GetObjectCommand({ Bucket: BUCKET, Key: KEY });
        const { Body } = await s3.send(command);

        await pipeline(Body, fs.createWriteStream(TEMP_REMOTE_PATH));
        const content = await readFile(TEMP_REMOTE_PATH, "utf-8");
        return JSON.parse(content);
    } catch (e) {
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
compareManifests().then(console.log).catch(console.error);

module.exports = { compareManifests };
