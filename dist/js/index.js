import Project from "./modules/Project.js";
import ProjectList from "./modules/ProjectList.js";
import UI from "./modules/UI.js";
const projectList = new ProjectList();
const addProjectButton = document.querySelector(".add-project");
addProjectButton.addEventListener("click", (evt) => {
    addProjectButton.classList.add("hide");
    const sidebarBody = document.querySelector(".sidebar-body");
    const form = UI.createAddProjectForm();
    form.addEventListener("submit", handleSubmit);
    function handleSubmit(evt) {
        evt.preventDefault();
        const t = evt.target;
        const projectName = t["projectName"].value;
        const project = new Project(projectName);
        projectList.addProject(project);
        ProjectList.activeProject = project;
        UI.deleteProjects();
        UI.deleteTasks();
        UI.renderProjects(projectList.projects);
        UI.renderTasks(ProjectList.activeProject);
        addProjectButton.classList.remove("hide");
        UI.deleteAddProjectForm();
        form.removeEventListener("submit", handleSubmit);
    }
    sidebarBody.appendChild(form);
});
