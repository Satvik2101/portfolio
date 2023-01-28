//read data from raw.json

var fs = require('fs');
var raw = JSON.parse(fs.readFileSync('raw.json', 'utf8'));
var workexp = raw.workexp;

var result = "";

function generateHtml(company, role, start, end, points, location, techstack) {
    
    var output = `<div class="workexp_card">
    <div class="workexp_title">
      ${company}
    </div>
    <div class="workexp_subtitle" w>
      ${role}
    </div>
    <div class="workexp_timespan" w>
      ${start} - ${end}
    </div>
    <div class="workexp_points">
      <ul>
        <br/>`;
    
    for (var i = 0; i < points.length; i++) {
        output += `<li>${points[i]}</li>`;
    }
     output+=   `
      
     </ul>
    </div>
  </div>
  
  `;
    return output;
}

for (var i = 0; i < workexp.length; i++) { 
    var company = workexp[i].company;
    var role = workexp[i].role;
    var start = workexp[i].start;
    var end = workexp[i].end;
    var points = workexp[i].points;
    var location = workexp[i].location;
    var techstack = workexp[i].techstack;

    result += generateHtml(company, role, start, end, points, location, techstack);    

}

fs.writeFileSync('workexp.html', result);