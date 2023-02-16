function generateTechStack(techstack) {
    var output = "";
    if (techstack == null) return output;
    output += `<div class="tech_stack">`
    for (var i = 0; i < techstack.length; i++) {
        output += `<div class="tech_stack_item">${techstack[i]}</div>`
    }
    output += `</div>`
    return output;
}

module.exports = generateTechStack;