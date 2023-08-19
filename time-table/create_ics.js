const apiUrl = "https://mutz9ykov6.execute-api.ap-south-1.amazonaws.com/latest/create-calendar";


function create() {
    const timeTable = [];

    const days = ["mon", "tue", "wed", "thu", "fri"];

    days.forEach(day => {
        var currDay = [];
        for (var i = 1; i <= 10; i++) {
            currDay.push(document.querySelector("#" + day + "-" + i).innerHTML)
        }
        timeTable.push(currDay);
    })

    console.log(timeTable)
    //POST request to URL

    const body = { timeTable: timeTable };
    var request = new XMLHttpRequest();
    request.open("POST", apiUrl, true);

    request.setRequestHeader("Content-Type", "application/json");
    request.send(JSON.stringify(body));
    request.onload = function () {
        if (request.status == 200) {
            console.log(this.response)
            var data = this.response;
            download(data, "calendar.ics", "text/calendar");

        }
        else {
            alert("Something went wrong. Please try again later.");
        }
    }
}

function download(data, filename, type) {
    var file = new Blob([data], { type: type });
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    else { // Others
        var a = document.createElement("a");
        var url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function () {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }, 0);
    }
}

const downloadButton = document.querySelector("#ical_button");

downloadButton.addEventListener("click", () => {
    create();
});
