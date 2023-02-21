//read data from raw.json

var fs = require('fs');

var generateTechStack = require('../helpers/techStackGen.js');



function generateLinks(links) {
    var output = "";
    if (links == null) return output;
    output += `<div class="project_links">`
    for (var i = 0; i < links.length; i++) {
        var name = links[i].name;
        var icon = "";
        if (name == "App Store") {
            icon = "fa-brands fa-app-store fa-2x";
        } else if (name == "Play Store") {
            icon = "fab fa-google-play fa-2x";
        } else if (name == "Github") {
            icon = "fab fa-github fa-2x";
        } else if (name == "Website") {
            icon = "fas fa-link fa-2x";
        }

        output += `<a href="${links[i].url}"><span class="project_link"><i class="${icon}"></i></span></a>`
    }
    output += `</div>`
    return output;
}

function generatePoints(points) {
    var output = "";
    if (points == null) return output;
    output += `<div class="project_por_points"> <ul>`
    for (var i = 0; i < points.length; i++) {
        output += `<li>${points[i]}</li>`
    }
    output += `</ul></div>`
    return output;
}


function generateImage(image, isEven) {
    var output = "";
    if (image == null) return output;
    var style = "";
    var imgStyle = "";
    if (isEven) {

        style = "\"margin-left:0;margin-right:2em;\""
        imgStyle = "\"float:right\"";
    } else {
        style = "\"margin-right:0;margin-left:2em;\""
        imgStyle = "\"float:left\"";

    }
    output += `<div class="project_image" style=${style}>
            <img src='${image}' style=${imgStyle}/>
        </div>`
    return output;
}
function generateHtml(name, product, role, techstack, links, points, image, isEven) {
    if (product != null) {
        name = name + "'s"
    }
    var style;
    if (isEven) {
        style = "\"flex-direction:row-reverse;\"";
    } else {
        style = "\"flex-direction:row;\"";
    }
    var output = `
    <div class="project_card" style=${style}>
    <div class="project_details">
      <div class="project_title">
        <h2 class="project_title_first">

         ${name}
        </h2>
        ${(product == null) ? "" : "<h3 class=\"project_title_second\">" + product + "</h2>"}
       
      </div>`

    output += generateLinks(links);

    if (role != null)
        output += `<div class="por_designation"> ${role}</div>`


    output += generatePoints(points);

    output += generateTechStack(techstack);
    output += `</div>`
    if (image != null) {
        output += generateImage(image, isEven);
    }
    output += `</div >`
    return output;
}


function generate() {
    var raw = JSON.parse(fs.readFileSync('raw.json', 'utf8'));
    var data = [...raw.pors, ...raw.projects];
    var start = `
        <div id = "projects" class="section" >
    <div id="projects_section_start">
      <h1 class="section_title">
        What I've Created
        <span class="separator_line"></span>
      </h1>

      I've worked on a lot of projects, both personal and professional, and have held Positions of Responsibility as a
      student. <br />Here are some of them.
    </div>

    <div id="projects_and_pors_cards_and_description">
    `;

    var end = `  </div>

  </div>
        `
    var result = start;

    for (var i = 0; i < data.length; i++) {
        var name = data[i].name;
        var role = data[i].role;
        var product = data[i].product;
        var techstack = data[i].techstack;
        var points = data[i].points;
        var links = data[i].links;
        var image = data[i].image;

        result += generateHtml(name, product, role, techstack, links, points, image, i % 2 == 0);

    }
    result += end;
    return result;

}

module.exports = generate;
