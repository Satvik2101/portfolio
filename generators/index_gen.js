var fs = require('fs');


var start = `<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <base target="_blank" rel="noreferrer noopener">

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link
    href="https://fonts.googleapis.com/css2?family=Open+Sans&family=Righteous:wght@400;900&family=Roboto+Slab:wght@400;700&family=Cinzel+Decorative:wght@900&display=swap"
    rel="stylesheet">


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

//projects

var html = start + home + workexp + end;

//write to index_2.html
fs.writeFile('index_2.html', html, function (err) {
    if (err) throw err;
    console.log('Saved!');
});