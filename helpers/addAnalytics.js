const fs = require("fs");
const path = require("path");

const ganalyticsTag = fs.readFileSync("./ganalyticstag.txt", "utf8");
const ganalyticsIdentifier = ganalyticsTag.match(/G-[A-Z0-9]{10}/)[0];

function injectAnalyticsTags(dir) {
    for (const entry of fs.readdirSync(dir)) {
        const fullPath = path.join(dir, entry);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            injectAnalyticsTags(fullPath);
        } else if (fullPath.endsWith(".html")) {
            let content = fs.readFileSync(fullPath, "utf8");

            if (!content.includes(ganalyticsIdentifier)) {
                const updated = content.replace("</head>", ganalyticsTag + "</head>");
                fs.writeFileSync(fullPath, updated, "utf8");
            }
        }
    }
}

injectAnalyticsTags("./web");
