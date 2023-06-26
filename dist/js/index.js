import Project from "./modules/Project.js";
import ProjectList from "./modules/ProjectList.js";
import Task from "./modules/Task.js";
import UI from "./modules/UI.js";
const projectsDOM = document.querySelector(".projects");
const tasksDOM = document.querySelector(".tasks");
const main = document.querySelector("main");
const container = document.querySelector(".container");
const projects = [
    new Project("house"),
    new Project("work"),
    new Project("school"),
];
const [projectHouse, projectWork, projectSchool] = projects;
ProjectList.activeProject = projectWork;
const task1 = new Task("take out trash", new Date(), 1, "hi there, I am description");
const task2 = new Task("clean dishes", new Date(), 2, undefined, true);
const task3 = new Task("report to boss", new Date(), 2, undefined, true);
projectHouse.addTask(task1);
projectHouse.addTask(task2);
projectWork.addTask(task3);
UI.renderProjects(projects);
UI.renderTasks(ProjectList.activeProject);
