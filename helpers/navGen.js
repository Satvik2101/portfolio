function generateNav() {
    return `
    
    <div id="navbar" onclick="">

    <div id="navbar_text">
        .satvik
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
        <div class=" navbar_link" id="contacts_link">
            <a href="/#contact" target="_self">Contact</a>
        </div>
      
        
    </div>
</div>
`
}

module.exports = generateNav;