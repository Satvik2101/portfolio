typewrite = async function () {
  var finalText = "Hi. I'm Satvik.";
  var i = 0;
  var speed = 50;
  var text = document.getElementById("name_heading");
  text.innerHTML = "> ";
  // text.
  // var text2 = document.getElementById("name_heading2");
  function typeWriter() {
    if (i < finalText.length) {
      text.innerHTML += finalText.charAt(i);
      // text2.innerHTML += finalText.charAt(i);
      i++;
      setTimeout(typeWriter, speed);
    } else {
      i = 0;
      // text2.innerHTML = "";
      setTimeout(typewrite, 3000);
      // text.innerHTML = " ";
    }
  }

  setTimeout(typeWriter, 100);
};

typewrite();
