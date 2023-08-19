slots = {
    "E1": {
        "mon": [3, 4],
        "tue": [],
        "wed": [3],
        "thu": [3, 4],
        "fri": [],
        "color": "#E5F9E0",
    },
    "E2": {
        "mon": [],
        "tue": [3, 4],
        "wed": [4],
        "thu": [],
        "fri": [3, 4],
        "color": "#f4d9fa"
    },
    "E3": {
        "mon": [7, 8],
        "tue": [],
        "wed": [7],
        "thu": [7, 8],
        "fri": [],
        "color": "#bbddfa",
    },
    "E4": {
        "mon": [],
        "tue": [7, 8],
        "wed": [8],
        "thu": [],
        "fri": [7, 8],
        "color": "#FFD6BA",
    },
    "E5": {
        "mon": [1, 2],
        "tue": [],
        "wed": [1],
        "thu": [1, 2],
        "fri": [],
        "color": "#ffcfcf",
    },
    "E6": {
        "mon": [],
        "tue": [9, 10],
        "wed": [10],
        "thu": [],
        "fri": [9, 10],
        "color": "#c2cfff",

    },
    "E7": {
        "mon": [9, 10],
        "tue": [],
        "wed": [9],
        "thu": [9, 10],
        "fri": [],
        "color": "#c7ffc9",
    },
    "E8": {
        "mon": [],
        "tue": [1, 2],
        "wed": [2],
        "thu": [],
        "fri": [1, 2],
        "color": "#d4faf1",
    },
    "E9": {
        "mon": [5, 6],
        "tue": [],
        "wed": [5],
        "thu": [5, 6],
        "fri": [],
        "color": "#e3e7fa",
    },
    "E10": {
        "mon": [],
        "tue": [5, 6],
        "wed": [6],
        "thu": [],
        "fri": [5, 6],
        "color": "#fffacf",
    }
}

const manualColor = "#4bd5ff"

function setCellColor(cell, color) {
    cell.style.backgroundColor = color;
}

function setSubj(slot, subject) {
    var slotTimes = slots[slot];
    var days = ["mon", "tue", "wed", "thu", "fri"];

    days.forEach(day => {
        var periods = slotTimes[day];
        periods.forEach(period => {
            var slotElement = document.getElementById(day + "-" + period);
            slotElement.innerHTML = subject;
            setCellColor(slotElement, slotTimes["color"]);
        });
    });
}

const slotInput = document.getElementById("slotInput");
const subjectInput = document.getElementById("subjectInput");
const addButton = document.querySelector("#add_button");

addButton.addEventListener("click", () => {
    var slot = slotInput.value;
    const subject = subjectInput.value;

    if (slot == "" || subject == "") {
        alert("Please enter a valid slot and subject name.");
        return;
    }
    //if slot value isn't of the type E1,E2....E10, show an error.
    //the first letter can only be E or e

    if (!slot.match(/^[E|e][1-9][0]?$/)) {
        alert("Please enter a valid slot. Example: E1, E2, E3, E4, E5, E6, E7, E8, E9, E10");
        return;
    }
    if (slot[0] == 'e') {
        slot = "E" + slot[1];
    }
    setSubj(slot, subject);

});

function test() {

    const subjects = [
        ["E1", "RL"],
        ["E2", "CG"],
        ["E3", "INS"],
        ["E4", "NLP"],
        ["E5", "ProbStats"],
        ["E6", "Neural Networks"],
        ["E7", "ML"],
        ["E8", "CN"],
        ["E9", "OS"],
        ["E10", "DBMS"],
    ]

    subjects.forEach(subj => {
        setSubj(subj[0], subj[1]);
    });
}

//if any cell in the table becomes empty, set its color to white
//and remove the text from it
function clearCell(cell) {
    cell.style.backgroundColor = "white";
    cell.innerHTML = "";
}
function attachListeners() {
    //attach listeners to all cells to check for content editing]
    //select all elements with class tt-cell
    var cells = document.querySelectorAll(".tt-slot");
    cells.forEach(cell => {

        cell.addEventListener("input", () => {
            if (cell.innerHTML == "") {
                clearCell(cell);
            } else if (cell.style.backgroundColor == "white" || cell.style.backgroundColor == "") {
                setCellColor(cell, manualColor);
            }
        });
    });

}

attachListeners(); 