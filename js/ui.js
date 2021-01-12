// UI Management

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
  stateElement.innerText = state;

  // Update colors
  // Update enabled/disabled elements
  switch (state) {
    case pomodoroStates.paused:
      updateTimer(0);
      btnStart.removeAttribute("disabled");
      btnStop.setAttribute("disabled", "disabled");
      break;
    case pomodoroStates.running:
      btnStart.setAttribute("disabled", "disabled");
      btnStop.removeAttribute("disabled");
      break;
    case pomodoroStates.rest:
      btnStart.setAttribute("disabled", "disabled");
      btnStop.removeAttribute("disabled");
      break;
    default:
      break;
  }
}
