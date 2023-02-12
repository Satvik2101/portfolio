var home = `
<div id="bg_image">

<div id="arc_reactor">
<a href="#home" target="_self">

  <img src="./images/arc_reactor.png" />
</a>
</div>
<div id="navbar">

      <div id="navbar_text">
        .satvik
      </div>
      <div id="navbar_links">
        <div class="navbar_link" id="home_link">
          <a href="#home" target="_self">Home</a>
        </div>
        <div class="navbar_link" id="workexp_link">
          <a href="#workexp" target="_self">
            Work Experience
          </a>
        </div>
        <div class=" navbar_link" id="projects_link">
          <a href="#projects" target="_self">Projects</a>
        </div>
        <!-- <div class="navbar_link" id="contact_link">Contact</div> -->
      </div>
    </div>

<div class="border_mask">


  <div id="mask_top"></div>
  <div id="mask_right"></div>
  <div id="mask_bottom"></div>
  <div id="mask_left"></div>



</div>
<div id="home">


  <div id="home_section">

    <div id="name_and_desig" class="padded_centered">
      <h1 id="name_heading"></h1>

      <p id="designation">Software Developer</p>
    </div>
    <p id="bio" class="padded_centered">


      Computer Engineering junior at Delhi Technological University.
      <br>
      Technology,coding, and programming have been my passions since I wrote
      my <a href=https://github.com/Satvik2101/Clean-Folder>first Python Script</a> at the age of 15.

      Building stuff, solving problems, automating tasks, and above all - learning new things - are what I love to
      do.


    </p>
    <div id="profile_links" class="padded_centered">

      <a href="https://www.github.com/Satvik2101" class="profile_link_button" id="github_button">
        <img src="./images/github_icon_2.png" class="profile_link_icon" alt="github_icon" id="github_icon">
        GitHub
      </a>

      <a href="https://www.linkedin.com/in/satvik-gupta-063033195/" class="profile_link_button"
        id="linkedin_button">
        <img src="./images/linkedin_icon_circular.png" class="profile_link_icon" alt="linkedin_icon"
          id="linkedin_icon">
        LinkedIn
      </a>

      <a href="https://drive.google.com/file/d/1QRKsfusGh9-dkz_rBeikaXlxumSY5xkE/view?usp=sharing"
        class="profile_link_button" id="resume_button">
        <span id="resume_icon"></span>
        Resume
      </a>


    </div>

  </div>

</div>
</div>
`

function generate() {
  return home;
}

module.exports = generate;