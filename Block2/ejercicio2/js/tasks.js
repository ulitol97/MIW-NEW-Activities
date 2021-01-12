// Task management in indexed BD

function createTask(taskInfo) {
  if (!isValidTask(taskInfo)) return;
  console.info("Creating task: ", taskInfo);
}

function isValidTask(taskInfo) {
  console.log(taskInfo);
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
