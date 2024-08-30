const sendButton = document.getElementById("sendButton");
const clearButton = document.getElementById("clearButton");
const userInput = document.getElementById("userInput");
const messagesContainer = document.getElementById("messages");
const languageSelect = document.getElementById("language");
const typingIndicator = document.getElementById("typingIndicator");
const darkModeToggle = document.getElementById("darkModeToggle");
const pageContainer = document.querySelector(".page-container");
const chatContainer = document.querySelector(".chat-container");
const languageSelection = document.querySelector(".language-selection");
const chatHeader = document.querySelector(".chat-header");
const messages = document.querySelector(".messages");
const footer = document.querySelector(".footer");

// Slideshow functionality
const slides = document.querySelectorAll(".slide");
let currentSlide = 0;

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.toggle("show", i === index);
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

function startSlideshow() {
    showSlide(currentSlide);
    setInterval(nextSlide, 3000); // Change slide every 3 seconds
}

// Start the slideshow
startSlideshow();

// Function to add message
function addMessage(content, className) {
    const message = document.createElement("div");
    message.className = `message ${className}`;
    message.innerText = content;
    messagesContainer.appendChild(message);

    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    typingIndicator.style.display = "none";
}

// Function to handle send button click
function handleSend() {
    const userText = userInput.value.trim();

    if (userText) {
        addMessage(userText, "user-message");
        userInput.value = "";
        typingIndicator.style.display = "block";

        setTimeout(() => {
            addMessage("Thank you for your message! How can I help you further?", "system-message");
            typingIndicator.style.display = "none";
        }, 1000);
    }
}

// Function to handle clear button click
function handleClear() {
    messagesContainer.innerHTML = "";
}

// Function to handle language change
function handleLanguageChange() {
    const selectedLanguage = languageSelect.value;
    const greetings = {
        English: "Hello! How can I assist you today?",
        Hindi: "नमस्ते! मैं आपकी कैसे सहायता कर सकता हूँ?",
        Marathi: "नमस्कार! मी तुम्हास कशा प्रकारे सहाय्य करू शकतो?"
    };
    addMessage(greetings[selectedLanguage], "system-message");
    changeBackgroundColor(selectedLanguage);
}

// Function to toggle dark mode
function toggleDarkMode() {
    pageContainer.classList.toggle("dark-mode");
    chatContainer.classList.toggle("dark-mode");
    languageSelection.classList.toggle("dark-mode");
    chatHeader.classList.toggle("dark-mode");
    messages.classList.toggle("dark-mode");
    footer.classList.toggle("dark-mode");
}

// Function to change background color based on language selection
function changeBackgroundColor(language) {
    if (language === "English") {
        chatContainer.style.background = "linear-gradient(145deg, #ffffff, #f0f0f0, #fdf4a2, #fadadd)";
    } else if (language === "Hindi") {
        chatContainer.style.background = "linear-gradient(145deg, #ffe6e6, #ffcccc)";
    } else if (language === "Marathi") {
        chatContainer.style.background = "linear-gradient(145deg, #e6f7ff, #cceeff)";
    }
}

// Event listeners
sendButton.addEventListener("click", handleSend);
clearButton.addEventListener("click", handleClear);
languageSelect.addEventListener("change", handleLanguageChange);
darkModeToggle.addEventListener("click", toggleDarkMode);
