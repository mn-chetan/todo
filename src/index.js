import "./styles.css";
import { switchProject, addProject, loadProjects } from "./scripts/sidebar";
import { addTodo } from "./scripts/todo";

loadProjects();
switchProject();
addProject();
addTodo(); 
