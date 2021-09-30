let addTask = document.getElementById("add-task-button");
let task = document.getElementById("input-task");
let list = document.getElementById("task-list");

let taskList;

!localStorage.taskList ? taskList = [] : taskList = JSON.parse(localStorage.getItem('taskList'));

let todoItemElems = [];

function Task(description) {
    this.description = description;
    this.completed = false;
}

const createTemplate = (item, index) => {

    return `<li class="todo-item">
      <label for="item">
 <input onclick="completeTask(${index})" ${item.completed ? 'checked' : ''} type="checkbox">
<span class = "task ${item.completed ? 'checked' : ''}" >${item.description}</span>
</label>
<button  onclick="deleteTask(${index})" class="delete-btn" type="button"> 
<img src = "https://www.maxpixel.net/static/photo/1x/Cross-Icon-Cancel-Abort-No-Access-Denied-Delete-146072.png" width="25" alt="delete button">
</button>
</li>
`
}

const filterTasks = () => {
    const activeTasks = taskList.length > 0 && taskList.filter(item => item.completed === false);
    const completedTasks = taskList.length > 0 && taskList.filter(item => item.completed === true);
    taskList = [...activeTasks,...completedTasks];
}

const fillHtmlList = () => {
    list.innerHTML = "";
    if(taskList.length > 0) {
        filterTasks();
        taskList.forEach((item, index) => {
            list.innerHTML += createTemplate(item, index);
        });
        todoItemElems = document.querySelectorAll(".todo-item");
    }
}

fillHtmlList();

const updateLocal = () => {
    localStorage.setItem('taskList', JSON.stringify(taskList));
}

const completeTask = (index) => {
    console.log(index);
    taskList[index].completed = !taskList[index].completed;
    if(taskList[index].completed) {
        todoItemElems[index].classList.add('checked');
    } else {
        todoItemElems[index].classList.remove('checked');
    }
    updateLocal();
    fillHtmlList();
}

addTask.addEventListener ('click', () => {
    taskList.push(new Task(task.value));
    console.log(taskList);
    updateLocal();
    fillHtmlList();
    task.value = '';
})

const deleteTask = index => {
    console.log(index);
        taskList.splice(index, 1);
        updateLocal();
        fillHtmlList();
}
