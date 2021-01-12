// Task management in indexed BD
let currentTask;
const taskStates = {
  running: "En marcha",
  canceled: "Cancelada",
  finished: "Finalizada",
};
Object.freeze(taskStates);
const taskTypes = {
  work: "work",
  rest: "rest",
};
Object.freeze(taskTypes);

function createTask(taskInfo) {
  currentTask = taskInfo;

  // Store the task if it is not a rest
}

function isValidTask(taskInfo) {
  if (!taskInfo.name || taskInfo.name.length == 0) {
    setError("Nombre de tarea inválido");
    return false;
  }
  if (!taskInfo.length || taskInfo.length < 1) {
    setError("Duración de tarea inválida");
    return false;
  }

  setError(null);
  return true;
}
