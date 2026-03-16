const BACKEND = "https://7273f1c8-e032-40b0-b63c-639c80f4c2ed-00-338fuw19q86zl.riker.replit.dev/api/py";

// AI Prediction
async function runPrediction() {
    const input = parseFloat(document.getElementById("numInput").value);
    if (isNaN(input)) {
        alert("Please enter a valid number");
        return;
    }

    try {
        const res = await fetch(`${BACKEND}/predict`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ input })
        });
        const data = await res.json();

        document.getElementById("predictionOutput").innerText = "Prediction: " + data.prediction;
        document.getElementById("predictionTime").innerText = "Last checked: " + new Date().toLocaleString();
    } catch (err) {
        document.getElementById("predictionOutput").innerText = "Error connecting to backend";
        console.error(err);
    }
}

// Face Verification
async function verifyFace() {
    const fileInput = document.getElementById("selfie");
    const file = fileInput.files[0];

    if (!file) {
        alert("Please upload a selfie");
        return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
        const res = await fetch(`${BACKEND}/verify-face`, {
            method: "POST",
            body: formData
        });

        const data = await res.json();
        document.getElementById("faceOutput").innerText = `Verified: ${data.verified}, Confidence: ${data.confidence}`;
        document.getElementById("faceTime").innerText = "Last verified: " + new Date().toLocaleString();
    } catch (err) {
        document.getElementById("faceOutput").innerText = "Error connecting to backend";
        console.error(err);
    }
}
