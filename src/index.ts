import Project from "./modules/Project.js";
import ProjectList from "./modules/ProjectList.js";
import Task from "./modules/Task.js";
import UI from "./modules/UI.js";

const projectList = new ProjectList();

const addProjectButton = document.querySelector(
    ".add-project"
) as HTMLButtonElement;

addProjectButton.addEventListener("click", (evt) => {
    addProjectButton.classList.add("hide");

    const sidebarBody = document.querySelector(
        ".sidebar-body"
    ) as HTMLDivElement;

    const form = UI.createAddProjectForm();
    form.addEventListener("submit", handleSubmit);

    function handleSubmit(evt: SubmitEvent) {
        evt.preventDefault();

        // logic
        const t = evt.target as HTMLFormElement;
        const projectName = t["projectName"].value;
        const project = new Project(projectName);

        projectList.addProject(project);
        ProjectList.activeProject = project;

        // render
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
