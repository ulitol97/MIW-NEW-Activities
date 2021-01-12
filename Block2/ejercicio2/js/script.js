// Application startup and UI manament

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
  console.info(typeof message.data);
  if (typeof message.data === "number") {
    updateTimer(message.data);
  } else {
  }
}

// App entrypoint
sanityCheck();

const pomodoroStates = { running: "En marcha", paused: "Pause" };
Object.freeze(pomodoroStates);

const btnStart = document.getElementById("start");
const btnStop = document.getElementById("stop");

btnStart.addEventListener("click", (e) => {
  e.preventDefault();

  // Start new task given its name and length
  const taskInfo = {
    name: taskNameElement.value.trim(),
    length: sliderElement.value,
  };
  createTask(taskInfo);

  console.info(taskNameElement.value, sliderElement.value);
});
btnStop.addEventListener("click", (e) => e.preventDefault());
