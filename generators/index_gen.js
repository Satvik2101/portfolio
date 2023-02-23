var fs = require('fs');


var start = `<!DOCTYPE html>
<html lang="en" ontouchmove="">

<head>
  <meta charset="UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content="I'm Satvik Gupta, a Software Developer. This is my Portfolio Website." />
  <meta property="og:title" content="Satvik Gupta" />
  <meta property="og:description" content="I'm Satvik Gupta, a Software Developer. This is my Portfolio Website." />
  <meta property="og:image" content="https://www.satvikgupta.com/images/preview.png" />
  <meta property="og:url" content="https://www.satvikgupta.com" />  
  <base target="_blank" rel="noreferrer noopener">
  <link rel="canonical" href="https://www.satvikgupta.com">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link
    href="https://fonts.googleapis.com/css2?family=Open+Sans&family=Righteous:wght@400;900&family=Roboto+Slab:wght@400;700&family=Cinzel+Decorative:wght@900&display=swap"
    rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <link rel="icon" href="./favicon.ico" type="image/x-icon">
  <link rel="stylesheet" href="styles.css" />
  <title>Satvik Gupta</title>
</head>

<body>`;

var end = `
</body>
<script src="./scripts/typewriter.js"> </script>

</html>
`

var home = require('./home_gen.js')();

var workexp = require('./workexp_gen.js')();
var projects_pors = require('./project_gen.js')();
var contact_and_footer = require('./contact_and_footer_gen.js')();
//projects

var html = start + home + workexp + projects_pors + contact_and_footer + end;

//write to index_2.html

//Remove comments and newlines
html = html.replace(/(\r\n|\n|\r)/gm, "");
html = html.replace(/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm, '');

fs.writeFile('index.html', html, function (err) {
  if (err) throw err;
  console.log('Saved!');
});