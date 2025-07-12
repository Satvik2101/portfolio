const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const root = "web";
const manifest = {};

function walk(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            walk(fullPath);
        } else {
            const relPath = path.relative(root, fullPath).replace(/\\/g, "/");
            const fileBuffer = fs.readFileSync(fullPath);
            const textExtensions = /\.(html|css|js|json|txt|svg|xml|md|csv)$/i;

            if (textExtensions.test(relPath)) {
                const content = fileBuffer.toString("utf8").replace(/\r\n/g, "\n");
                manifest[relPath] = crypto.createHash("sha256").update(content).digest("hex");
            } else {
                manifest[relPath] = crypto.createHash("sha256").update(fileBuffer).digest("hex");
            }

        }
    }
}

walk(root);

fs.writeFileSync("build/manifest.json", JSON.stringify(manifest, null, 2));
console.log("✅ Manifest written to manifest.json");
