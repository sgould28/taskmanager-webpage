const taskInput = document.getElementById("taskInput");
const addTaskButton = document.getElementById("addTaskButton");
const taskList = document.getElementById("taskList");
const progressBar = document.getElementById("progressBar");
const progressLabel = document.getElementById("progressLabel");
const taskSummary = document.getElementById("taskSummary");
const emptyState = document.getElementById("emptyState");

const tasks = [];

function updateProgress() {
  const completedCount = tasks.filter((task) => task.completed).length;
  const totalCount = tasks.length;
  const progressPercent = totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100);

  progressBar.style.width = `${progressPercent}%`;
  progressBar.textContent = totalCount === 0 ? "" : `${progressPercent}%`;
  progressBar.parentElement.setAttribute("aria-valuenow", String(progressPercent));
  progressLabel.textContent = `${progressPercent}% Complete`;
  taskSummary.textContent = `${completedCount} of ${totalCount} completed`;
  emptyState.classList.toggle("hidden", totalCount > 0);
}

function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const listItem = document.createElement("li");
    listItem.className = `task-item${task.completed ? " completed" : ""}`;

    const details = document.createElement("div");
    details.className = "task-details";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "task-checkbox";
    checkbox.checked = task.completed;
    checkbox.addEventListener("change", () => {
      tasks[index].completed = checkbox.checked;
      renderTasks();
    });

    const taskText = document.createElement("span");
    taskText.className = "task-text";
    taskText.textContent = task.name;

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.className = "delete-task";
    deleteButton.textContent = "Remove";
    deleteButton.addEventListener("click", () => {
      tasks.splice(index, 1);
      renderTasks();
    });

    details.appendChild(checkbox);
    details.appendChild(taskText);
    listItem.appendChild(details);
    listItem.appendChild(deleteButton);
    taskList.appendChild(listItem);
  });

  updateProgress();
}

function addTask() {
  const newTask = taskInput.value.trim();

  if (!newTask) {
    taskInput.focus();
    return;
  }

  tasks.push({
    name: newTask,
    completed: false
  });

  taskInput.value = "";
  taskInput.focus();
  renderTasks();
}

addTaskButton.addEventListener("click", addTask);

taskInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    addTask();
  }
});

updateProgress();
