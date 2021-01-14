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

const localTasksKey = "tasks";

function createTask(task) {
  currentTask = task;

  // Store the task if it is not a rest
  if (task.type == taskTypes.work) {
    storeTask(task);
    addTaskUi(task);
  }
}

function endTask(task, manually) {
  task.status = manually ? taskStates.canceled : taskStates.finished;
  if (task.type == taskTypes.work) {
    updateTask(task);
    endTaskUi(task, manually);
  }
}

function isValidTask(task) {
  if (!task.length || task.length < 1) {
    setError("Duración de tarea inválida");
    return false;
  }

  if (task.type == taskTypes.work) {
    if (!task.name || task.name.length == 0) {
      setError("Nombre de tarea inválido");
      return false;
    }

    if (taskExists(task)) {
      setError("Nombre de tarea repetido");
      return false;
    }
  }

  setError(null);
  return true;
}

// Load previous tasks from local storage
function loadTasks() {
  if (!localStorage.getItem(localTasksKey)) return;

  const tasks = JSON.parse(localStorage.getItem(localTasksKey));
  for (const task of tasks) {
    task.date = new Date(task.date); // Date was stringified in localStorage
    addTaskUi(task);
    endTask(task);
  }
}

function nextTaskId() {
  if (!localStorage.getItem(localTasksKey)) return 0;
  const tasks = JSON.parse(localStorage.getItem(localTasksKey));
  return tasks[tasks.length - 1].id + 1;
}

// Stores a task, updating localStorage
function storeTask(task) {
  // No tasks stored yet
  if (!localStorage.getItem(localTasksKey)) {
    localStorage.setItem(localTasksKey, JSON.stringify([task]));
  } else {
    const tasks = JSON.parse(localStorage.getItem(localTasksKey));
    localStorage.setItem(localTasksKey, JSON.stringify([...tasks, task]));
  }
}

// Updates a task data in localStorage
function updateTask(task) {
  if (!localStorage.getItem(localTasksKey)) return;

  const tasks = JSON.parse(localStorage.getItem(localTasksKey));
  const idx = tasks.findIndex((t) => t.id == task.id);
  tasks[idx] = task;
  localStorage.setItem(localTasksKey, JSON.stringify(tasks));
}

// Find wether a task with a similar name as the provided in the parameters already exists
function taskExists(task) {
  if (!localStorage.getItem(localTasksKey)) return false;

  const tasks = JSON.parse(localStorage.getItem(localTasksKey));
  return tasks.some((t) => t.name == task.name);
}

loadTasks();
