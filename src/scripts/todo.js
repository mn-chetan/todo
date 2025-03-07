export const updateTodo = (todos) => {
  // Select the container for the todo list
  const todoList = document.querySelector(".todo-list");

  // Clear existing content to avoid duplication
  todoList.innerHTML = "";

  // Iterate over the todos array to create and append new todo items
  todos.forEach((todo) => {
    const todoItem = document.createElement("div");
    todoItem.classList.add("todo-item");
    todoItem.dataset.priority = todo.priority; // Store priority as a data attribute for later use

    // Define the HTML structure for each todo item
    todoItem.innerHTML = `
      <span class="todo-title">${todo.title}</span>
      <span class="todo-due">Due: ${todo.dueDate}</span>
      <button class="delete-btn">X</button>
    `;

    // Append the newly created todo item to the list
    todoList.appendChild(todoItem);
  });
};

export const expandTodo = () => {
  // Get all todo items currently in the DOM
  const todoItems = document.querySelectorAll(".todo-item");

  todoItems.forEach((todoItem) => {
    // Add a click listener to each todo item to expand it into an editable form
    todoItem.addEventListener("click", () => {
      // Remove any existing todo container to ensure only one form is displayed at a time
      const existingTodoContainer = document.querySelector(".todo-container");
      if (existingTodoContainer) existingTodoContainer.remove();

      // Create a container for the editable form
      const todoContainer = document.createElement("div");
      todoContainer.classList.add("todo-container");

      const todoForm = document.createElement("form");

      // Title field
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

      // Due date field
      const dueDateLabel = document.createElement("label");
      dueDateLabel.setAttribute("for", "due-date");
      dueDateLabel.textContent = "Due Date:";
      const dueDateInput = document.createElement("input");
      dueDateInput.setAttribute("type", "date");
      dueDateInput.setAttribute("id", "due-date");
      // Extract the date portion after "Due: " (assumes format is consistent)
      dueDateInput.setAttribute(
        "value",
        todoItem.querySelector(".todo-due").textContent.split(" ")[1]
      );

      // Priority dropdown
      const priorityLabel = document.createElement("label");
      priorityLabel.setAttribute("for", "priority");
      priorityLabel.textContent = "Priority:";
      const prioritySelect = document.createElement("select");
      prioritySelect.setAttribute("id", "priority");
      const priorityLowOption = document.createElement("option");
      // Capitalize the first letter of the stored priority for display
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

      // Create container for form buttons
      const buttonContainer = document.createElement("div");
      buttonContainer.classList.add("button-container");

      // Submit Button
      const submitButton = document.createElement("button");
      submitButton.textContent = "Submit";
      submitButton.classList.add("btn-submit");

      // Close Button
      const closeButton = document.createElement("button");
      closeButton.textContent = "Close";
      closeButton.classList.add("btn-close");

      buttonContainer.appendChild(submitButton);
      buttonContainer.appendChild(closeButton);

      // Assemble the form
      todoForm.appendChild(titleLabel);
      todoForm.appendChild(titleInput);
      todoForm.appendChild(dueDateLabel);
      todoForm.appendChild(dueDateInput);
      todoForm.appendChild(priorityLabel);
      todoForm.appendChild(prioritySelect);
      todoForm.appendChild(buttonContainer);

      todoContainer.appendChild(todoForm);

      // Insert the form container after the clicked todo item
      todoItem.after(todoContainer);
    });
  });
};
