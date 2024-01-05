board = document.getElementById("game-board");
boardAndRules = document.getElementById("board-and-rules");


//get max width of board


//get screen size

var width = boardAndRules.offsetWidth;
var height = window.innerHeight * 0.9;
var paused = true;
cellSize = 50;

sleepTime = 1000;
function initializeBoard() {
    //set size of all td elements
    //modify the existing css

    rows = Math.floor(height / cellSize);
    cols = Math.floor(width / cellSize);
    console.log(rows, cols);
    //board is an html table, add rows and cells
    boardLocal = [];
    for (var i = 0; i < rows; i++) {
        var row = board.insertRow(i);
        boardLocal.push([]);
        for (var j = 0; j < cols; j++) {
            boardLocal[i].push(0);
            var cell = row.insertCell(j);
            // cell.innerHTML = i + "_" + j;
            cell.setAttribute("id", i + "_" + j);
            cell.setAttribute("class", "dead");
            cell.style.width = cellSize + "px";
            cell.style.height = cellSize + "px";
            cell.onclick = cellClickHandler;
        }
    }
    //create a copy of boardLocal, but it shouldn't be a reference
    oldBoardLocal = JSON.parse(JSON.stringify(boardLocal));
}

initializeBoard();

// updateView();

function cellClickHandler() {
    var classes = this.getAttribute("class");
    var coords = this.getAttribute("id").split("_");
    if (classes.indexOf("live") > -1) this.setAttribute("class", "dead");
    else
        this.setAttribute("class", "live");
    i = parseInt(coords[0]);
    j = parseInt(coords[1]);

    oldBoardLocal[i][j] = 1 - oldBoardLocal[i][j];
    boardLocal[i][j] = 1 - boardLocal[i][j];
}

function getLiveNeighbors(i, j) {
    var neiIndices = [[i + 1, j], [i - 1, j], [i, j + 1], [i, j - 1], [i + 1, j + 1], [i - 1, j - 1], [i + 1, j - 1], [i - 1, j + 1]];
    var liveNeighbors = neiIndices.map(function (index) {
        if (index[0] < 0 || index[0] >= rows || index[1] < 0 || index[1] >= cols) return 0;
        return [index[0], index[1], oldBoardLocal[index[0]][index[1]]];
    }
    ).filter(function (val) {
        return val[2] == 1;
    });
    return liveNeighbors;
}
function updateView() {
    console.log(oldBoardLocal)

    for (var i = 0; i < rows; i++) {
        for (var j = 0; j < cols; j++) {


            var liveNeighbors = getLiveNeighbors(i, j)
            var liveNeighborsCount = liveNeighbors.length;


            var live = oldBoardLocal[i][j];
            if (live) {
                if (liveNeighborsCount < 2 || liveNeighborsCount > 3) {
                    boardLocal[i][j] = 0;
                    console.log(i, j, "died with ", liveNeighborsCount, " neighbors", liveNeighbors);
                    document.getElementById(i + "_" + j).setAttribute("class", "dead");
                }
            } else {
                if (liveNeighborsCount == 3) {
                    boardLocal[i][j] = 1;
                    console.log(i, j, "revived with ", liveNeighborsCount, " neighbors", liveNeighbors);

                    document.getElementById(i + "_" + j).setAttribute("class", "live");
                }
            }
        }
    }
    updateBoard();
    if (paused) return;
    setTimeout(updateView, sleepTime);

}
function updateBoard() {
    console.log("board updated")
    oldBoardLocal = JSON.parse(JSON.stringify(boardLocal))
    console.log(boardLocal, oldBoardLocal)
}

function toggle() {
    if (paused) resume();
    else pause();
}
function pause() {
    paused = true;
    console.log("paused");
    document.getElementById("toggle-button").innerHTML = "Resume";
    clearTimeout(updateView);
}

function resume() {
    console.log("resumed");
    paused = false;
    document.getElementById("toggle-button").innerHTML = "Pause";

    updateView();
}

function updateSpeed() {
    sleepTime = 1000 / document.getElementById("speed-slider").value;
    console.log("speed updated to ", sleepTime);

}

function updateSize() {
    var sizeFactor = document.getElementById("size-slider").value;
    cellSize = 50 / sizeFactor;
    console.log("size updated to ", cellSize);
    board.innerHTML = "";
    initializeBoard();
}

document.getElementById("speed-slider").onchange = updateSpeed;
document.getElementById("size-slider").onchange = updateSize;

document.getElementById("toggle-button").onclick = toggle;
