const message = document.querySelector(".message");

const texts = [
    "Thanks for your patience.",
    "My social profiles are on the way.",
    "See you soon!"
];

let index = 0;

setInterval(() => {
    index = (index + 1) % texts.length;
    message.textContent = texts[index];
}, 2500);