const themeStylesheet = document.getElementById('themeStylesheet');
const themeToggle = document.getElementById('styleToggle');

const themes = [
    'styles-classic.css',
    'styles-retro.css',
    'styles-serif.css',
    'styles-brutalist.css',
    'styles-pastel.css',
    'styles-manuscript.css',
    'styles-blueprint.css',
    'styles-terminal.css'
];

let currentThemeIndex = parseInt(localStorage.getItem('themeIndex')) || 0;
themeStylesheet.href = themes[currentThemeIndex];

themeToggle.addEventListener('click', () => {
    currentThemeIndex = (currentThemeIndex + 1) % themes.length;
    themeStylesheet.href = themes[currentThemeIndex];
    localStorage.setItem('themeIndex', currentThemeIndex);
});