const chatWindow = document.getElementById("chatWindow");

// Clear old messages on page load
localStorage.setItem("dmails", JSON.stringify([]));

let lastSentCount = 0;

function renderMessages(){
    chatWindow.innerHTML = "";
    const dmails = JSON.parse(localStorage.getItem("dmails") || "[]");

    // Sort by timestamp
    dmails.sort((a,b) => new Date(a.timestamp) - new Date(b.timestamp));

    dmails.forEach(dmail => {
        const div = document.createElement("div");
        div.classList.add("message");
        div.classList.add(dmail.type);
        div.innerHTML = `<strong>${dmail.recipient}:</strong> ${dmail.message}<br><em>${dmail.timestamp}</em>`;
        chatWindow.appendChild(div);
    });

    chatWindow.scrollTop = chatWindow.scrollHeight;
}

// Only reply to newly sent messages
function simulateReplies(){
    const dmails = JSON.parse(localStorage.getItem("dmails") || "[]");
    const sentMessages = dmails.filter(m => m.type === "sent");

    const newMessages = sentMessages.slice(lastSentCount);

    newMessages.forEach((msg) => {
        setTimeout(() => {
            const reply = {
                recipient: "You",
                message: `Reply from ${msg.recipient}: I received your D-Mail!`,
                timestamp: new Date().toLocaleString(),
                type: "received"
            };
            const dmailsNow = JSON.parse(localStorage.getItem("dmails") || "[]");
            dmailsNow.push(reply);
            localStorage.setItem("dmails", JSON.stringify(dmailsNow));
            renderMessages();
        }, 1500);
    });

    lastSentCount = sentMessages.length;
}

renderMessages();
simulateReplies();

// Check periodically for new messages
setInterval(simulateReplies, 2000);
