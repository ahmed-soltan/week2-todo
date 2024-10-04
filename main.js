const taskInput = document.getElementById("taskInput");
const addTaskButton = document.getElementById("addTaskButton");
const taskList = document.getElementById("taskList");
const notification = document.getElementById("notification");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const showNotification =(message, type = "success")=> {
  notification.textContent = message;
  notification.className = `p-3 rounded-lg text-white mb-4 ${
    type === "success" ? "bg-green-500" : "bg-red-500"
  }  absolute top-10 left-[50%] -translate-x-1/2 w-full max-w-[500px] max-auto text-center`;
  notification.classList.remove("hidden");

  setTimeout(() => {
    notification.classList.add("hidden");
  }, 3000);
}

const saveTasks = () =>{
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

const displayTasks=() =>{
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const taskItem = document.createElement("li");
    taskItem.className = `flex justify-between items-center p-2 bg-gray-100 rounded-lg`;

    const taskText = document.createElement("span");
    taskText.textContent = task.name;
    taskText.className = `flex-grow ${
      task.completed ? "line-through text-gray-400" : ""
    }`;

    const completeButton = document.createElement("button");
    completeButton.textContent = task.completed ? "Undo" : "Complete";
    completeButton.className = "text-blue-500 ml-2 hover:underline";
    completeButton.addEventListener("click", () => toggleComplete(index));

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.className = "text-red-500 hover:underline ml-2";
    deleteButton.addEventListener("click", () => deleteTask(index));

    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.className = "text-yellow-500 hover:underline ml-2";
    editButton.addEventListener("click", () => editTask(index));

    taskItem.append(taskText, completeButton, deleteButton , editButton);
    taskList.appendChild(taskItem);
  });
}

const addTask=()=> {
  const taskName = taskInput.value.trim();

  if (taskName.trim() === "") {
    showNotification("Task cannot be empty!", "error");
    return;
  }

  const newTask = { name: taskName, completed: false };
  tasks.push(newTask);
  saveTasks();
  displayTasks();
  taskInput.value = "";
  showNotification("Task added successfully!");
}

const toggleComplete=(index) =>{
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  displayTasks();
  showNotification(
    tasks[index].completed ? "Task completed!" : "Task marked as incomplete.",
    tasks[index].completed ? "success" : "error"
  );
}

const deleteTask=(index)=> {
  tasks.splice(index, 1);
  saveTasks();
  displayTasks();
  showNotification("Task deleted!", "error");
}

const editTask=(index)=>{
  const existingTask = tasks.find((_,idx)=>idx === index)
  if(!existingTask){
    showNotification("Task Not Found!", "error");
    return;
  }

  const updatedTask = prompt("Enter updated task name:", existingTask.name);
  if(updatedTask === null || updatedTask.trim() === ""){
    showNotification("Task name cannot be empty!", "error");
    return;
  }

  existingTask.name = updatedTask;
  saveTasks();
  displayTasks();
  showNotification("Task updated successfully!");

}

addTaskButton.addEventListener("click", addTask);

window.onload = () => {
  displayTasks();
};
