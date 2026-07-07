const taskInput = document.getElementById("taskInput");
const taskDate = document.getElementById("taskDate");
const taskPriority = document.getElementById("taskPriority");
const addTaskBtn = document.getElementById("addTask");

const taskList = document.getElementById("taskList");
const searchTask = document.getElementById("searchTask");

const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");
const pendingTasks = document.getElementById("pendingTasks");

const clearCompletedBtn = document.getElementById("clearCompleted");
const clearAllBtn = document.getElementById("clearAll");

const emptyState = document.getElementById("emptyState");

let tasks = [];

function loadTasks() {

    const savedTasks = localStorage.getItem("studentPlanner");

    if(savedTasks){

        tasks = JSON.parse(savedTasks);

    }

    renderTasks();

}

loadTasks();

function saveTasks(){

    localStorage.setItem(

        "studentPlanner",

        JSON.stringify(tasks)

    );

}

function createID(){

    return Date.now() + Math.floor(Math.random()*1000);

}

function addTask(){

    const title = taskInput.value.trim();

    const date = taskDate.value;

    const priority = taskPriority.value;

    if(title===""){

        alert("Please enter a task.");

        taskInput.focus();

        return;

    }

    const task={

        id:createID(),

        title:title,

        date:date,

        priority:priority,

        completed:false

    };

    tasks.unshift(task);

    saveTasks();

    renderTasks();

    taskInput.value="";

    taskDate.value="";

    taskPriority.selectedIndex=1;

    taskInput.focus();

}

function renderTasks(){

    taskList.innerHTML="";

    if (tasks.length === 0) {

    emptyState.style.display = "block";

} else {

    emptyState.style.display = "none";

}

    tasks.forEach(task=>{

        const item=document.createElement("li");

        item.className="task-item";

        item.dataset.id=task.id;

        if(task.completed){

            item.classList.add("completed");

        }

        item.innerHTML=`

        <div class="task-info">

            <h3>${task.title}</h3>

            <p>

                <span class="priority ${task.priority.toLowerCase()}">

                    ${task.priority}

                </span>

                ${task.date || "No Due Date"}

            </p>

        </div>

        <div class="task-buttons">

            <button class="complete-btn">

                <i class="fas fa-check"></i>

            </button>

            <button class="edit-btn">

                <i class="fas fa-pen"></i>

            </button>

            <button class="delete-btn">

                <i class="fas fa-trash"></i>

            </button>

        </div>

        `;

        taskList.appendChild(item);

    });

    updateStatistics();

}

function updateStatistics(){

    totalTasks.textContent=tasks.length;

    const completed=tasks.filter(task=>task.completed);

    completedTasks.textContent=completed.length;

    pendingTasks.textContent=

    tasks.length-completed.length;

}

searchTask.addEventListener("keyup",function(){

    const value=this.value.toLowerCase();

    const items=document.querySelectorAll(".task-item");

    items.forEach(item=>{

        const title=item.querySelector("h3")

        .textContent

        .toLowerCase();

        if(title.includes(value)){

            item.style.display="flex";

        }

        else{

            item.style.display="none";

        }

    });

});

addTaskBtn.addEventListener("click",addTask);

taskInput.addEventListener("keydown",function(e){

    if(e.key==="Enter"){

        e.preventDefault();

        addTask();

    }

});

taskList.addEventListener("click", function (e) {

    const item = e.target.closest(".task-item");

    if (!item) return;

    const id = Number(item.dataset.id);

    // Complete Task
    if (e.target.closest(".complete-btn")) {

        toggleComplete(id);

    }

    // Edit Task
    if (e.target.closest(".edit-btn")) {

        editTask(id);

    }

    // Delete Task
    if (e.target.closest(".delete-btn")) {

        deleteTask(id);

    }

});

function toggleComplete(id) {

    tasks = tasks.map(task => {

        if (task.id === id) {

            task.completed = !task.completed;

        }

        return task;

    });

    saveTasks();

    renderTasks();

    showNotification("Task updated successfully!", "success");

}

function editTask(id) {

    const task = tasks.find(task => task.id === id);

    if (!task) return;

    const updatedTitle = prompt("Edit Task", task.title);

    if (updatedTitle === null) return;

    if (updatedTitle.trim() === "") {

        alert("Task cannot be empty.");

        return;

    }

    task.title = updatedTitle.trim();

    saveTasks();

    renderTasks();

    showNotification("Task edited successfully!", "success");

}

function deleteTask(id) {

    if (!confirm("Delete this task?")) return;

    tasks = tasks.filter(task => task.id !== id);

    saveTasks();

    renderTasks();

    showNotification("Task deleted.", "error");

}

clearCompletedBtn.addEventListener("click", function () {

    const completed = tasks.filter(task => task.completed);

    if (completed.length === 0) {

        alert("There are no completed tasks.");

        return;

    }

    if (!confirm("Remove all completed tasks?")) {

        return;

    }

    tasks = tasks.filter(task => !task.completed);

    saveTasks();

    renderTasks();

    showNotification("Completed tasks removed.", "success");

});

clearAllBtn.addEventListener("click", function () {

    if (tasks.length === 0) {

        alert("Task list is already empty.");

        return;

    }

    if (!confirm("Delete ALL tasks?")) {

        return;

    }

    tasks = [];

    saveTasks();

    renderTasks();

    showNotification("All tasks deleted.", "error");

});

function showNotification(message, type = "success") {

    let note = document.querySelector(".notification");

    if (note) {

        note.remove();

    }

    note = document.createElement("div");

    note.className = `notification ${type}`;

    note.innerHTML = `

        <i class="fas ${type === "success"
            ? "fa-circle-check"
            : "fa-circle-xmark"}"></i>

        <span>${message}</span>

    `;

    document.body.appendChild(note);

    setTimeout(() => {

        note.classList.add("show");

    }, 100);

    setTimeout(() => {

        note.classList.remove("show");

    }, 2800);

    setTimeout(() => {

        note.remove();

    }, 3400);

}

function sortTasks() {

    const order = {

        High: 1,

        Medium: 2,

        Low: 3

    };

    tasks.sort((a, b) => {

        return order[a.priority] - order[b.priority];

    });

}

const originalRender = renderTasks;

renderTasks = function () {

    sortTasks();

    originalRender();

};

renderTasks();