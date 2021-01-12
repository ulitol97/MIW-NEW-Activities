// Application startup and UI manament
let countdownWorker;

const pomodoroStates = {
  running: "En marcha",
  rest: "Descanso",
  paused: "Pausa",
};
Object.freeze(pomodoroStates);
let pomodoroState = pomodoroStates.paused;

const btnStart = document.getElementById("start");
const btnStop = document.getElementById("stop");

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
  console.info("Iniciando pomodoro");
  setState(pomodoroStates.paused);
}

// Start new task given the data collected from the user
function startTask() {
  const task = {
    name: taskNameElement.value.trim(),
    length: sliderElement.value * 60, // Length in seconds
    date: new Date(),
    type: !currentTask
      ? taskTypes.work
      : currentTask.type == taskTypes.rest
      ? taskTypes.work
      : taskTypes.rest,
  };
  if (!isValidTask(task)) return;

  // Start countdown worker
  countdownWorker = new Worker("js/counter.js");
  countdownWorker.onmessage = onmessageReceived;
  countdownWorker.postMessage(task.length);

  // Store the task
  createTask(task);

  // Adapt UI
  setState(
    task.type == taskTypes.work ? pomodoroStates.running : pomodoroStates.rest
  );
  console.info("Creada la tarea: ", task);
}

function stopTask() {
  if (!currentTask) return;
  // Kill worker and return to paused
  countdownWorker.terminate();
  setState(pomodoroStates.paused);
  console.info("Detenida la tarea: ", currentTask);
}

function onmessageReceived(message) {
  if (typeof message.data === "number") {
    updateTimer(message.data);
  } else {
    stopTask();
  }
}

function setState(state) {
  pomodoroState = state;
  setStateUi(state);
}

// App entrypoint
sanityCheck();

btnStart.addEventListener("click", (e) => {
  e.preventDefault();
  startTask();
});

btnStop.addEventListener("click", (e) => {
  e.preventDefault();
  stopTask();
});
