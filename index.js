const enterTodos = document.getElementById("enter-todos");
const addBtn = document.getElementById("add");
const todosPage = document.getElementById("todos");

// POST
const createTodo = async () => {
    const todo = enterTodos.value;
    
    const userInput = enterTodos.value.trim();
    if (userInput === '') {
        alert('please enter a todo.');
        event.preventDefault();
    }else{
        const todoData = {
            todo: todo
        };
    
        try {
            const response = await fetch("http://localhost:5000/Tasks", {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(todoData)
            });
    
            const thingsTodo = await response.json();
            console.log(thingsTodo);
        } catch (error) {
            console.log(error);
        }
    }



};

addBtn.addEventListener("click", createTodo);

// PUT
const updateTodos = async (todosId) => {
    // const todo = prompt("Enter new Todo");

    let todo;
    do {
      todo = prompt("Please enter new Todo.");
    } while ( todo.trim()=== "");

    const todoData = {
        todo: todo
    };

    try {
        const response = await fetch(`http://localhost:5000/Tasks/${todosId}`, {
            method: "PUT",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(todoData)
        });

        if (response.status === 200) {
            renderTodos();
        }
    } catch (error) {
        console.log(error);
    }
};

// //Done
// function doneTodos(){

// }

// DELETE
const deleteTodos = async (todosId, event) => {
    event.preventDefault()
    try {
        const response = await fetch(`http://localhost:5000/Tasks/${todosId}`, {
            method: "DELETE"
        });

        if (response.status === 200) {
            renderTodos();
        }
    } catch (error) {
        console.log(error);
    }
};

const renderTodos = async () => {
    try {
        // GET
        const response = await fetch("http://localhost:5000/Tasks");
        const todos = await response.json();
        console.log(todos);

        // todosPage.innerHTML = '';

        todos.forEach(todo => {
            const listTodos = document.createElement("li");
            listTodos.classList.add("text");
            listTodos.style.width = "400px"
            listTodos.textContent = `${todo.todo}`;

            // const doneTodo = document.createElement("button");
            // doneTodo.textContent = "Done";
            // doneTodo.classList.add("done-btn");
            // doneTodo.addEventListener("click",(event) =>doneTodos(todo.Id,event));

            const deleteTodo = document.createElement("button");
            deleteTodo.textContent = "Delete";
            deleteTodo.classList.add("delete-btn");
            deleteTodo.addEventListener("click", (event) => deleteTodos(todo.id, event));

            const updateTodo = document.createElement("button");
            updateTodo.textContent = "Update";
            updateTodo.classList.add("update-btn");
            updateTodo.addEventListener("click", () => updateTodos(todo.id));

            // listTodos.appendChild(doneTodo);
            listTodos.appendChild(deleteTodo);
            listTodos.appendChild(updateTodo);
            todosPage.appendChild(listTodos);
        });
    } catch (error) {
        console.log(error);
    }
};

// Call renderTodos to initially display the todos
renderTodos();
