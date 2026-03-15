// ----- Camera / Face Verification -----
const video = document.getElementById("video");
navigator.mediaDevices.getUserMedia({video:true})
.then(stream => video.srcObject = stream);

function captureFace(){
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  ctx.drawImage(video,0,0,300,200);
  alert("Face captured for verification!");
}

// ----- Device Fingerprint -----
function getDevice(){
  const info = navigator.userAgent;
  document.getElementById("deviceInfo").innerText = "Device Info: " + info;
}
getDevice();

// ----- Behavior Monitoring -----
const behaviorInput = document.getElementById("behaviorInput");
behaviorInput.addEventListener("keyup",()=>{
  const length = behaviorInput.value.length;
  const result = (length>50) ? "Normal typing detected" : "Low activity detected";
  document.getElementById("behaviorResult").innerText = "Behavior Analysis: " + result;
});

// ----- AI Accuracy Testing -----
let data = [10,20,30,40,50,60,70,80,90,100]; // Sample dataset
let predictions = [];

function predict(){
  const input = parseInt(document.getElementById("sampleInput").value);
  // Simple AI simulation: prediction = closest number in dataset
  let closest = data.reduce((prev, curr) => Math.abs(curr - input) < Math.abs(prev - input) ? curr : prev);
  predictions.push({input, predicted:closest});
  document.getElementById("prediction").innerText = "Predicted Value: " + closest;

  // Accuracy calculation (simulation)
  let correct = predictions.filter(p => Math.abs(p.input - p.predicted) <=10).length;
  let acc = ((correct/predictions.length)*100).toFixed(2) + "%";
  document.getElementById("accuracy").innerText = "Simulated AI Accuracy: " + acc;
}
