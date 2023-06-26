import Project from "./modules/Project.js";
import ProjectList from "./modules/ProjectList.js";
import Task from "./modules/Task.js";
import UI from "./modules/UI.js";
const projectList = new ProjectList();
const addProjectButton = document.querySelector(".add-project");
const addTaskButton = document.querySelector(".add-task");
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
addTaskButton.addEventListener("click", (evt) => {
    addTaskButton.classList.add("hide");
    const tasks = document.querySelector(".tasks");
    const form = UI.createAddTaskForm();
    form.addEventListener("submit", handleSubmit);
    function handleSubmit(evt) {
        evt.preventDefault();
        const t = evt.target;
        const titleInput = t.querySelector('input[name="title"]');
        const title = titleInput.value;
        const description = t["description"].value;
        const priority = t["priority"].value;
        const dueDate = t["due-date"].value;
        const task = new Task(title, dueDate, priority, description);
        const activeProject = ProjectList.activeProject;
        activeProject.addTask(task);
        UI.deleteTasks();
        UI.renderTasks(activeProject);
        addTaskButton.classList.remove("hide");
        UI.deleteAddTaskForm();
        form.removeEventListener("submit", handleSubmit);
    }
    tasks.appendChild(form);
});
