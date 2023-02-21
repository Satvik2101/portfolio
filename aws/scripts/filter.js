const fs = require('fs');



//split by \n, or \r\n

var toIgnore = fs.readFileSync('./aws/.awsignore', 'utf-8').toString().split("\r\n");

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
var addedFiles = fs.readFileSync('./aws/added_files', 'utf-8').toString().split("\n");
var finalAddedFiles = [];
var finalChangedFiles = [];
addedFiles.forEach(function (fileData) {
    if (fileData.length == 0) { return; }
    var isIgnored = ignoreFile(fileData);
    if (!isIgnored) {
        finalAddedFiles.push(fileData);
    }
});
// fs.writeFileSync('./aws/added_files', finalAddedFiles.join("\n"));


var changed_files = fs.readFileSync('./aws/changed_files', 'utf-8').toString().split("\n");
console.log(changed_files);

changed_files.forEach(function (fileData) {
    //split by tab
    // console.log(fileData);
    if (fileData.length == 0) { return; }
    var fileData = fileData.split("\t");
    var mode = fileData[0];
    var file = fileData[1];

    var isIgnored = ignoreFile(file);
    if (!isIgnored) {
        console.log(file);
        if (mode == 'A') {
            console.log('added');
            // fs.appendFileSync('./aws/added_files', file + "\n");
            finalAddedFiles.push(file);
        } else {
            console.log('changed');
            finalChangedFiles.push(file);
        }
        console.log();
    }
})


// fs.writeFileSync('./aws/changed_files', finalChangedFiles.join("\n"));
var upload = [...finalAddedFiles, ...finalChangedFiles];
fs.writeFileSync('./aws/upload_files', upload.join(" "));
fs.writeFileSync('./aws/invalidate_files', finalChangedFiles.join(" "));
//delete added_files and changed_files
fs.unlinkSync('./aws/added_files');
fs.unlinkSync('./aws/changed_files');
