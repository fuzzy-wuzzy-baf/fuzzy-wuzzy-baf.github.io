let userTasks = {
    tasks: [],
    save: function () {
        const json = JSON.stringify(this.tasks);
        localStorage.setItem('tasks', json);
        return json;
    } 
}

const todoForm = document.querySelector('.todo-form');
const tasks = document.querySelector('.tasks');

// добавление в объект задачи
function updateTasks () {
    let arrayTask = [];

    Array.from(tasks.children).forEach((elem, index) => {
        arrayTask.push({id: index + 1, content: elem.querySelector('p').innerText})
    });

    userTasks.tasks = arrayTask;
    userTasks.save()
}

// получение объекта с локального хранищища
function getTasks(json) {
    const obj = JSON.parse(json);
    obj.forEach(elem => {
        let newTask = document.createElement('li');
        newTask.classList.add('task');
        newTask.innerHTML = `<div class="content-task">
                                        <p>${elem.content}</p> 
                                        <div class="buttons-task">
                                            <button class="delete"><i class="fa-solid fa-trash"></i></button>
                                        </div>
                                    </div>`;
        document.querySelector('.tasks').append(newTask);
    })
}

window.addEventListener('load', () => {
    getTasks(localStorage.getItem('tasks'));
});

todoForm.addEventListener('click', event => {
    if(event.target.closest('.new-task')) {
        event.preventDefault();
        let valueInput = document.querySelector('.input-task').value;
        let newTask = document.createElement('li');
        newTask.classList.add('task');
        if (!valueInput) {
            newTask.innerHTML = `<div class="content-task">
                                        <p>Без названия</p> 
                                        <div class="buttons-task">
                                            <button class="delete"><i class="fa-solid fa-trash"></i></button>
                                        </div>
                                    </div>`;
        } else {
            newTask.innerHTML = `<div class="content-task">
                                        <p>${valueInput}</p> 
                                        <div class="buttons-task">
                                            <button class="delete"><i class="fa-solid fa-trash"></i></button>
                                        </div>
                                    </div>`;
        }
        document.querySelector('.tasks').append(newTask);
        updateTasks();
    }
});

tasks.addEventListener('click', event => {
    if (event.target.closest('.delete')) {
        event.target.closest('.task').remove();
        updateTasks();
    }
});