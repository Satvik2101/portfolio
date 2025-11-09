const toggleableFeatures = [
    {
        name: "mode",
        buttonId: "modeToggle",
        option1: {
            name: "plain",
            htmlContent: "Are you a developer?"
        },
        option2: {
            name: "cli",
            htmlContent: "Nope, take me back!"
        },
    },
    {
        name: "theme",
        buttonId: "themeToggle",
        option1: {
            name: "light-mode",
            htmlContent: '<i class="fa-solid fa-moon"></i>'
        },
        option2: {
            name: "dark-mode",
            htmlContent: '<i class="fa-solid fa-sun"></i>'
        },
    },
    {
        name: "style",
        buttonId: "styleToggle",
        option1: {
            name: "classic-style",
            htmlContent: '<i class="fa-solid fa-palette"></i>'
        },
        option2: {
            name: "modern-style",
            htmlContent: '<i class="fa-solid fa-brush"></i>'
        },
        onApply: function (activeOption) {
            const classicStyle = document.querySelector('link[href="/styles.css"]');
            const modernStyle = document.querySelector('link[href="/styles-modern.css"]');
            const isModern = activeOption.name === "modern-style";

            if (classicStyle) classicStyle.disabled = isModern;
            if (modernStyle) modernStyle.disabled = !isModern;
        }
    }
];

function applyFeatureState({ name, button, activeOption, inactiveOption, onApply }) {
    document.body.classList.remove(inactiveOption.name);
    document.body.classList.add(activeOption.name);
    localStorage.setItem(name, activeOption.name);

    if (button) {
        button.innerHTML = activeOption.htmlContent;
    }

    if (onApply) {
        onApply(activeOption);
    }
}

function initToggle(feature) {
    const { name, buttonId, option1, option2, onApply } = feature;
    const button = document.getElementById(buttonId) || null;

    const saved = localStorage.getItem(name);
    const isOption2 = saved === option2.name;

    const current = isOption2 ? option2 : option1;
    const other = isOption2 ? option1 : option2;

    applyFeatureState({
        name,
        button,
        activeOption: current,
        inactiveOption: other,
        onApply
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
                inactiveOption: inactive,
                onApply
            });
        });
    }
}

toggleableFeatures.forEach(initToggle);
