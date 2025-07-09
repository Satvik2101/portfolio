const savedMode = localStorage.getItem("mode");
if (savedMode === "cli") {
    setCli()
} else { setPlain() }

function setCli() {
    const toggle = document.getElementById('modeToggle');
    document.body.classList.remove("plain");
    document.body.classList.add("cli");
    localStorage.setItem("mode", "cli");
    toggle.textContent = "Nope, take me back!"
}

function setPlain() {
    const toggle = document.getElementById('modeToggle');
    document.body.classList.remove("cli");
    document.body.classList.add("plain");
    localStorage.setItem("mode", "plain");
    toggle.textContent = "Are you a developer?"
}

document.getElementById("modeToggle").addEventListener("click", () => {
    const isCli = document.body.classList.contains("cli");


    if (isCli) {
        setPlain()
    } else {
        setCli()

    }
});
