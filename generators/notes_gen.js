const fs = require('fs');
var navBar = require("../helpers/navGen")();

const notes = ["CN", "DiS", "OOSE"];

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

        // Add the navBar after the <body> tag
        const bodyStartIndex = data.indexOf('<body>') + '<body>'.length;
        const modifiedData = data.slice(0, bodyStartIndex) + navBar + data.slice(bodyStartIndex);

        // Add the PDF link after the author field
        const headerStartIndex = modifiedData.indexOf('<header>');
        const headerEndIndex = modifiedData.indexOf('</header>');
        const header = modifiedData.slice(headerStartIndex, headerEndIndex);
        const authorEndIndex = header.indexOf('</p>', header.indexOf('class="author"')) + '</p>'.length;
        const pdfLink = ` <a href="notes/pdfs/${note}.pdf">PDF</a>`;
        const modifiedHeader = header.slice(0, authorEndIndex) + pdfLink + header.slice(authorEndIndex);
        const finalData = modifiedData.slice(0, headerStartIndex) + modifiedHeader + modifiedData.slice(headerEndIndex);

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
