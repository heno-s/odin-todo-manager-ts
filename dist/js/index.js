import Project from "./modules/Project.js";
import ProjectList from "./modules/ProjectList.js";
import Task from "./modules/Task.js";
import UI from "./modules/UI.js";
const projectList = new ProjectList();
const addProjectButton = document.querySelector(".add-project");
const tasksDiv = document.querySelector(".tasks");
const addTaskButton = document.querySelector(".add-task");
addProjectButton.addEventListener("click", (evt) => {
    addProjectButton.classList.add("hide");
    const sidebarBody = document.querySelector(".sidebar-body");
    const form = UI.createAddProjectForm();
    form.addEventListener("submit", handleSubmit);
    function handleSubmit(evt) {
        evt.preventDefault();
        const t = evt.target;
        const projectName = t.projectName.value;
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
tasksDiv.addEventListener("click", (evt) => {
    var _a;
    const t = evt.target;
    const isTaskCheckbox = t.classList.contains("priority-checkbox");
    if (!isTaskCheckbox) {
        return;
    }
    const taskId = (_a = t.closest(".task")) === null || _a === void 0 ? void 0 : _a.id;
    const activeProject = ProjectList.activeProject;
    const task = activeProject.getTask(taskId);
    task.isChecked = !task.isChecked;
});
tasksDiv.addEventListener("click", (evt) => {
    const t = evt.target;
    const taskBody = t.closest(".task-body");
    if (taskBody === null) {
        return;
    }
    const taskDOM = t.closest(".task");
    const taskId = taskDOM.id;
    const task = ProjectList.activeProject.getTask(taskId);
    const dialog = UI.createUpdateTaskDialogForm(task);
    const appContainer = document.querySelector(".container");
    appContainer.appendChild(dialog);
    dialog.showModal();
    const updateForm = dialog.querySelector("form");
    updateForm.addEventListener("submit", handleSubmit);
    function handleSubmit() {
        const id = updateForm.taskId.value;
        const title = updateForm.taskTitle.value;
        const description = updateForm.description.value;
        const priority = updateForm.priority.value;
        const dueDate = updateForm["due-date"].value;
        const task = ProjectList.activeProject.getTask(id);
        task.title = title;
        task.description = description;
        task.priority = +priority;
        task.dueDate = new Date(dueDate);
        UI.deleteTasks();
        UI.renderTasks(ProjectList.activeProject);
        updateForm.removeEventListener("submit", handleSubmit);
    }
    dialog.addEventListener("close", (evt) => {
        UI.deleteUpdateTaskDialog();
        console.log("CLOSING");
    });
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
        const task = new Task(title, new Date(dueDate), +priority, description);
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
