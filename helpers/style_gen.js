var fs = require('fs');


var stylesheet = '';

var excludeFromGlobalStyles = [
    'navbar_light.css',
    'notes_list_style.css',
    'notes_style.css',
    'time_table_styles.css'


]
//read all files in styles folder
fs.readdirSync('styles').forEach(file => {
    // console.log(file)
    if (excludeFromGlobalStyles.includes(file)) {
        return;
    }
    filedata = fs.readFileSync("./styles/" + file, 'utf-8');
    stylesheet += filedata;
});

styledata = fs.readFileSync("./styles_manual.css", 'utf-8');

stylesheet += styledata;


stylesheet = stylesheet.replace(/(\r\n|\n|\r)/gm, "");

//Remove comments too
stylesheet = stylesheet.replace(/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm, '');

//remove import statements
stylesheet = stylesheet.replace(/@import[^;]+;/g, '');

fs.writeFile('styles.css', stylesheet, function (err) {
    if (err) throw err;
    console.log('Saved Styles');
});