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

// Handles creation and submission of new projects via a modal
export const addProject = () => {
  const addProject = document.querySelector(".add-project");

  // Open a modal when the add project button is clicked
  addProject.addEventListener("click", () => {
    // Create modal structure
    const modal = document.createElement("div");
    modal.classList.add("modal");

    const modalContent = document.createElement("div");
    modalContent.classList.add("modal-content");

    // Close button for dismissing the modal
    const closeButton = document.createElement("span");
    closeButton.classList.add("close-btn");
    closeButton.innerHTML = "&times;";

    const h3 = document.createElement("h3");
    h3.textContent = "Add new project";

    const form = document.createElement("form");

    // Form group for project name input
    const formGroup = document.createElement("div");
    formGroup.classList.add("form-group");

    const projectName = document.createElement("label");
    projectName.classList.add("project-name");
    projectName.textContent = "Project Name";

    const input = document.createElement("input");
    input.type = "text";
    input.id = "project-name";
    input.placeholder = "Enter project name";

    formGroup.appendChild(projectName);
    formGroup.appendChild(input);

    // Buttons for form actions
    const btnContainer = document.createElement("div");
    btnContainer.classList.add("btn-container");

    const cancelButton = document.createElement("button");
    cancelButton.classList.add("btn", "btn-cancel");
    cancelButton.type = "button";
    cancelButton.textContent = "Cancel";

    const submitButton = document.createElement("button");
    submitButton.classList.add("btn", "btn-add");
    submitButton.type = "submit";
    submitButton.textContent = "Add Project";
    // Handle form submission to add the new project
    submitButton.addEventListener("click", (e) => {
      e.preventDefault();
      submitProject(input.value, modal);
    });

    btnContainer.appendChild(cancelButton);
    btnContainer.appendChild(submitButton);

    form.appendChild(formGroup);
    form.appendChild(btnContainer);

    modalContent.appendChild(closeButton);
    modalContent.appendChild(h3);
    modalContent.appendChild(form);

    modal.appendChild(modalContent);

    document.body.appendChild(modal);
  });
};

// Loads and displays all the projects in sidebar
export const loadProjects = () => {
  // Clear the projects from sidebar before inserting to avoid duplicates
  const projectList = document.querySelector(".project-list");
  const projectItems = document.querySelectorAll(".project-item");
  projectItems.forEach((item) => {
    projectList.removeChild(item);
  });

  const addProject = document.querySelector(".add-project");

  Object.keys(projects).forEach((key) => {
    const li = document.createElement("li");
    li.classList.add("project-item");
    li.textContent = key;
    // Insert all projects before add project
    addProject.parentNode.insertBefore(li, addProject);
  });
};

// Adds a new project to the projects object and loads projects again
const submitProject = (value, modal) => {
  // Remove modal after add project button is clicked
  document.body.removeChild(modal);
  // Initialize new project with an empty array
  projects[value] = [];
  // Refresh the projects list
  loadProjects();
};
