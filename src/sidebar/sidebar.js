import "./sidebar.css";

export const addProject = () => {
  const addProject = document.querySelector(".add-project");
  addProject.addEventListener("click", () => {
    const projectBox = document.createElement("div");
    projectBox.classList.add("project-dialogue");

    const colorChoices = [
      "#4a90e2", // Bright Blue
      "#50c878", // Emerald Green
      "#ff6b6b", // Coral Red
      "#9370db", // Medium Purple
      "#ff9f43", // Mango Orange
      "#00bcd4", // Turquoise
      "#f06292", // Pink
      "#7d5fff", // Royal Purple
    ];

    const inputLine = document.createElement("div");
    inputLine.classList.add("input-line");

    const colorBox = document.createElement("div");
    colorBox.classList.add("color-box");
    colorBox.style.backgroundColor =
      colorChoices[Math.floor(Math.random() * 8)];

    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Project Name";
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        const div = document.createElement("div");
        div.classList.add("icon-label-wrapper");

        const currentColor = document.querySelector(
          ".project-dialogue .color-box"
        );

        const span = document.createElement("span");
        span.classList.add("label");
        span.textContent = input.value;

        div.appendChild(currentColor);
        div.appendChild(span);

        projectBox.remove();

        addProject.parentNode.insertBefore(div, addProject);
      }
    });

    inputLine.appendChild(colorBox);
    inputLine.appendChild(input);

    const colors = document.createElement("div");
    colors.classList.add("colors");
    colorChoices.forEach((color) => {
      const div = document.createElement("div");
      div.classList.add("color-box");
      div.style.backgroundColor = color;

      div.addEventListener("click", () => {
        colorBox.style.backgroundColor = color;
      });

      colors.appendChild(div);
    });

    projectBox.appendChild(inputLine);
    projectBox.appendChild(colors);

    const sidebar = document.querySelector(".sidebar");
    sidebar.appendChild(projectBox);
  });
};
