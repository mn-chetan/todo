import { projects } from "./state";
import { updateTodo } from "./todo";

export const switchProject = () => {
  const projectItems = document.querySelectorAll(".project-item");
  const mainTitle = document.querySelector(".main h1");

  projectItems.forEach((item) => {
    item.addEventListener("click", () => {
      // Remove active class from all items
      projectItems.forEach((i) => i.classList.remove("active"));
      // Add active class to clicked item
      item.classList.add("active");
      // Update main title to reflect selected project
      const projectName = item.textContent;
      mainTitle.textContent = `${projectName} Todos`;
      // Pass the todos for this project to the todo list
      const projectTodos = projects[projectName];
      updateTodo(projectTodos); // Call a function in todo.js
    });
  });
};
