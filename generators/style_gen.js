var fs = require('fs');

var stylesheet = '';

//read all files in styles folder
fs.readdirSync('styles').forEach(file => {
    // console.log(file)
    filedata = fs.readFileSync("./styles/" + file, 'utf-8');
    stylesheet += filedata;
});

styledata = fs.readFileSync("./styles_manual.css", 'utf-8');

stylesheet += styledata;


stylesheet = stylesheet.replace(/(\r\n|\n|\r)/gm, "");

//Remove comments too
stylesheet = stylesheet.replace(/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm, '');

fs.writeFile('styles.css', stylesheet, function (err) {
    if (err) throw err;
    console.log('Saved Styles');
});