// ----------------------
// GitHub Pages Frontend JS
// ----------------------

// Replace with your Replit backend URL
const BASE_URL = "https://your-replit-url.replit.dev"; // <-- UPDATE THIS

// ----------------------
// AI Prediction Function
// ----------------------
async function runPrediction() {
    try {
        const input = parseFloat(document.getElementById("numInput").value);

        if (isNaN(input)) {
            alert("Please enter a valid number");
            return;
        }

        const response = await fetch(`${BASE_URL}/predict`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ input: input })
        });

        const data = await response.json();
        alert("Prediction from cloud: " + data.prediction);
    } catch (error) {
        console.error("Prediction error:", error);
        alert("Error connecting to backend. Check Replit URL or server status.");
    }
}

// ----------------------
// Face Verification Function
// ----------------------
async function verifyFace() {
    try {
        const fileInput = document.getElementById("selfie");
        const file = fileInput.files[0];

        if (!file) {
            alert("Please upload a selfie first");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch(`${BASE_URL}/verify-face`, {
            method: "POST",
            body: formData
        });

        const data = await response.json();
        if (data.error) {
            alert("Error verifying face: " + data.error);
        } else {
            alert(`Verified: ${data.verified}, Confidence: ${data.confidence}`);
        }
    } catch (error) {
        console.error("Face verification error:", error);
        alert("Error connecting to backend. Check Replit URL or server status.");
    }
}
