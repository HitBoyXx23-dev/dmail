const form = document.getElementById("dmailForm");
const status = document.getElementById("status");

form.addEventListener("submit", function(e){
    e.preventDefault();

    const recipient = document.getElementById("recipient").value.trim();
    const message = document.getElementById("message").value.trim();
    const timestampInput = document.getElementById("timestamp").value;

    if(!recipient || !message){
        status.textContent = "Fill all fields!";
        return;
    }

    // Correctly parse timestamp
    let timestamp;
    if(timestampInput){
        let tString = timestampInput;
        if(tString.length === 16){ tString += ":00"; } // Append seconds
        const t = new Date(tString);
        if(isNaN(t.getTime())){
            status.textContent = "Invalid timestamp!";
            return;
        }
        timestamp = t.toLocaleString();
    } else {
        timestamp = new Date().toLocaleString();
    }

    // Add to localStorage
    const dmails = JSON.parse(localStorage.getItem("dmails") || "[]");
    dmails.push({recipient, message, timestamp, type: "sent"});
    localStorage.setItem("dmails", JSON.stringify(dmails));

    // SG-001 transmission animation
    status.textContent = "Transmitting D-Mail...";
    status.style.opacity = 1;
    status.style.animation = "fadeIn 1s forwards";

    setTimeout(() => {
        status.textContent = "D-Mail sent successfully!";
        setTimeout(() => status.style.opacity = 0, 1500);
    }, 1200);

    form.reset();
});
