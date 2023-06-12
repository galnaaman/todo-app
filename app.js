let tasks= [];
loadFromLocalStorage();
function loadFromLocalStorage(){
    const tasksStr = localStorage.getItem("myTasks");
    if(tasksStr){
        tasks = JSON.parse(tasksStr);
        console.log("Load Data for local storage");
        displayTasks();
    }
};

function saveToLocalStorage(){
    const tasksStr = JSON.stringify(tasks);
    localStorage.setItem("myTasks", tasksStr);
}

function newTask() {
    event.preventDefault();

    const title = document.getElementById("titleText");
    const description = document.getElementById("descriptionText");
    const startDate = document.getElementById("startDate");
    const endDate = document.getElementById("endDate");
    const form = document.getElementById("taskForm");

    const task = {
        title: title.value,
        description: description.value,
        startDate: startDate.value,
        endDate: endDate.value,
    };
    tasks.push(task);

    saveToLocalStorage();

    displayTasks();

    form.reset();
    title.focus();

};
// this
function displayTasks(){
    const tasksContainer = document.getElementById("tasksContainer");

    let html = "";
    for(let i = 0; i < tasks.length; i++){

        html += `
        <div class="col-md-4 col-sm-6 content-card">
            <div class="card-big-shadow shadow rounded">
                <div class="card-custom card-just-text" data-background="color" data-color="yellow" data-radius="none">
                    <div class="card-header p-3">
                        <button type="button" class="btn-close float-end invisible "onclick="deleteTask(${i})"></button>
                    </div>
                    <div class="content scrollable">
                        <h4 class="title">${tasks[i].title}</h4>
                        <h6 class="category">${tasks[i].startDate} -  ${tasks[i].endDate}</h6>
                        <p class="description">${tasks[i].description} </p>
                    </div>
                </div>
            </div>
        </div>
        
        
        `;

    }
    tasksContainer.innerHTML = html;
};

function deleteTask(id){
    tasks.splice(id, 1);
    saveToLocalStorage();
    displayTasks();
};


function resetForm(){
    const form = document.getElementById("taskForm");
    form.reset();
    form.title.focus();
}
