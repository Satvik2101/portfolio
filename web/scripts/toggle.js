const toggleableFeatures = [
    {
        name: "mode",
        buttonId: "modeToggle",
        option1: {
            name: "plain",
            textContent: "Are you a developer?"
        },
        option2: {
            name: "cli",
            textContent: "Nope, take me back!"
        },
    },
    {
        name: "theme",
        buttonId: "themeToggle",
        option1: {
            name: "light-mode",
            textContent: "Dark Mode"
        },
        option2: {
            name: "dark-mode",
            textContent: "Light Mode"
        },
    }
];

function applyFeatureState({ name, button, activeOption, inactiveOption }) {
    document.body.classList.remove(inactiveOption.name);
    document.body.classList.add(activeOption.name);
    localStorage.setItem(name, activeOption.name);

    if (button) {
        button.textContent = activeOption.textContent;
    }
}

function initToggle(feature) {
    const { name, buttonId, option1, option2 } = feature;
    const button = document.getElementById(buttonId) || null;

    const saved = localStorage.getItem(name);
    const isOption2 = saved === option2.name;

    const current = isOption2 ? option2 : option1;
    const other = isOption2 ? option1 : option2;

    applyFeatureState({
        name,
        button,
        activeOption: current,
        inactiveOption: other
    });

    if (button) {
        button.addEventListener("click", () => {
            const usingOption2 = document.body.classList.contains(option2.name);
            const active = usingOption2 ? option1 : option2;
            const inactive = usingOption2 ? option2 : option1;

            applyFeatureState({
                name,
                button,
                activeOption: active,
                inactiveOption: inactive
            });
        });
    }
}

toggleableFeatures.forEach(initToggle);
