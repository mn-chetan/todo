import { getProjectState, setProjectState } from "./projectState";

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
    todoItem.dataset.id = todo.id;

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
      removeExistingTodoContainer();

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
      titleInput.setAttribute("name", "title");

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
      dueDateInput.setAttribute("name", "date");

      // Priority dropdown
      const priorityLabel = document.createElement("label");
      priorityLabel.setAttribute("for", "priority");
      priorityLabel.textContent = "Priority:";
      const prioritySelect = document.createElement("select");
      prioritySelect.setAttribute("id", "priority");
      prioritySelect.setAttribute("name", "priority");
      const priorityLowOption = document.createElement("option");
      priorityLowOption.textContent = "Low";
      const priorityMediumOption = document.createElement("option");
      priorityMediumOption.textContent = "Medium";
      const priorityHighOption = document.createElement("option");
      priorityHighOption.textContent = "High";
      prioritySelect.appendChild(priorityLowOption);
      prioritySelect.appendChild(priorityMediumOption);
      prioritySelect.appendChild(priorityHighOption);

      // Set the default selected option based on dataset.priority
      switch (todoItem.dataset.priority.toLowerCase()) {
        case "low":
          priorityLowOption.setAttribute("selected", "selected");
          break;
        case "medium":
          priorityMediumOption.setAttribute("selected", "selected");
          break;
        case "high":
          priorityHighOption.setAttribute("selected", "selected");
          break;
      }

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
      closeButton.setAttribute("type", "button");
      // Remove todo container from DOM
      closeButton.addEventListener("click", (e) => {
        removeExistingTodoContainer();
      });

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

      todoForm.addEventListener("submit", (e) => {
        e.preventDefault();
        submitForm(todoForm, todoItem); // Update the todo with new values
        removeExistingTodoContainer(); // Remove todo container from DOM
      });

      todoContainer.appendChild(todoForm);

      // Insert the form container after the clicked todo item
      todoItem.after(todoContainer);
    });
  });
};

// Function to remove todo container from DOM
const removeExistingTodoContainer = () => {
  const existingTodoContainer = document.querySelector(".todo-container");
  if (existingTodoContainer) existingTodoContainer.remove();
};

const submitForm = (todoForm, todoItem) => {
  const formData = new FormData(todoForm);
  const title = formData.get("title");
  const date = formData.get("date");
  const priority = formData.get("priority");

  const todoId = todoItem.dataset.id;
  const projectState = getProjectState();

  const todoToUpdate = Object.values(projectState)
    .flat(Infinity)
    .find((todo) => todo.id === todoId);

  if (todoToUpdate) {
    todoToUpdate.title = title || todoToUpdate.title;
    todoToUpdate.dueDate = date;
    todoToUpdate.priority = priority.toLowerCase();
  }

  setProjectState(projectState);

  const activeProject = JSON.parse(localStorage.getItem("activeProject"));
  updateTodo(projectState[activeProject["active"]]);
};
