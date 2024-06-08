// Function to add a new task
function addTask() {
    var taskInput = document.getElementById("taskInput");
    var taskText = taskInput.value.trim();

    if (taskText !== "") {
        var taskItem = document.createElement("li");
        taskItem.className = "taskItem";
        
        var taskTextSpan = document.createElement("span");
        taskTextSpan.textContent = taskText;
        
        var deleteButton = createButton("Delete", "deleteButton", function() {
            taskItem.remove();
            saveTasks();
        });

        var editButton = createButton("Edit", "editButton", function() {
            var newText = prompt("Edit Task", taskText);
            if (newText !== null) {
                taskTextSpan.textContent = newText;
                saveTasks();
            }
        });

        taskItem.appendChild(taskTextSpan);
        taskItem.appendChild(editButton);
        taskItem.appendChild(deleteButton);
        document.getElementById("taskList").appendChild(taskItem);
        taskInput.value = "";

        // Save tasks to local storage
        saveTasks();
    }
}

// Function to create a button
function createButton(text, className, onClick) {
    var button = document.createElement("button");
    button.textContent = text;
    button.className = "button " + className;
    button.onclick = onClick;
    return button;
}

// Function to save tasks to local storage
function saveTasks() {
    var tasks = [];
    var taskItems = document.querySelectorAll("#taskList .taskItem span");
    taskItems.forEach(function(taskItem) {
        tasks.push(taskItem.textContent);
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to load tasks from local storage
function loadTasks() {
    var tasks = JSON.parse(localStorage.getItem("tasks"));
    if (tasks) {
        tasks.forEach(function(taskText) {
            var taskItem = document.createElement("li");
            taskItem.className = "taskItem";
            
            var taskTextSpan = document.createElement("span");
            taskTextSpan.textContent = taskText;

            var deleteButton = createButton("Delete", "deleteButton", function() {
                taskItem.remove();
                saveTasks();
            });

            var editButton = createButton("Edit", "editButton", function() {
                var newText = prompt("Edit Task", taskText);
                if (newText !== null) {
                    taskTextSpan.textContent = newText;
                    saveTasks();
                }
            });

            taskItem.appendChild(taskTextSpan);
            taskItem.appendChild(editButton);
            taskItem.appendChild(deleteButton);
            document.getElementById("taskList").appendChild(taskItem);
        });
    }
}

// Load tasks when the page is loaded
window.onload = function() {
    loadTasks();
    document.getElementById("addTaskBtn").addEventListener("click", addTask);
};
