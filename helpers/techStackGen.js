html = require('../generators/html-template-func');

function generateTechStack(techstack) {
    var output = "";
    if (techstack == null) return output;
    output += html`<div class="tech_stack">`
    for (var i = 0; i < techstack.length; i++) {
        output += html`<div class="tech_stack_item">${techstack[i]}</div>`
    }
    output += html`</div>`
    return output;
}

module.exports = generateTechStack;