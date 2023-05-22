var fs = require("fs");

// Read the google analytics script from a file.
const ganalyticsTagFile = `ganalyticstag.txt`;
const ganalyticsTag = fs.readFileSync(ganalyticsTagFile, "utf8");

// Extract the google analytics identifier from the file data.
const ganalyticsIdentifier = ganalyticsTag.match(/G-[A-Z0-9]{10}/)[0];

// Go through all the html files in the root directory.

function removeTagInFolder(ogPath) {
    console.log("removing in " + ogPath)
    const files = fs.readdirSync("./" + ogPath);
    for (const file of files) {
        console.log(file)
        const filePath = ogPath + "/" + file;
        // If the file is an html file,
        if (filePath.endsWith(".html")) {
            // Read the file contents.
            var fileContents = fs.readFileSync(filePath, "utf8");

            // Check if the file contains the identifier.
            if (fileContents.includes(ganalyticsIdentifier)) {
                // If it doesn't, add the script to it and save the file.
                //If file contains the script, remove it.
                const ganalyticsTagIndex = fileContents.indexOf(ganalyticsTag);
                console.log(ganalyticsTagIndex)
                if (ganalyticsTagIndex != -1) {
                    fileContents = fileContents.slice(0, ganalyticsTagIndex) + fileContents.slice(ganalyticsTagIndex + ganalyticsTag.length);
                }

                fs.writeFileSync(filePath, fileContents, "utf8");
            }
        } else if (fs.statSync(filePath).isDirectory()) {
            console.log("folder", file);
            removeTagInFolder(filePath);
        }
    }

}

removeTagInFolder(".");
