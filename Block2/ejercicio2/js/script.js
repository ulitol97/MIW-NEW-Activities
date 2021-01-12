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
    `Tu navegador no parece soportar las tecnologías necesarias: ${errorList}`
  );
}

function setUp() {
  console.info("Inicializando pomodoro");
}

// App entrypoint
sanityCheck();
