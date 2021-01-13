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

function isValidTask(task) {
  if (task.type == taskTypes.work && (!task.name || task.name.length == 0)) {
    setError("Nombre de tarea inválido");
    return false;
  }
  if (!task.length || task.length < 1) {
    setError("Duración de tarea inválida");
    return false;
  }

  setError(null);
  return true;
}

function loadTasks(){

}
