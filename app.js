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

// ----- TensorFlow.js AI Prediction -----
let inputs = [10,20,30,40,50,60,70,80,90,100];
let outputs = [12,21,29,41,52,61,72,79,88,102]; // Simulated "real" results
let history = [];

// Convert arrays to tensors
const xs = tf.tensor2d(inputs, [inputs.length, 1]);
const ys = tf.tensor2d(outputs, [outputs.length, 1]);

// Create model
const model = tf.sequential();
model.add(tf.layers.dense({units:1, inputShape:[1]}));
model.compile({loss:'meanSquaredError', optimizer:'sgd'});

// Train model
async function trainModel(){
  await model.fit(xs, ys, {epochs:200});
  console.log("Model trained!");
}
trainModel();

// Predict function
async function predict(){
  const input = parseInt(document.getElementById("sampleInput").value);
  const prediction = model.predict(tf.tensor2d([input], [1,1]));
  const predVal = await prediction.data();
  document.getElementById("prediction").innerText = "Predicted Value: " + predVal[0].toFixed(2);

  // Track accuracy (simulate)
  const error = Math.abs(predVal[0] - input);
  history.push({input, predicted: predVal[0], error});

  let correct = history.filter(h=>h.error<=10).length;
  let acc = ((correct/history.length)*100).toFixed(2) + "%";
  document.getElementById("accuracy").innerText = "AI Prediction Accuracy: " + acc;
}
