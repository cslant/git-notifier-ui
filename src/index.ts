import './scss/styles.scss';

window.addEventListener('DOMContentLoaded', (event) => {
    let checkbox = document.querySelector("#toggleSystemMode") as HTMLInputElement;
    let body = document.querySelector("body");
    if (!checkbox || !body) return;

    checkbox.addEventListener('change', (event) => {
        const target = event.target as HTMLInputElement;
        target.checked ? body.setAttribute('data-theme', "dark") : body.removeAttribute("data-theme");
    });
});