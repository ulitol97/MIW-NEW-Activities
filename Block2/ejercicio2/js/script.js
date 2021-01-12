// First check if the technologies we will use are supported
function sanityCheck() {
  const errors = [];
  // Webworkers
  if (!window.Worker) errors.push("WebWorkers");
  // IndexedDB
  if (!window.indexedDB) errors.push("IndexedDB");
  // Notifications
  if (!window.Notification) errors.push("Notifications");

  errors.length > 0 ? showErrors(errors) : setUp();
}

function showErrors(errors) {
  const errorList = errors.join(", ");
  alert(
    `Tu navegador no parece soportar las tecnologías necesarias: ${errorList}. La página no funcionará correctamente.`
  );
}

function setUp() {
  console.info("Inicializando pomodoro");
  const countdownWorker = new Worker("js/counter.js");
  countdownWorker.onmessage = onmessageReceived;
}

function onmessageReceived(message) {
  console.info(message.data);
  if (typeof message.data === "string") {
    timeElement.innerText = message.data;
  } else {
  }
}

// App entrypoint
sanityCheck();

const pomodoroStates = { running: "En marcha", paused: "Pause" };
Object.freeze(pomodoroStates);

const timeElement = document.getElementById("time");
const stateElement = document.getElementById("state");

const sliderElement = document.getElementById("slider");
const sliderValueElement = document.getElementById("slider-value");
sliderValueElement.innerText = sliderElement.value;
sliderElement.oninput = () =>
  (sliderValueElement.innerText = sliderElement.value);

const btnStart = document.getElementById("start");
const btnStop = document.getElementById("stop");

btnStart.addEventListener("click", (e) => e.preventDefault());
btnStop.addEventListener("click", (e) => e.preventDefault());
