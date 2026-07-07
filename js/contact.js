// Form Elements
const contactForm = document.getElementById("contactForm");

const fullName = document.getElementById("name");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const subject = document.getElementById("subject");
const message = document.getElementById("message");

// Error Messages
const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const phoneError = document.getElementById("phoneError");
const messageError = document.getElementById("messageError");

// Name Validation
function validateName() {

    if (fullName.value.trim() === "") {

        nameError.textContent = "Name cannot be empty.";

        fullName.classList.add("input-error");

        return false;

    }

    nameError.textContent = "";

    fullName.classList.remove("input-error");

    return true;

}

// Email Validation
function validateEmail() {

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email.value.trim() === "") {

        emailError.textContent = "Email cannot be empty.";

        email.classList.add("input-error");

        return false;

    }

    if (!emailPattern.test(email.value.trim())) {

        emailError.textContent = "Please enter a valid email.";

        email.classList.add("input-error");

        return false;

    }

    emailError.textContent = "";

    email.classList.remove("input-error");

    return true;

}

// Phone Validation
function validatePhone() {

    const phonePattern = /^\d+$/;

    if (phone.value.trim() === "") {

        phoneError.textContent = "Phone number is required.";

        phone.classList.add("input-error");

        return false;

    }

    if (!phonePattern.test(phone.value.trim())) {

        phoneError.textContent =
            "Phone number must contain only digits.";

        phone.classList.add("input-error");

        return false;

    }

    if (phone.value.length < 10) {

        phoneError.textContent =
            "Phone number is too short.";

        phone.classList.add("input-error");

        return false;

    }

    phoneError.textContent = "";

    phone.classList.remove("input-error");

    return true;

}

// Message Validation
function validateMessage() {

    if (message.value.trim() === "") {

        messageError.textContent =
            "Please enter your message.";

        message.classList.add("input-error");

        return false;

    }

    if (message.value.trim().length < 10) {

        messageError.textContent =
            "Message should be at least 10 characters.";

        message.classList.add("input-error");

        return false;

    }

    messageError.textContent = "";

    message.classList.remove("input-error");

    return true;

}

fullName.addEventListener("keyup", validateName);

email.addEventListener("keyup", validateEmail);

phone.addEventListener("keyup", validatePhone);

message.addEventListener("keyup", validateMessage);

function showNotification(text, type) {

    const existing = document.querySelector(".notification");

    if (existing) {

        existing.remove();

    }

    const notification = document.createElement("div");

    notification.className = `notification ${type}`;

    notification.innerHTML = `

        <i class="fas fa-circle-check"></i>

        <span>${text}</span>

    `;

    document.body.appendChild(notification);

    setTimeout(() => {

        notification.classList.add("show");

    }, 100);

    setTimeout(() => {

        notification.classList.remove("show");

    }, 3500);

    setTimeout(() => {

        notification.remove();

    }, 4000);

}

contactForm.addEventListener("submit", function (e) {

    e.preventDefault();

    const validName = validateName();
    const validEmail = validateEmail();
    const validPhone = validatePhone();
    const validMessage = validateMessage();

    if (
        validName &&
        validEmail &&
        validPhone &&
        validMessage
    ) {

        showNotification(
            "Message sent successfully!",
            "success"
        );

        contactForm.reset();

    }

    else {

        showNotification(
            "Please fix the highlighted fields.",
            "error"
        );

    }

});

const counter = document.createElement("small");

counter.id = "messageCounter";

message.parentElement.appendChild(counter);

message.addEventListener("input", function () {

    counter.textContent =
        `${message.value.length} characters`;

});

phone.addEventListener("keypress", function (e) {

    const char = String.fromCharCode(e.which);

    if (!/[0-9]/.test(char)) {

        e.preventDefault();

    }

});

window.addEventListener("load", function () {

    fullName.focus();

});