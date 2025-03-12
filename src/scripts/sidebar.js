import { getProjectState, setProjectState } from "./projectState";
import { updateTodo, expandTodo } from "./todo";

export const switchProject = () => {
  const projectItems = document.querySelectorAll(".project-item");
  const mainTitle = document.querySelector(".main h1");

  projectItems.forEach((item) => {
    item.addEventListener("click", () => {
      // Retrieves the active project from localStorage and updates it with the clicked project's name.
      const activeProject = localStorage.getItem("activeProject")
        ? JSON.parse(localStorage.getItem("activeProject"))
        : {};
      activeProject["active"] = item.firstChild.textContent;
      localStorage.setItem("activeProject", JSON.stringify(activeProject));
      // Remove active class from all items
      projectItems.forEach((i) => i.classList.remove("active"));
      // Add active class to clicked item
      item.classList.add("active");
      // Update main title to reflect selected project
      const projectName = item.firstChild.textContent;
      mainTitle.textContent = `${projectName} Todos`;
      // Pass the todos for this project to the todo list
      const projectTodos = getProjectState()[projectName];
      updateTodo(projectTodos); // Call a function in todo.js
      // Enable option to expand each todo on click
      expandTodo();
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
    // Remove Modal on clicking 'X'
    closeButton.addEventListener("click", () => {
      removeModal(modal);
    });

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
    // Remove modal on clicking 'Cancel' Button
    cancelButton.addEventListener("click", () => {
      removeModal(modal);
    });

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

  const projectState = getProjectState();

  Object.keys(projectState).forEach((key) => {
    const li = document.createElement("li");
    li.classList.add("project-item");

    // Project Name
    const projectNameSpan = document.createElement("span");
    projectNameSpan.classList.add("project-title");
    projectNameSpan.textContent = key;

    // Delete Button
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-project-btn");
    deleteButton.textContent = "X";

    // Attach delete functionality
    deleteButton.addEventListener("click", (e) => {
      e.stopPropagation(); // Prevent project switching on delete click
      deleteProject(key);
    });

    li.appendChild(projectNameSpan);
    li.appendChild(deleteButton);

    // Check if the current project is the active project and update the UI accordingly
    const activeProject = localStorage.getItem("activeProject")
      ? JSON.parse(localStorage.getItem("activeProject"))
      : { active: "Personal" };
    if (
      li.querySelector(".project-title").textContent === activeProject["active"]
    ) {
      li.classList.add("active");
      updateTodo(
        getProjectState()[li.querySelector(".project-title").textContent]
      );
      expandTodo();
    }

    // Insert all projects before add project
    addProject.parentNode.insertBefore(li, addProject);
  });
};

// Adds a new project to the projects object and loads projects again
const submitProject = (value, modal) => {
  // Remove modal after add project button is clicked
  removeModal(modal);
  // Initialize new project with an empty array
  if (value.trim()) {
    const currentState = getProjectState();
    currentState[value] = [];
    setProjectState(currentState);
  }
  // Refresh the projects list
  loadProjects();
  // Switch projects
  switchProject();
};

// Remove modal from DOM
const removeModal = (modal) => {
  document.body.removeChild(modal);
};

const deleteProject = (projectName) => {
  const projectState = getProjectState();
  delete projectState[projectName]; // Remove project from state
  setProjectState(projectState); // Save new state to local storage
  loadProjects(); // Refresh project list
  updateTodo([]); // Clear todos when project is deleted
  const mainTitle = document.querySelector(".main h1");
  mainTitle.textContent = ""; // Remove title
  switchProject(); // Enable switch project
};
