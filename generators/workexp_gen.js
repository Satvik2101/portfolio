//read data from raw.json

var fs = require('fs');
var generateTechStack = require('../helpers/techStackGen.js');


function generateHtml(company, role, start, end, points, techstack) {

  var output = `<div class="workexp_card">
    <h2 class="workexp_title">
      ${company}
    </h2>
    <h3 class="workexp_subtitle">
      ${role}
    </h3>
    <h3 class="workexp_timespan">
      ${start} - ${end}
    </h3>
    <div class="workexp_points">
      <ul>
        <br/>`;

  for (var i = 0; i < points.length; i++) {
    output += `<li>${points[i]}</li>`;
  }
  output += `
      
     </ul>`
  output += generateTechStack(techstack);
  output += `
    </div>
  </div>
  
  `;
  return output;
}


function generate() {
  var raw = JSON.parse(fs.readFileSync('raw.json', 'utf8'));
  var workexp = raw.workexp;
  var start = `
  <div id="workexp" class="section">
  <div id="workexp_section_start">

  <h1 class="section_title">

  Where I've Worked
  <span class="separator_line"></span>
</h1>
I've been lucky enough to be able to work for some amazing companies and organizations. Here are some of them.
  </div>

  <div id="workexp_cards_and_description">

    <div id="workexp_cards_container">
    `;

  var end = `  </div>

  </div>

</div>
  `
  var result = start;

  for (var i = 0; i < workexp.length; i++) {
    var company = workexp[i].company;
    var role = workexp[i].role;
    var startDate = workexp[i].start;
    var endDate = workexp[i].end;
    var points = workexp[i].points;
    // var location = workexp[i].location;
    var techstack = workexp[i].techstack;

    result += generateHtml(company, role, startDate, endDate, points, techstack);

  }
  result += end;
  return result;

}

module.exports = generate;
