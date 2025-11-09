const themeStylesheet = document.getElementById('themeStylesheet');
const themeToggle = document.getElementById('styleToggle');

const themes = [
    'styles-classic.css',
    'styles-modern.css',
    'styles-retro.css',
    'styles-minimalist.css',
    'styles-serif.css',
    'styles-brutalist.css',
    'styles-soft.css',
    'styles-pastel.css',
    'styles-manuscript.css'
];

let currentThemeIndex = parseInt(localStorage.getItem('themeIndex')) || 0;
themeStylesheet.href = themes[currentThemeIndex];

themeToggle.addEventListener('click', () => {
    currentThemeIndex = (currentThemeIndex + 1) % themes.length;
    themeStylesheet.href = themes[currentThemeIndex];
    localStorage.setItem('themeIndex', currentThemeIndex);
});