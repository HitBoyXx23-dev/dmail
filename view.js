const chatWindow = document.getElementById("chatWindow");

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

// Simulate auto-reply only for messages that haven't been replied to
function simulateReplies(){
    const dmails = JSON.parse(localStorage.getItem("dmails") || "[]");

    dmails.forEach((msg, index) => {
        if(msg.type === "sent" && !msg.replied){
            // Mark as replied to prevent duplicate replies
            dmails[index].replied = true;
            localStorage.setItem("dmails", JSON.stringify(dmails));

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
        }
    });
}

renderMessages();
simulateReplies();
