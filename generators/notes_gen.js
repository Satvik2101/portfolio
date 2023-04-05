const fs = require('fs');
var navBar = require("../helpers/navGen")();

const notes = ["OOSE", "CN", "DiS", "MADF"];

// Loop through each note in the notes array
for (let i = 0; i < notes.length; i++) {
    const note = notes[i];
    const htmlPath = `notes/${note}.html`;

    // Read the corresponding HTML file and modify it
    fs.readFile(htmlPath, 'utf-8', (err, data) => {
        if (err) {
            console.error(`Error reading file ${htmlPath}: ${err}`);
            return;
        }

        //add ontouchmove="" to the html tag
        data = data.replace('<html', '<html ontouchmove=""');

        // Add the navBar after the <body> tag
        const bodyStartIndex = data.indexOf('<body>') + '<body>'.length;
        const modifiedData = data.slice(0, bodyStartIndex) + navBar + data.slice(bodyStartIndex);

        // Add the PDF link after the author field
        const navStartIndex = modifiedData.indexOf('<nav');
        const navEndIndex = modifiedData.indexOf('</nav>');


        const nav = modifiedData.slice(navStartIndex, navEndIndex);
        // console.log(navStartIndex, nav);

        const navStartTagEnd = nav.indexOf('>') + 1;
        console.log(nav.slice(0, navStartTagEnd));
        const pdfLink = `<div class="pdf_link_container"><a class="pdf_link" href="/notes/pdfs/${note}.pdf">Download as PDF</a></div>`;
        const modifiedNav = nav.slice(0, navStartTagEnd) + pdfLink + nav.slice(navStartTagEnd);
        const finalData = modifiedData.slice(0, navStartIndex) + modifiedNav + modifiedData.slice(navEndIndex);

        // Write the modified HTML file back to disk
        fs.writeFile(htmlPath, finalData, 'utf-8', (err) => {
            if (err) {
                console.error(`Error writing file ${htmlPath}: ${err}`);
            } else {
                console.log(`Successfully modified ${htmlPath}`);
            }
        });
    });
}
