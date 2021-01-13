// Timing management with webworkers

// Countdown of "n" seconds.
// The UI is modified to represent the countdown state
// On countdown end, post message to the main thread
function countdown(n) {
  const interval = setInterval(() => {
    n--;
    postMessage(n);

    if (n == 0) {
      clearInterval(interval);
      postMessage({ status: "Done" });
    }
  }, 1000);
}

// Trigger on message
self.addEventListener(
  "message",
  (message) => {
    if (typeof message.data === "number") {
      postMessage(message.data);
      // countdown(message.data);
      countdown(3);
    }
  },
  false
);
