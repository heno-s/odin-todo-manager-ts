import Project from "./modules/Project.js";
import ProjectList from "./modules/ProjectList.js";
import Task from "./modules/Task.js";
import UI from "./modules/UI.js";

const projectList = new ProjectList();

const addProjectButton = document.querySelector(
    ".add-project"
) as HTMLButtonElement;

const tasksDiv = document.querySelector(".tasks") as HTMLDivElement;

const addTaskButton = document.querySelector(
    ".add-task"
) as HTMLDivElement;

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

tasksDiv.addEventListener("click", (evt) => {
    const t = evt.target as HTMLElement;
    const isTaskCheckbox = t.classList.contains("priority-checkbox");
    if (isTaskCheckbox) {
        const taskId = t.closest(".task")?.id as string;
        const activeProject = ProjectList.activeProject;
        const task = activeProject.getTask(taskId) as Task;

        task.isChecked = !task.isChecked;
    }
});

tasksDiv.addEventListener("click", (evt) => {
    const t = evt.target as HTMLElement;
    const taskBody = t.closest(".task-body");

    if (taskBody !== null) {
        const taskDOM = t.closest(".task") as HTMLDivElement;
        const taskId = taskDOM.id;
        const task = ProjectList.activeProject.getTask(
            taskId
        ) as Task;
        const dialog = UI.createUpdateTaskDialogForm(task);
        const appContainer = document.querySelector(
            ".container"
        ) as HTMLDivElement;
        appContainer.appendChild(dialog);
        dialog.showModal();
    }
});

addTaskButton.addEventListener("click", (evt) => {
    addTaskButton.classList.add("hide");

    const tasks = document.querySelector(".tasks") as HTMLDivElement;

    const form = UI.createAddTaskForm();

    form.addEventListener("submit", handleSubmit);

    function handleSubmit(evt: SubmitEvent) {
        evt.preventDefault();

        //logic
        const t = evt.target as HTMLFormElement;
        const titleInput = t.querySelector(
            'input[name="title"]'
        ) as HTMLInputElement;
        const title = titleInput.value;
        const description = t["description"].value;
        const priority = t["priority"].value;
        const dueDate = t["due-date"].value;

        const task = new Task(title, dueDate, priority, description);
        const activeProject = ProjectList.activeProject;

        activeProject.addTask(task);

        //render
        UI.deleteTasks();
        UI.renderTasks(activeProject);

        addTaskButton.classList.remove("hide");
        UI.deleteAddTaskForm();
        form.removeEventListener("submit", handleSubmit);
    }

    tasks.appendChild(form);
});
