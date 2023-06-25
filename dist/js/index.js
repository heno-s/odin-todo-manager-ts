import Project from "./modules/Project.js";
import UI from "./modules/UI.js";
const projects = document.querySelector(".projects");
const project = UI.createProject(new Project("home"));
projects.appendChild(project);
console.log(projects);
