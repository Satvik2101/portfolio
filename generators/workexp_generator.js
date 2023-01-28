//read data from raw.json

var fs = require('fs');
var raw = JSON.parse(fs.readFileSync('raw.json', 'utf8'));
var workexp = raw.workexp;