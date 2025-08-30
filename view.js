const chatWindow = document.getElementById("chatWindow");

// Clear messages on reload
localStorage.setItem("dmails", JSON.stringify([]));

let lastSentCount = 0;

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

    newMessages.forEach((msg) => {
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

// Button to clear D-Mails manually
const clearBtn = document.getElementById("clearBtn");
clearBtn.addEventListener("click", () => {
    localStorage.setItem("dmails", JSON.stringify([]));
    renderMessages();
});

renderMessages();
simulateReplies();
setInterval(simulateReplies, 2000);
