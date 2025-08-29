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

// Simulate auto-reply with time-travel animation
function simulateReply(){
    const dmails = JSON.parse(localStorage.getItem("dmails") || "[]");
    const lastSent = dmails.filter(m => m.type==="sent").slice(-1)[0];
    if(!lastSent) return;

    setTimeout(() => {
        const reply = {
            recipient: "You",
            message: `Reply from ${lastSent.recipient}: I received your D-Mail!`,
            timestamp: new Date().toLocaleString(),
            type: "received"
        };
        const dmails = JSON.parse(localStorage.getItem("dmails") || "[]");
        dmails.push(reply);
        localStorage.setItem("dmails", JSON.stringify(dmails));
        renderMessages();
    }, 1500);
}

renderMessages();
simulateReply();
