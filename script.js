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
const slides = document.querySelectorAll(".slide");

let currentSlide = 0;
const tooltip = document.createElement("div");
tooltip.className = "image-tooltip";
document.body.appendChild(tooltip);

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
    setInterval(nextSlide, 3000);
}

startSlideshow();

function addMessage(content, className) {
    const message = document.createElement("div");
    message.className = `message ${className}`;
    message.innerText = content;
    messagesContainer.appendChild(message);

    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    typingIndicator.style.display = "none";
}

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

function handleClear() {
    messagesContainer.innerHTML = "";
}

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

function toggleDarkMode() {
    pageContainer.classList.toggle("dark-mode");
    chatContainer.classList.toggle("dark-mode");
    languageSelection.classList.toggle("dark-mode");
    chatHeader.classList.toggle("dark-mode");
    messages.classList.toggle("dark-mode");
    footer.classList.toggle("dark-mode");
}

function changeBackgroundColor(language) {
    if (language === "English") {
        chatContainer.style.background = "linear-gradient(145deg, #ffffff, #f0f0f0, #fdf4a2, #fadadd)";
    } else if (language === "Hindi") {
        chatContainer.style.background = "linear-gradient(145deg, #ffe6e6, #ffcccc)";
    } else if (language === "Marathi") {
        chatContainer.style.background = "linear-gradient(145deg, #e6f7ff, #cceeff)";
    }
}

sendButton.addEventListener("click", handleSend);
clearButton.addEventListener("click", handleClear);
languageSelect.addEventListener("change", handleLanguageChange);
darkModeToggle.addEventListener("click", toggleDarkMode);

slides.forEach(slide => {
    slide.addEventListener("mouseenter", (e) => {
        const cityInfo = slide.getAttribute("data-city");
        tooltip.innerText = cityInfo;
        tooltip.style.left = `${e.pageX + 10}px`;
        tooltip.style.top = `${e.pageY + 10}px`;
        tooltip.style.opacity = "1";
        tooltip.style.background = "rgba(255, 255, 255, 0.9)"; 
        tooltip.style.color = "#000";
        tooltip.style.padding = "5px 10px"; 
        tooltip.style.borderRadius = "5px"; 
        tooltip.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.1)"; 
    });

    slide.addEventListener("mousemove", (e) => {
        tooltip.style.left = `${e.pageX + 10}px`;
        tooltip.style.top = `${e.pageY + 10}px`;
    });

    slide.addEventListener("mouseleave", () => {
        tooltip.style.opacity = "0";
    });
});
