// UI Management
const root = document.documentElement;

const baseTitle = "MIW - Pomodoro";

const sessionTaskDuration = "sessionTaskDuration";
const sessionRestDuration = "sessionRestDuration";

const timeElement = document.getElementById("time");
const stateElement = document.getElementById("state");

const taskNameElement = document.getElementById("taskname");

const sliderElement = document.getElementById("slider");
const sliderValueElement = document.getElementById("slider-value");
sliderValueElement.innerText = sliderElement.value;
sliderElement.oninput = () =>
  (sliderValueElement.innerText = sliderElement.value);

const tasksRoot = document.getElementById("tasklist");
const tasksElement = document.getElementById("tasklist-body");
const taskExampleElement = document.getElementById("task-sample");

const errorElement = document.getElementById("error");

// Title
function setTitle(n) {
  // Task title
  if (n && typeof n === "number") {
    const titlePrefix =
      currentTask && currentTask.type == taskTypes.work
        ? currentTask.name
        : "Descanso";

    document.title = `${secondsToString(parseInt(n))} - ${titlePrefix}`;
  } else {
    document.title = n;
  }
}

// Timer
function updateTimer(n) {
  // Update the time shown in the timer given the remaining seconds
  timeElement.innerText = secondsToString(parseInt(n));
}

function secondsToString(seconds) {
  let minutes = Math.floor(seconds / 60);
  if (minutes < 10) minutes = "0" + minutes;

  let secs = seconds % 60;
  if (secs < 10) secs = "0" + secs;

  return `${minutes}:${secs}`;
}

// Error
function setError(err) {
  if (!err) {
    errorElement.classList.add("invisible");
  } else {
    errorElement.classList.remove("invisible");
    errorElement.innerText = err.toString();
  }
}

// Tasks
function addTaskUi(task) {
  taskExampleElement.remove();

  const taskRow = document.createElement("tr");
  taskRow.setAttribute("id", `task-${task.id}`);

  const name = document.createElement("td");
  name.innerText = task.name;
  taskRow.appendChild(name);
  task.length / 60;

  const date = document.createElement("td");
  date.innerText = dateToString(task.date);
  taskRow.appendChild(date);

  const length = document.createElement("td");
  length.innerText = `${task.length / 60} minuto(s)`;
  taskRow.appendChild(length);

  const status = document.createElement("td");
  status.classList.add("task-status");
  status.innerText = task.status;
  taskRow.appendChild(status);

  tasksElement.prepend(taskRow);

  tasksRoot.scrollTop = 0;
}

function endTaskUi(task, manually) {
  const taskElement = document.getElementById(`task-${task.id}`);
  const taskStatusElement = taskElement.querySelector(".task-status");

  taskStatusElement.innerText = manually
    ? taskStates.canceled
    : taskStates.finished;
}

// State
function setStateUi(state) {
  // Update text

  // Update colors
  // Update enabled/disabled elements
  switch (state) {
    case pomodoroStates.paused:
      uiPaused();
      break;
    case pomodoroStates.running:
      sessionStorage.setItem(sessionTaskDuration, sliderElement.value);
      uiRunnning();
      break;
    case pomodoroStates.rest:
      sessionStorage.setItem(sessionRestDuration, sliderElement.value);
      uiRest();
      break;
    default:
      break;
  }
}

function uiPaused() {
  updateTimer(0);
  setTitle(baseTitle);

  const nextIsRest =
    typeof currentTask !== "undefined"
      ? currentTask.type == taskTypes.rest
        ? false
        : true
      : false;

  // Info message above time
  stateElement.innerText = nextIsRest
    ? "Hora de descansar"
    : "Hora de trabajar";

  // Task name input
  if (!nextIsRest) taskNameElement.removeAttribute("disabled");

  // Slider
  sliderElement.removeAttribute("disabled");
  changeSliderRange(nextIsRest ? 3 : 1, nextIsRest ? 5 : 25, nextIsRest);

  // Background
  nextIsRest ? changeTheme("rest") : changeTheme("work");

  // Buttons
  btnStart.removeAttribute("disabled");
  btnStop.setAttribute("disabled", "disabled");
}

function uiRunnning() {
  stateElement.innerText = pomodoroStates.running;

  taskNameElement.value = "";
  taskNameElement.setAttribute("disabled", "disabled");

  sliderElement.setAttribute("disabled", "disabled");

  btnStart.setAttribute("disabled", "disabled");
  btnStop.removeAttribute("disabled");
}

function uiRest() {
  stateElement.innerText = pomodoroStates.rest;

  taskNameElement.value = "";
  taskNameElement.setAttribute("disabled", "disabled");

  sliderElement.setAttribute("disabled", "disabled");

  btnStart.setAttribute("disabled", "disabled");
  btnStop.removeAttribute("disabled");
}

function changeSliderRange(min, max, nextIsRest) {
  sliderElement.setAttribute("min", min);
  sliderElement.setAttribute("max", max);

  // Remember last value marked by user
  const sliderValue =
    (nextIsRest
      ? sessionStorage.getItem(sessionRestDuration)
      : sessionStorage.getItem(sessionTaskDuration)) || max;

  sliderElement.value = sliderValue;
  sliderValueElement.innerText = sliderValue;
}

function changeTheme(theme) {
  root.setAttribute("theme", theme);
}

// Aux
function dateToString(date) {
  return `${date.toLocaleDateString("es-ES")} ${leadingZeroes(
    date.getHours()
  )}:${leadingZeroes(date.getMinutes())}:${leadingZeroes(date.getSeconds())}`;
}

function leadingZeroes(n) {
  return n >= 0 && n < 10 ? "0" + n : n;
}
