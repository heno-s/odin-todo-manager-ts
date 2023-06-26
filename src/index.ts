import Project from "./modules/Project.js";
import UI from "./modules/UI.js";

const projects = document.querySelector(
    ".projects"
) as HTMLUListElement;
const projectHouse = UI.createProject(new Project("house"));
const projectWork = UI.createProject(new Project("work"));
const projectSchool = UI.createProject(new Project("school"));

projects.appendChild(projectHouse);
projects.appendChild(projectWork);
projects.appendChild(projectSchool);

UI.setActiveProject(projectWork.id);
