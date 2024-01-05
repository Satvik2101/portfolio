typewrite = async function () {
  //get screen size
  var width = window.innerWidth;
  var finalText;
  if (width < 503) {
    finalText = "Hi. I'm Satvik."
  }
  else {
    finalText = "Hi. I'm Satvik Gupta.";
  }
  var i = 0;
  var speed = 50;
  var text = document.getElementById("name_heading");
  text.innerHTML = "> ";
  function typeWriter() {
    if (i < finalText.length) {
      text.innerHTML += finalText.charAt(i);
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
