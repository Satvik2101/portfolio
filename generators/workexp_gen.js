//read data from raw.json
var fs = require('fs');
var generateTechStack = require('../helpers/techStackGen.js');
html = require('./html-template-func');

function generateChooserItem(companyShortName, idx) {
    var itemClass = "workexp_chooser_item";
    if (idx == 0) {
        itemClass += " workexp_chooser_item_selected";
    }
    return html`<div class="${itemClass}" id="workexp_chooser_item_${idx + 1}">
    <button>${companyShortName} </button>
</div>`
}

function generateChooser(workexp) {

    var chooserStart = html`<div id="workexp_chooser">`;
    var chooserEnd = html`</div>`;
    var chooserItems = "";
    for (var i = 0; i < workexp.length; i++) {
        chooserItems += generateChooserItem(workexp[i].shortName, i);
    }
    return chooserStart + chooserItems + chooserEnd;
}
function generateWorkexpCard(company, role, start, end, points, techstack, idx) {

    var itemClass = "workexp_card";
    if (idx == 0) {
        itemClass += " workexp_card_selected";
    }
    var output = html`<div class="${itemClass}">
    <h3 class="workexp_title">
      ${company}
    </h3>
    <h4 class="workexp_subtitle">
      ${role}
    </h4>
    <h4 class="workexp_timespan">
      ${start} - ${end}
    </h4>
    <div class="workexp_points">
      <ul>
        <br/>`;

    for (var i = 0; i < points.length; i++) {
        output += html`<li>${points[i]}</li>`;
    }
    output += html`
      
     </ul>`
    output += generateTechStack(techstack);
    output += html`
    </div>
  </div>
  
  `;
    return output;
}


function generate() {
    var raw = JSON.parse(fs.readFileSync('raw.json', 'utf8'));
    var workexp = raw.workexp;

    var chooser = generateChooser(workexp);
    var start = html`
  <div id="workexp" class="section">
  <div id="workexp_section_start">

  <h2 class="section_title">

  Where I've Worked
  <span class="separator_line"></span>
</h2>
I've been lucky enough to be able to work for some amazing companies and organizations. Here are some of them.
  </div>


    <div id="workexp_cards_container">
        ${chooser}
    `;

    var end = html`  </div>


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

        result += generateWorkexpCard(company, role, startDate, endDate, points, techstack, i);

    }
    result += end;
    return result;

}

module.exports = generate;
