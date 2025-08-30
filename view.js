const chatWindow = document.getElementById("chatWindow");
const clearBtn = document.getElementById("clearBtn");

// Initialize storage only if empty
if (!localStorage.getItem("dmails")) {
    localStorage.setItem("dmails", JSON.stringify([]));
}

function renderMessages() {
    chatWindow.innerHTML = "";
    const dmails = JSON.parse(localStorage.getItem("dmails") || "[]");

    // Sort by timestamp
    dmails.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

    dmails.forEach((dmail, index) => {
        const div = document.createElement("div");
        div.classList.add("message", dmail.type);

        // Only add animate class if not already animated
        if (!dmail.animated) {
            div.classList.add("animate");
            dmails[index].animated = true;
        }

        div.innerHTML = `<strong>${dmail.recipient}:</strong> ${dmail.message}<br><em>${dmail.timestamp}</em>`;
        chatWindow.appendChild(div);
    });

    localStorage.setItem("dmails", JSON.stringify(dmails));
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

// Reply simulation
function simulateReplies() {
    const dmails = JSON.parse(localStorage.getItem("dmails") || "[]");
    let updated = false;

    dmails.forEach((msg, index) => {
        if (msg.type === "sent" && !msg.replied) {
            dmails[index].replied = true;
            updated = true;

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
        }
    });

    if (updated) {
        localStorage.setItem("dmails", JSON.stringify(dmails));
    }
}

// Clear messages with fade-out
clearBtn.addEventListener("click", () => {
    const messages = document.querySelectorAll(".message");
    messages.forEach(msg => {
        msg.style.animation = "fadeOut 0.5s forwards";
    });

    setTimeout(() => {
        localStorage.setItem("dmails", JSON.stringify([]));
        renderMessages();
    }, 500);
});

// Initial load
renderMessages();
simulateReplies();
setInterval(simulateReplies, 2000);
