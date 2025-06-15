var fs = require("fs");

// Read the google analytics script from a file.
const ganalyticsTagFile = `./ganalyticstag.txt`;
const ganalyticsTag = fs.readFileSync(ganalyticsTagFile, "utf8");

// Extract the google analytics identifier from the file data.
const ganalyticsIdentifier = ganalyticsTag.match(/G-[A-Z0-9]{10}/)[0];
function addTagInFolder(ogPath) {
    const files = fs.readdirSync("./" + ogPath);
    for (const file of files) {
        // If the file is an html file,
        const filePath = ogPath + "/" + file;
        if (filePath.endsWith(".html")) {
            // Read the file contents.
            var fileContents = fs.readFileSync(filePath, "utf8");

            // Check if the file contains the identifier.
            if (!fileContents.includes(ganalyticsIdentifier)) {
                // If it doesn't, add the script to it and save the file.
                const headTagIndex = fileContents.indexOf("</head>");
                fileContents = fileContents.slice(0, headTagIndex) + ganalyticsTag + fileContents.slice(headTagIndex);
                fs.writeFileSync(filePath, fileContents, "utf8");
            }
        } else if (fs.statSync(filePath).isDirectory()) {
            if (filePath.includes("lucid")) {
                continue
            }
            addTagInFolder(filePath);
        }
    }

}

addTagInFolder("./web");