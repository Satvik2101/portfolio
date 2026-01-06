
const year = new Date().getUTCFullYear();
const startOfYear = new Date(year, 0, 1, 0, 0, 0);
const millisecondsInDay = 86400000;

// includes today 
const totalPassedDays = Math.floor((Date.now() - startOfYear) / millisecondsInDay) + 1;

// Find first ${totalPassedDays} circles (class hollow-circle) and make them filled (change class to filled-circle)
window.addEventListener("DOMContentLoaded", () => {
    const circles = document.querySelectorAll(".hollow-circle");
    for (let i = 0; i < totalPassedDays; i++) {
        if (i >= circles.length) break;
        circles[i].classList.remove("hollow-circle");
        circles[i].classList.add("filled-circle");
    }

    const totalDays = circles.length;
    const dateElement = document.querySelector(".date");
    const percentageElement = document.querySelector(".percentage");

    if (dateElement) {
        dateElement.textContent = `Date: ${new Date().toLocaleDateString(undefined, {
            year: "numeric",
            month: "long",
            day: "numeric"
        })}`;
    }

    if (percentageElement) {
        const percentage = ((totalPassedDays / totalDays) * 100).toFixed(2);
        percentageElement.textContent = `Year Progress: ${percentage}%`;
    }
});