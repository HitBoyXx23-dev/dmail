const chatWindow = document.getElementById("chatWindow");
const clearBtn = document.getElementById("clearBtn");

// Initialize storage only if empty
if (!localStorage.getItem("dmails")) {
    localStorage.setItem("dmails", JSON.stringify([]));
}

// Track how many sent messages have been processed
let lastSentCount = (() => {
    const dmails = JSON.parse(localStorage.getItem("dmails") || "[]");
    return dmails.filter(m => m.type === "sent").length;
})();

function renderMessages() {
    chatWindow.innerHTML = "";
    const dmails = JSON.parse(localStorage.getItem("dmails") || "[]");

    dmails.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

    dmails.forEach((dmail, index) => {
        const div = document.createElement("div");
        div.classList.add("message", dmail.type);

        if (!dmail.animated) {
            div.classList.add("animate");
            dmails[index].animated = true;
            localStorage.setItem("dmails", JSON.stringify(dmails));
        }

        div.innerHTML = `<strong>${dmail.recipient}:</strong> ${dmail.message}<br><em>${dmail.timestamp}</em>`;
        chatWindow.appendChild(div);
    });

    chatWindow.scrollTop = chatWindow.scrollHeight;
}

function simulateReplies() {
    const dmails = JSON.parse(localStorage.getItem("dmails") || "[]");
    const sentMessages = dmails.filter(m => m.type === "sent");
    const newMessages = sentMessages.slice(lastSentCount);

    newMessages.forEach(msg => {
        setTimeout(() => {
            const reply = {
                recipient: "You",
                message: `Reply to ${msg.recipient}: I received your D-Mail!`,
                timestamp: new Date().toLocaleString(),
                type: "received",
                animated: false
            };
            const dmailsNow = JSON.parse(localStorage.getItem("dmails") || "[]");
            dmailsNow.push(reply);
            localStorage.setItem("dmails", JSON.stringify(dmailsNow));
            renderMessages();
        }, 1500);
    });

    lastSentCount = sentMessages.length;
}

// Clear button with fade-out animation
clearBtn.addEventListener("click", () => {
    const messages = document.querySelectorAll(".message");
    messages.forEach(msg => {
        msg.style.animation = "fadeOut 0.5s forwards";
    });

    setTimeout(() => {
        localStorage.setItem("dmails", JSON.stringify([]));
        renderMessages();
        lastSentCount = 0; // Reset after clearing
    }, 500);
});

renderMessages();
simulateReplies();
setInterval(simulateReplies, 2000);
