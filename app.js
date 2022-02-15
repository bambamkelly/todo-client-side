/////////////////////////////////////////////////////////////////////////////////////////////////////////////////selectors
const todoInput = document.querySelector('.todo-input')
const todoButton = document.querySelector('.todo-button')
const todoList = document.querySelector('.todo-list')
const fliterOption = document.querySelector('.fliter-todo')


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////Event Listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', manipulateTaskThroughButtons);


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////Functions
function addTodo(event) {
    //prevent form from submitting
    event.preventDefault();

    //Todo Div
    /*  <div class="todo">
          <li class="todo-item"></li>
          <button class="complete-btn">
                <i class="fas fa-check"></i>
          </button>
          <button class="trash-btn">
                <i class="fas fa-trash"></i>
          </button>
        </div>  
    */
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    //create li
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');

    // adding the li under the Div
    todoDiv.appendChild(newTodo);

    //save to local stroage
    //Save to local
    saveLocalTodos(todoInput.value);

    //Check Mark Button (completed)
    const completeButton = document.createElement('button');
    completeButton.innerHTML = '<i class="fas fa-check"></i>';
    completeButton.classList.add('complete-btn');

    // adding the button under the Div
    todoDiv.appendChild(completeButton);

    //Check Trash Button (completed)
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add('trash-btn');

    // adding the button under the Div
    todoDiv.appendChild(trashButton);

    //Append to list
    todoList.appendChild(todoDiv);

    //after you input a value you want to vclear the input bar. (Clear)

    todoInput.value = "";

}

function manipulateTaskThroughButtons(e) {
    const whateverButton = e.target;

    // DELETE TODO
    if (whateverButton.classList[0] === "trash-btn") {
        //when ever the trash-btn is clicked the parent item (todoDiv) will be deleted 
        const removeTodo = whateverButton.parentElement;
        //Animation
        removeTodo.classList.add('fall');
        removeLocalTodos(removeTodo);
        //after the "fall" animation is done the transitionend function will excute which will altimatly delete the Task
        removeTodo.addEventListener('transitionend', function() {
            removeTodo.remove();
        });

    }


    //CHECK MARK
    if (whateverButton.classList[0] === "complete-btn") {
        //when ever the complete-btn is clicked the===============================parent item (todoDiv) will be deleted 
        const completeTodo = whateverButton.parentElement;
        completeTodo.classList.toggle('completed');


    }

}









function saveLocalTodos(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}


function getTodos() {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(function(todo) {

        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");

        //create li
        const newTodo = document.createElement('li');
        newTodo.innerText = todo;
        newTodo.classList.add('todo-item');

        // adding the li under the Div
        todoDiv.appendChild(newTodo);

        //Check Mark Button (completed)
        const completeButton = document.createElement('button');
        completeButton.innerHTML = '<i class="fas fa-check"></i>';
        completeButton.classList.add('complete-btn');

        // adding the button under the Div
        todoDiv.appendChild(completeButton);

        //Check Trash Button (completed)
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add('trash-btn');

        // adding the button under the Div
        todoDiv.appendChild(trashButton);

        //Append to list
        todoList.appendChild(todoDiv);

    });
}


function removeLocalTodos(todo) {
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}