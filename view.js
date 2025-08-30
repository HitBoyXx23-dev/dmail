const chatWindow = document.getElementById("chatWindow");
const clearBtn = document.getElementById("clearBtn");

// Initialize storage only if empty
if (!localStorage.getItem("dmails")) {
    localStorage.setItem("dmails", JSON.stringify([]));
}

function renderMessages() {
    chatWindow.innerHTML = "";
    const dmails = JSON.parse(localStorage.getItem("dmails") || "[]");

    dmails.forEach(dmail => {
        const div = document.createElement("div");
        div.classList.add("message", dmail.type, "animate"); // <-- cyberpunk entry effect
        div.innerHTML = `<strong>${dmail.recipient}:</strong> ${dmail.message}<br><em>${dmail.timestamp}</em>`;
        chatWindow.appendChild(div);
    });

    chatWindow.scrollTop = chatWindow.scrollHeight;
}

// Reply simulation
function simulateReplies() {
    let dmails = JSON.parse(localStorage.getItem("dmails") || "[]");
    let updated = false;

    dmails.forEach((msg, index) => {
        if (msg.type === "sent" && !msg.replied) {
            dmails[index].replied = true;
            updated = true;

            setTimeout(() => {
                let latest = JSON.parse(localStorage.getItem("dmails") || "[]");
                latest.push({
                    recipient: "You",
                    message: `Reply to ${msg.recipient}: I received your D-Mail!`,
                    timestamp: new Date().toLocaleString(),
                    type: "received"
                });
                localStorage.setItem("dmails", JSON.stringify(latest));
                renderMessages();
            }, 1500);
        }
    });

    if (updated) {
        localStorage.setItem("dmails", JSON.stringify(dmails));
    }
}

// Clear messages with cyberpunk fade-out
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
