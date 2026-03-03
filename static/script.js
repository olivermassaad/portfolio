// js

"use strict"

const githubButton = document.getElementById("githubbutton");
githubButton.addEventListener("click", github);
function github() {
    window.location.href = 'https://github.com/olivermassaad';
};

const linkedInButton = document.getElementById("linkedinbutton");
linkedInButton.addEventListener("click", linkedin);
function linkedin() {
    window.location.href = 'https://www.linkedin.com/in/oliver-massaad-9765a0276/?originalSubdomain=ca';
};