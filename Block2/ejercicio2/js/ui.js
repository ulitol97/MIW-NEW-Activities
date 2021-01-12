// UI Management
const root = document.documentElement;

const timeElement = document.getElementById("time");
const stateElement = document.getElementById("state");

const taskNameElement = document.getElementById("taskname");

const sliderElement = document.getElementById("slider");
const sliderValueElement = document.getElementById("slider-value");
sliderValueElement.innerText = sliderElement.value;
sliderElement.oninput = () =>
  (sliderValueElement.innerText = sliderElement.value);

const errorElement = document.getElementById("error");

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
      uiRunnning();
      break;
    case pomodoroStates.rest:
      uiRest();
      break;
    default:
      break;
  }
}

function uiPaused() {
  updateTimer(0);

  const nextIsRest =
    typeof currentTask !== "undefined"
      ? currentTask.type == taskTypes.rest
        ? false
        : true
      : false;

  stateElement.innerText = nextIsRest
    ? "Hora de descansar"
    : "Hora de trabajar";

  changeSliderRange(nextIsRest ? 5 : 25);

  if (!nextIsRest) taskNameElement.removeAttribute("disabled");

  nextIsRest ? changeTheme("rest") : changeTheme("work");

  sliderElement.removeAttribute("disabled");
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

function changeSliderRange(max) {
  sliderElement.setAttribute("max", max);
  sliderElement.value = max;
  sliderValueElement.innerText = max;
}

function changeTheme(theme) {
  root.setAttribute("theme", theme);
}
