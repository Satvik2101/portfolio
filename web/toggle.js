const toggle = document.getElementById('modeToggle');
toggle.addEventListener('click', () => {
    document.body.classList.toggle('cli');
    toggle.textContent = document.body.classList.contains('cli')
        ? 'Recruiter Mode'
        : 'Developer Mode';
});