// Countdown of "n" seconds.
// The UI is modified to represent the countdown state
// On countdown end, post message to the main thread
function countdown(n) {
  const interval = setInterval(() => {
    n--;
    postMessage(secondsToString(n));

    if (n == 0) {
      clearInterval(interval);
      postMessage({ status: "Done" });
    }
  }, 1000);
}

function secondsToString(seconds) {
  let minutes = Math.floor(seconds / 60);
  if (minutes < 10) minutes = "0" + minutes;

  let secs = seconds % 60;
  if (secs < 10) secs = "0" + secs;

  return `${minutes}:${secs}`;
}

// Countdown 10 example
countdown(5);
minutes;
