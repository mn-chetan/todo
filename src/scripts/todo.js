import { projects } from "./state";

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
