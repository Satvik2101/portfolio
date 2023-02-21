var data = `
<div id="contact" class="section">
    <h2 class="section_title">
      Contact Me <span class="separator_line"></span>
    </h2>
    <br>
    <div id="contact_flex_box">
      <div id="contact_left">
        <h3> Let's build something great together.</h3>

        <br />

        Want to collaborate on a project? Or just want to say hi?
        <br />
        <br />
        Get in touch with me via email at <a href="mailto:hello@satvikgupta.com"> hello@satvikgupta.com </a>
      </div>
      <div id="contact_right">
        <img src="./images/Dashatar.png" />
      </div>

    </div>
  </div>
  <footer>
    Built with <i class="fas fa-heart"></i> by Satvik Gupta
  </footer>
`

function generate() {
  return data;
}

module.exports = generate;