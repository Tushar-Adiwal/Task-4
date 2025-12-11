const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const themeSwitch = document.getElementById("themeSwitch");

loadTasks();

// Theme Toggle
themeSwitch.addEventListener("change", () => {
    document.body.classList.toggle("light");
});

// Add Task
addBtn.addEventListener("click", addTask);
taskInput.addEventListener("keypress", e => { if(e.key==='Enter') addTask(); });

function addTask(){
    const value = taskInput.value.trim();
    if(!value) return;

    createTaskElement(value);
    saveTask(value, false);

    taskInput.value = "";
}

// Create Task Element
function createTaskElement(text, completed=false){
    const li = document.createElement("li");

    const span = document.createElement("span");
    span.className = "task-text";
    span.textContent = text;
    if(completed) span.classList.add("completed");

    span.addEventListener("click", () => {
        span.classList.toggle("completed");
        updateTaskStatus(text, span.classList.contains("completed"));
    });

    const delBtn = document.createElement("button");
    delBtn.className = "delete-btn";
    delBtn.textContent = "Delete";
    delBtn.addEventListener("click", () => {
        li.remove();
        removeTask(text);
    });

    li.appendChild(span);
    li.appendChild(delBtn);
    taskList.appendChild(li);
}

// LocalStorage Functions
function saveTask(task, completed){
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push({text: task, completed: completed});
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks(){
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(t => createTaskElement(t.text, t.completed));
}

function removeTask(task){
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter(t => t.text !== task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateTaskStatus(task, completed){
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(t => { if(t.text === task) t.completed = completed; });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function clearAll(){
    localStorage.removeItem("tasks");
    taskList.innerHTML = "";
}
