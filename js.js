const inputBox = document.getElementById('input-task'),
    addBtn = document.getElementById('add-task-button'),
    taskList = document.getElementById('task-list');


//arr for tasks
let tasks = JSON.parse(localStorage.getItem('ToDoTasks')) || [];


//toggle addButton
inputBox.onkeyup = () => {

    if ( inputBox.value.trim() ) {
        addBtn.classList.add('active');
    } else {
        addBtn.classList.remove('active');
    }
}


//constructor tasks
function Task(description) {
    this.description = description;
    this.completed = false;
}


//f update localSt
const updateLocal = () => {
    localStorage.setItem('ToDoTasks', JSON.stringify(tasks))
}


//add Task
addBtn.addEventListener('click', () => {
    if ( !inputBox.value.trim() ) return;
    tasks.push(new Task(inputBox.value))
    updateLocal();
    addTaskInHTML();
    inputBox.value = '';
    inputBox.focus();
});

inputBox.addEventListener("keydown", ({key}) => {
    if (key === "Enter") {
        if ( !inputBox.value.trim() ) return;
        tasks.push(new Task(inputBox.value))
        updateLocal();
        addTaskInHTML();
        inputBox.value = '';
    }
        })

//template for task
const createTemplate = (task, index) => {
    return `
        <li>
          <input onclick="completeTask(${index})" type="checkbox" ${task.completed ? 'checked' : ''}>
          <span class="task">${task.description}</span>
          <button onclick="deleteTask(${index})" class="delete-btn">DELETE</button>
        </li>
    `
}


//add task in HTML
const addTaskInHTML = () => {
    taskList.innerHTML = '';
    if (tasks.length > 0) {
        tasks.forEach((item, index) => {
            taskList.innerHTML += createTemplate(item, index);
        })
    }
}


//update list on render page
addTaskInHTML();


//complete task
const completeTask = (index) => {
    tasks[index].completed = !tasks[index].completed;
    updateLocal();
}

//delete task
const deleteTask = (index) => {
        tasks.splice(index, 1);
        updateLocal();
        addTaskInHTML();
}



