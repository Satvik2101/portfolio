const fs = require('fs');



//split by \n, or \r\n


function ignoreFile(file) {
    // does file belong to /web folder? If not, ignore it

    if (file.indexOf('web') != 0) {
        return true;
    }
    return false;
}

// function fixFileName(file) {
//     //if file doesn't have a / in it, add / in the front
//     if (file.indexOf('/') == -1) {
//         file = '/' + file;
//     }
//     return file;
// }
var addedFiles = fs.readFileSync('./aws/added_files', 'utf-8').toString().split("\n");
var finalAddedFiles = [];
var finalChangedFiles = [];
addedFiles.forEach(function (fileData) {
    if (fileData.length == 0) { return; }
    var isIgnored = ignoreFile(fileData);
    if (!isIgnored) {
        fileData = fileData.replace('web/', '');

        finalAddedFiles.push(fileData);
    }
});


// fs.writeFileSync('./aws/added_files', finalAddedFiles.join("\n"));


var changed_files = fs.readFileSync('./aws/changed_files', 'utf-8').toString().split("\n");
// console.log("Changed files\n", changed_files);

changed_files.forEach(function (fileData) {
    //split by tab
    // console.log(fileData);
    if (fileData.length == 0) { return; }
    var fileData = fileData.split("\t");
    var mode = fileData[0];
    var file = fileData[1];

    if (mode.startsWith("R")) {
        file = fileData[2]
    }

    //remove web prefix

    var isIgnored = ignoreFile(file);
    if (!isIgnored) {
        file = file.replace('web/', '');

        console.log(file);
        if (mode == 'D') {
            return;
        }
        if (mode == 'A') {
            console.log('added');
            // fs.appendFileSync('./aws/added_files', file + "\n");
            finalAddedFiles.push(file);
        } else if (mode.startsWith("R")) {
            console.log('renamed')
            finalAddedFiles.push(file);

        } else {
            finalChangedFiles.push(file);
        }
        console.log();
    }
})


// fs.writeFileSync('./aws/changed_files', finalChangedFiles.join("\n"));
var upload = [...finalAddedFiles, ...finalChangedFiles];
fs.writeFileSync('./aws/upload_files', upload.join(" "));


// add / to start of all files in finalChangedFiles
// The AWS CLI's invalidate command and the S3 upload command apparently require different formats
// The issue is there only because I'm using git-bash to run the scripts, and that causes some issues
// with file paths as well. 
// This is a temporary fix that works well.

for (var i = 0; i < finalChangedFiles.length; i++) {
    finalChangedFiles[i] = '/' + finalChangedFiles[i];
}

fs.writeFileSync('./aws/invalidate_files', finalChangedFiles.join(" "));
//delete added_files and changed_files
fs.unlinkSync('./aws/added_files');
fs.unlinkSync('./aws/changed_files');
