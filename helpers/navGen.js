html = require('../generators/html-template-func');


function generateNav() {
    return html`
    
    <div id="navbar" onclick="">

    <div id="navbar_text">
    satvik <i id="dropdown-arrow" class="fa-solid fa-caret-down fa-xs"></i> 
    </div>
    <div id="navbar_links">
        <div class="navbar_link" id="home_link">
            <a href="/#home" target="_self">Home</a>
        </div>
        <div class="navbar_link" id="workexp_link">
            <a href="/#workexp" target="_self">
                Work Experience
            </a>
        </div>
        <div class=" navbar_link" id="projects_link">
            <a href="/#projects" target="_self">Projects</a>
        </div>
        <div class=" navbar_link" id="notes_link">
        <a href="/notes" target="_self">Notes</a>
    </div>
        <div class=" navbar_link" id="contact_link">
            <a href="/#contact" target="_self">Contact</a>
        </div>
      
        
    </div>
</div>
`
}

module.exports = generateNav;