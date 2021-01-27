// Application startup and UI manament
let countdownWorker;

const pomodoroStates = {
  running: "Trabajando",
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
  console.info("Comprobando permiso notificaciones");
  requestNotificationPermission();
  console.info("Iniciando pomodoro");
  setState(pomodoroStates.paused);
}

// Start new task given the data collected from the user
function startTask() {
  const task = {
    id: nextTaskId(),
    name: taskNameElement.value.trim(),
    length: sliderElement.value * 60, // Length in seconds
    date: new Date(),
    type: !currentTask
      ? taskTypes.work
      : currentTask.type == taskTypes.rest
      ? taskTypes.work
      : taskTypes.rest,
    status: taskStates.running,
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
  console.info(
    `${
      task.type == taskTypes.work ? "Creada la tarea" : "Creado el descanso"
    }: `,
    task
  );
}

function stopTask(manually) {
  if (!currentTask) return;

  // End task: logic and ui
  endTask(currentTask, manually);

  // Kill worker and return to paused
  countdownWorker.terminate();
  setState(pomodoroStates.paused);

  console.info(
    `${
      currentTask.type == taskTypes.work
        ? "Detenida la tarea"
        : "Detenido el descanso"
    }: `,
    currentTask
  );

  // Notification
  if (manually) return;
  else showNotification(currentTask);
}

function onmessageReceived(message) {
  if (typeof message.data === "number") {
    setTitle(message.data);
    updateTimer(message.data);
  } else {
    stopTask(false);
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
  stopTask(true);
});

// Notifications
const notificationTag = "new-pomodoro";

// Ask for permissions
function requestNotificationPermission() {
  if (Notification.permission === "default") {
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        new Notification("Notificaciones activadas", {
          body: "Se mostrarán notificaciones tras cada tarea / descanso",
        });
      }
    });
  }
}

// Receives information about the task that has ended
function showNotification(task) {
  const notify = (task) => {
    const title =
      task.type == taskTypes.rest
        ? "Descanso finalizado"
        : `Tarea "${task.name}" finalizada`;
    const options = {
      body: `Duración: ${Math.floor(task.length / 60)} minuto(s)\n${
        task.type == taskTypes.rest
          ? "A por la siguiente tarea"
          : `Hora de un descanso`
      }`,
      icon: "/MIW-NEW-Activities/res/notification-icon.png",
      tag: notificationTag,
      renotify: true,
    };
    const notification = new Notification(title, options);

    // Return to pomodoro on notification click
    notification.onclick = () => window.focus();
  };

  if (Notification.permission === "granted") {
    notify(task);
  } else if (Notification.permission !== "denied") {
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") notify(task);
    });
  }
}
