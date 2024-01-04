//Look at the files in the folder and generate a sitemap
//Ignore all the files in aws/.awsignore

var fs = require('fs');
var path = require('path');
html = require('../helpers/html-template-func');


var sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n';
sitemap += html`<urlset
xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
      http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">\n`;



var files = fs.readdirSync('./');

var toIgnore = fs.readFileSync('./aws/.awsignore', 'utf-8').toString().split("\r\n");
toIgnore = toIgnore.concat(['404.html', 'index.html'])

function ignoreFile(file) {
    if (file.length == 0) return true;
    for (igFile of toIgnore) {

        if (file == igFile) {
            return true;
        }
        //if file is in a directory, check if directory is in ignore list
        // if (ignoreFile == 'aws') {
        //     console.log(file);
        //     console.log(file.indexOf(ignoreFile));
        //     console.log(file[ignoreFile.length]);
        // }
        else if (file.indexOf(igFile) == 0 && file.length > igFile.length && file[igFile.length] == '/') {
            return true;

        } else {
            // console.log(file, igFile);
        }
    }

    return false;
}

currTimestampUtc = new Date().toISOString();

function addFilesInDir(dir) {
    var files = fs.readdirSync(dir);
    files.forEach(function (file) {
        if (!ignoreFile(file)) {

            //check if file is a directory
            var filePath = path.join(dir, file);
            var stat = fs.statSync(filePath);

            // Check if file is a directory
            if (stat.isDirectory()) {
                console.log(file + ' is a directory');
                addFilesInDir(filePath);
            }


            if (filePath.indexOf('.html') == -1 && filePath.indexOf('.pdf') == -1) {
                return;
            }
            filePath = filePath.replace('.html', '');
            //convert \ to / in filePath
            filePath = filePath.replace(/\\/g, '/');
            sitemap += '<url>\n';
            sitemap += '<loc>http://www.satvikgupta.com/' + filePath + '</loc>\n';
            sitemap += '<lastmod>' + currTimestampUtc + '</lastmod>\n';
            sitemap += '</url>\n';
        }
    });

}

addFilesInDir('./');

sitemap += '</urlset>';

fs.writeFileSync('./sitemap.xml', sitemap);