import Project from "./modules/Project.js";
import ProjectList from "./modules/ProjectList.js";
import Storage from "./modules/Storage.js";
import Task from "./modules/Task.js";
import UI from "./modules/UI.js";

const projectList = Storage.getProjectList();
ProjectList.activeProject = projectList.projects[0];

UI.renderProjects(projectList.projects);
UI.renderTasks(ProjectList.activeProject);

const projectsUl = document.querySelector(
    ".projects"
) as HTMLUListElement;

const addProjectButton = document.querySelector(
    ".add-project"
) as HTMLButtonElement;

const tasksDiv = document.querySelector(".tasks") as HTMLDivElement;

const addTaskButton = document.querySelector(
    ".add-task"
) as HTMLDivElement;

projectsUl.addEventListener("click", (evt) => {
    const t = evt.target as HTMLElement;
    const clickedDeleteIcon = t.closest(".project-delete") !== null;
    if (!clickedDeleteIcon) {
        return;
    }

    const projectDOM = t.closest(".project") as HTMLLIElement;
    const projectId = projectDOM.id;
    const project = projectList.getProject(projectId) as Project;

    projectList.deleteProject(project.id);
    Storage.saveProjectList(projectList);
    if (ProjectList.activeProject.id === project.id) {
        UI.deleteTasks();
        if (projectList.projects.length > 0) {
            ProjectList.activeProject = projectList.projects[0];
            UI.renderTasks(ProjectList.activeProject);
        }
    }
    UI.deleteProjects();
    UI.renderProjects(projectList.projects);
});

projectsUl.addEventListener("click", (evt) => {
    const t = evt.target as HTMLElement;
    const clickedDeleteIcon = t.closest(".project-delete") !== null;
    const clickedProject = t.closest(".project") !== null;
    if (clickedDeleteIcon || !clickedProject) {
        return;
    }
    const projectDOM = t.closest(".project") as HTMLLIElement;
    const projectId = projectDOM.id;
    const project = projectList.getProject(projectId) as Project;

    if (ProjectList.activeProject.id === project.id) {
        return;
    }
    ProjectList.activeProject = project;

    UI.setActiveProject(project.id);
    UI.deleteTasks();
    UI.renderTasks(project);
});

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
        const projectName = t.projectName.value as string;
        const project = new Project(projectName);

        projectList.addProject(project);
        ProjectList.activeProject = project;
        Storage.saveProjectList(projectList);

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
    form.projectName.focus();
});

tasksDiv.addEventListener("click", (evt) => {
    const t = evt.target as HTMLElement;
    const isTaskCheckbox = t.classList.contains("priority-checkbox");
    if (!isTaskCheckbox) {
        return;
    }
    const taskId = t.closest(".task")?.id as string;
    const activeProject = ProjectList.activeProject;
    const task = activeProject.getTask(taskId) as Task;

    task.isChecked = !task.isChecked;
    Storage.saveProjectList(projectList);
});

tasksDiv.addEventListener("click", (evt) => {
    const t = evt.target as HTMLElement;
    const taskBody = t.closest(".task-body");

    //logic
    if (taskBody === null) {
        return;
    }
    const taskDOM = t.closest(".task") as HTMLDivElement;
    const taskId = taskDOM.id;
    const task = ProjectList.activeProject.getTask(taskId) as Task;

    // render
    const appContainer = document.querySelector(
        ".container"
    ) as HTMLDivElement;
    const dialog = UI.createUpdateTaskDialogForm(task);
    appContainer.appendChild(dialog);
    dialog.showModal();

    const closeDialogButton = dialog.querySelector(
        ".close-dialog"
    ) as HTMLDivElement;
    const updateForm = dialog.querySelector(
        "form"
    ) as HTMLFormElement;

    closeDialogButton.addEventListener("click", (evt) => {
        dialog.close();
    });

    updateForm.addEventListener("submit", handleSubmit);

    function handleSubmit() {
        const id = updateForm.taskId.value as string;
        const title = updateForm.taskTitle.value as string;
        const description = updateForm.description.value as string;
        const priority = updateForm.priority.value as string;
        const dueDate = updateForm["due-date"].value as string;

        const task = ProjectList.activeProject.getTask(id) as Task;

        task.title = title;
        task.description = description;
        task.priority = +priority;
        task.dueDate = new Date(dueDate);

        Storage.saveProjectList(projectList);

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
        const title = titleInput.value as string;
        const description = t["description"].value as string;
        const priority = t["priority"].value as string;
        const dueDate = t["due-date"].value as string;

        const task = new Task(
            title,
            new Date(dueDate),
            +priority,
            description
        );
        const activeProject = ProjectList.activeProject;

        activeProject.addTask(task);
        Storage.saveProjectList(projectList);

        //render
        UI.deleteTasks();
        UI.renderTasks(activeProject);

        addTaskButton.classList.remove("hide");
        UI.deleteAddTaskForm();
        form.removeEventListener("submit", handleSubmit);
    }

    tasks.appendChild(form);
    (form.querySelector(".title") as HTMLInputElement).focus();
});
