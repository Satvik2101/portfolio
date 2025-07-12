"use strict";

const fs = require("fs");
const path = require("path");

// Import TypeScript compiled classes
const Index = require("../build/Index").default;
const More = require("../build/More").default;
const Notes = require("../build/Notes").default;
const Error404 = require("../build/404").default;
const TimeTable = require("../build/TimeTable").default;
const Conway = require("../build/Conway").default;
const Login = require("../build/Login").default;
const Success = require("../build/Success").default;

// Configuration
const RAW_DATA_PATH = "./raw.json";
const WEB_DIR = "./web";
const GANALYTICS_TAG_PATH = "./ganalyticstag.txt";
const SITEMAP_PATH = "./web/sitemap.xml";

// Files to ignore in sitemap
const SITEMAP_IGNORE_FILES = ['404.html', 'index.html'];


function readRawData() {
    const rawData = fs.readFileSync(RAW_DATA_PATH, "utf8");
    return JSON.parse(rawData);
}

/**
 * Generate HTML pages from TypeScript components
 */
function generatePages(rawData) {
    const pages = [
        { component: new Index(rawData), output: "index.html" },
        { component: new More(rawData), output: "more.html" },
        { component: new Notes(), output: "notes.html" },
        { component: new Error404(), output: "404.html" },
        { component: new TimeTable(), output: "time-table.html" },
        { component: new Conway(), output: "conway.html" },
        { component: new Login(), output: "login.html" },
        { component: new Success(), output: "success.html" }
    ];

    pages.forEach(({ component, output }) => {
        const outputPath = path.join(WEB_DIR, output);
        fs.writeFileSync(outputPath, component.toString());
        console.log(`Generated: ${outputPath}`);
    });
}

/**
 * Read Google Analytics tag from file
 */
function readAnalyticsTag() {
    const ganalyticsTag = fs.readFileSync(GANALYTICS_TAG_PATH, "utf8");
    const ganalyticsIdentifier = ganalyticsTag.match(/G-[A-Z0-9]{10}/)[0];
    return { tag: ganalyticsTag, identifier: ganalyticsIdentifier };
}

/**
 * Inject Google Analytics tags into HTML files
 */
function injectAnalyticsTags(dir, analyticsTag, analyticsIdentifier) {
    const entries = fs.readdirSync(dir);

    for (const entry of entries) {
        const fullPath = path.join(dir, entry);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            injectAnalyticsTags(fullPath, analyticsTag, analyticsIdentifier);
        } else if (fullPath.endsWith(".html")) {
            let content = fs.readFileSync(fullPath, "utf8");

            if (!content.includes(analyticsIdentifier)) {
                const updated = content.replace("</head>", analyticsTag + "</head>");
                fs.writeFileSync(fullPath, updated, "utf8");
                console.log(`Added analytics to: ${fullPath}`);
            }
        }
    }
}

/**
 * Check if file should be ignored in sitemap
 */
function shouldIgnoreFile(file) {
    if (file.length === 0) return true;

    for (const ignoreFile of SITEMAP_IGNORE_FILES) {
        if (file === ignoreFile) {
            return true;
        }

        if (file.startsWith(ignoreFile + '/')) {
            return true;
        }
    }

    return false;
}

/**
 * Generate sitemap XML content
 */
function generateSitemap() {
    let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n';
    sitemap += `<urlset
xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
      http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">\n`;

    const currTimestampUtc = new Date().toISOString();
    const urlEntries = [];

    function addFilesInDir(dir) {
        const files = fs.readdirSync(dir);

        files.forEach((file) => {
            if (shouldIgnoreFile(file)) return;

            const filePath = path.join(dir, file);
            const stat = fs.statSync(filePath);

            if (stat.isDirectory()) {
                addFilesInDir(filePath);
                return;
            }

            if (!filePath.endsWith('.html') && !filePath.endsWith('.pdf')) {
                return;
            }

            let cleanPath = filePath
                .replace('.html', '')
                .replace(/^web[\\\/]/, '')
                .replace(/\\/g, '/');

            urlEntries.push({
                loc: `https://www.satvikgupta.com/${cleanPath}`,
                lastmod: currTimestampUtc
            });
        });
    }

    addFilesInDir(WEB_DIR);

    // Add URL entries to sitemap
    urlEntries.forEach(({ loc, lastmod }) => {
        sitemap += '<url>\n';
        sitemap += `<loc>${loc}</loc>\n`;
        sitemap += `<lastmod>${lastmod}</lastmod>\n`;
        sitemap += '</url>\n';
    });

    sitemap += '</urlset>';
    return sitemap;
}

/**
 * Main generation function
 */
function generate() {
    try {
        console.log("Starting site generation...");

        // Read raw data
        const rawData = readRawData();

        // Generate HTML pages from TypeScript
        generatePages(rawData);

        // Inject analytics
        const { tag: analyticsTag, identifier: analyticsIdentifier } = readAnalyticsTag();
        injectAnalyticsTags(WEB_DIR, analyticsTag, analyticsIdentifier);

        // Generate sitemap
        const sitemap = generateSitemap();
        fs.writeFileSync(SITEMAP_PATH, sitemap);
        console.log(`Generated sitemap: ${SITEMAP_PATH}`);

        console.log("Site generation completed successfully!");
    } catch (error) {
        console.error("Error during site generation:", error);
        process.exit(1);
    }
}

// Run the generation
generate();
