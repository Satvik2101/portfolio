const html = (strings, ...values) => {
    let str = '';
    // console.log(strings, values)
    strings.forEach((string, i) => {
        str += string + (values[i] || '');
    });
    return str;
};

function blah(x, y, z) {
    return html`<title>Satvik Gupta ${"" + x + y + z}</title>
  </head>
  
  <body>`;

}

x = html`<!DOCTYPE html>
<html lang="en" ontouchmove="">
<head>
  <meta charset="UTF-8" />
${blah(1, 2, 3)}

  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content="I'm Satvik Gupta, a Software Developer. This is my Portfolio Website." />
  <meta property="og:title" content="Satvik Gupta" />
  <meta property="og:description" content="I'm Satvik Gupta, a Software Developer. This is my Portfolio Website." />
  `
// console.log(x);

module.exports = html;