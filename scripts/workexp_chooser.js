var chosen = 0;

var choosers = document.getElementsByClassName("workexp_chooser_item");
var workexp_cards = document.getElementsByClassName("workexp_card");

var degs = [15, 185, 160, 38];

var pos = [[50, 80], [60, 60], [80, 50], [40, 60]]

var workexp = document.getElementById("workexp");
function choose(i) {
    console.log(i)
    if (i == chosen) {
        return;
    }
    choosers[chosen].classList.remove("workexp_chooser_item_selected");
    choosers[i].classList.add("workexp_chooser_item_selected");
    workexp_cards[chosen].classList.remove("workexp_card_selected");
    workexp_cards[i].classList.add("workexp_card_selected");
    chosen = i;

    var n = degs.length;
    workexp.style.filter = "hue-rotate(" + degs[i % n] + "deg)";
    workexp.style.backgroundPosition = "top " + pos[i % n][0] + "% " + "right " + pos[i % n][1] + "%";
}

//attach event listeners to buttons inside choosers[i]
for (let i = 0; i < choosers.length; i++) {
    let button = choosers[i].querySelector('button');
    console.log(button)
    if (button) {
        button.addEventListener("click", function () {

            choose(i);
        });
    }
}