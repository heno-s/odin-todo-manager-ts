import Project from "./modules/Project.js";
import Task from "./modules/Task.js";
import UI from "./modules/UI.js";

const projects = document.querySelector(
    ".projects"
) as HTMLUListElement;

const tasks = document.querySelector(".tasks") as HTMLDivElement;

const main = document.querySelector("main") as HTMLElement;
const container = document.querySelector(
    ".container"
) as HTMLDivElement;

const projectHouse = new Project("house");
const projectWork = new Project("work");
const projectSchool = new Project("school");

const task1 = new Task(
    "take out trash",
    new Date(),
    1,
    "hi there, I am description"
);

const task2 = new Task(
    "clean dishes",
    new Date(),
    2,
    undefined,
    true
);

projects.appendChild(UI.createProject(projectHouse));
projects.appendChild(UI.createProject(projectWork));
projects.appendChild(UI.createProject(projectSchool));

tasks.appendChild(UI.createTask(task1));
tasks.appendChild(UI.createTask(task2));
main.appendChild(UI.createAddTaskForm());

const dialog = UI.createUpdateTaskDialogForm(task1);
container.appendChild(dialog);
dialog.showModal();

UI.setActiveProject(projectWork.id);
