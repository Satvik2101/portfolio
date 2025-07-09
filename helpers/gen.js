"use strict";
const fs = require("fs");
const path = require("path");

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const Index_1 = __importDefault(require("../build/src/Index"));
const More_1 = __importDefault(require("../build/src/More"))
const Note_1 = __importDefault(require("../build/src/Notes"))
const Error404_1 = __importDefault(require("../build/src/404"))
const TimeTable_1 = __importDefault(require("../build/src/TimeTable"))
const Conway_1 = __importDefault(require("../build/src/Conway"))
const Login_1 = __importDefault(require("../build/src/Login"))
const Success_1 = __importDefault(require("../build/src/Success"))
//read raw.json
var raw = JSON.parse(fs_1.default.readFileSync("./raw.json").toString());
function Generate() {
    var ele = new Index_1.default(raw);
    fs_1.default.writeFileSync("./web/index.html", ele.toString());
    var ele2 = new More_1.default(raw)
    fs_1.default.writeFileSync("./web/more.html", ele2.toString())
    var ele3 = new Note_1.default();
    fs_1.default.writeFileSync("./web/notes.html", ele3.toString())
    var ele4 = new Error404_1.default();
    fs_1.default.writeFileSync("./web/404.html", ele4.toString())
    var ele5 = new TimeTable_1.default();
    fs_1.default.writeFileSync("./web/time-table.html", ele5.toString())
    var ele6 = new Conway_1.default();
    fs_1.default.writeFileSync("./web/conway.html", ele6.toString())
    var ele7 = new Login_1.default();
    fs_1.default.writeFileSync("./web/login.html", ele7.toString())
    var ele8 = new Success_1.default();
    fs_1.default.writeFileSync("./web/success.html", ele8.toString())
}
Generate();


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

//Look at the files in the folder and generate a sitemap

var sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n';
sitemap += `<urlset
xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
      http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">\n`;



const toIgnore = ['404.html', 'index.html']

function ignoreFile(file) {
    if (file.length == 0) return true;
    for (const igFile of toIgnore) {

        if (file == igFile) {
            return true;
        }

        else if (file.indexOf(igFile) == 0 && file.length > igFile.length && file[igFile.length] == '/') {
            return true;

        }
    }

    return false;
}

const currTimestampUtc = new Date().toISOString();

function addFilesInDir(dir) {
    var files = fs.readdirSync(dir);
    files.forEach(function (file) {
        if (!ignoreFile(file)) {

            //check if file is a directory
            var filePath = path.join(dir, file);
            var stat = fs.statSync(filePath);

            // Check if file is a directory
            if (stat.isDirectory()) {
                addFilesInDir(filePath);
            }


            if (filePath.indexOf('.html') == -1 && filePath.indexOf('.pdf') == -1) {
                return;
            }
            filePath = filePath.replace('.html', '');
            console.log(filePath);
            filePath = filePath.replace("web\\", '')
            //convert \ to / in filePath
            filePath = filePath.replace(/\\/g, '/');
            sitemap += '<url>\n';
            sitemap += '<loc>https://www.satvikgupta.com/' + filePath + '</loc>\n';
            sitemap += '<lastmod>' + currTimestampUtc + '</lastmod>\n';
            sitemap += '</url>\n';
        }
    });

}

addFilesInDir('./web');

sitemap += '</urlset>';

fs.writeFileSync('./web/sitemap.xml', sitemap);