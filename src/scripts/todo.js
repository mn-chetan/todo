export const updateTodo = (todos) => {
  const todoList = document.querySelector(".todo-list");
  todoList.innerHTML = "";
  todos.forEach((todo) => {
    const todoItem = document.createElement("div");
    todoItem.classList.add("todo-item");
    todoItem.dataset.priority = todo.priority;
    todoItem.innerHTML = `
      <span class="todo-title">${todo.title}</span>
      <span class="todo-due">Due: ${todo.dueDate}</span>
      <button class="delete-btn">X</button>
    `;
    todoList.appendChild(todoItem);
  });
};

export const expandTodo = () => {
  const todoItems = document.querySelectorAll(".todo-item");
  todoItems.forEach((todoItem) => {
    // Display a form on click
    // Form can be used to edit todo fields
    todoItem.addEventListener("click", () => {
      // Remove any existing todo container before appending new one
      const existingTodoContainer = document.querySelector(".todo-container");
      if (existingTodoContainer) existingTodoContainer.remove();

      const todoContainer = document.createElement("div");
      todoContainer.classList.add("todo-container");

      const todoForm = document.createElement("form");

      const titleLabel = document.createElement("label");
      titleLabel.setAttribute("for", "title");
      titleLabel.textContent = "Title:";
      const titleInput = document.createElement("input");
      titleInput.setAttribute("type", "text");
      titleInput.setAttribute("id", "title");
      titleInput.setAttribute(
        "placeholder",
        todoItem.querySelector(".todo-title").textContent
      );

      const dueDateLabel = document.createElement("label");
      dueDateLabel.setAttribute("for", "due-date");
      dueDateLabel.textContent = "Due Date:";
      const dueDateInput = document.createElement("input");
      dueDateInput.setAttribute("type", "date");
      dueDateInput.setAttribute("id", "due-date");
      dueDateInput.setAttribute(
        "value",
        todoItem.querySelector(".todo-due").textContent.split(" ")[1]
      );

      const priorityLabel = document.createElement("label");
      priorityLabel.setAttribute("for", "priority");
      priorityLabel.textContent = "Priority:";
      const prioritySelect = document.createElement("select");
      prioritySelect.setAttribute("id", "priority");
      const priorityLowOption = document.createElement("option");
      priorityLowOption.textContent =
        todoItem.dataset.priority[0].toUpperCase() +
        todoItem.dataset.priority.slice(1);
      const priorityMediumOption = document.createElement("option");
      priorityMediumOption.textContent = "Medium";
      const priorityHighOption = document.createElement("option");
      priorityHighOption.textContent = "High";
      prioritySelect.appendChild(priorityLowOption);
      prioritySelect.appendChild(priorityMediumOption);
      prioritySelect.appendChild(priorityHighOption);

      todoForm.appendChild(titleLabel);
      todoForm.appendChild(titleInput);
      todoForm.appendChild(dueDateLabel);
      todoForm.appendChild(dueDateInput);
      todoForm.appendChild(priorityLabel);
      todoForm.appendChild(prioritySelect);

      todoContainer.appendChild(todoForm);

      todoItem.after(todoContainer);
    });
  });
};
