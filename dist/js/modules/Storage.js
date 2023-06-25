import ProjectList from "./ProjectList.js";
import Project from "./Project.js";
import Task from "./Task.js";
export default class Storage {
    static saveProjectList(projectList) {
        localStorage.setItem("projectList", JSON.stringify(projectList));
    }
    static getProjectList() {
        const projectListString = localStorage.getItem("projectList");
        if (projectListString === null) {
            return new ProjectList();
        }
        else {
            const projectList = Object.assign(new ProjectList(), JSON.parse(projectListString));
            projectList.projects = projectList.projects.map((project) => Object.assign(new Project(project.name), project));
            projectList.projects.forEach((project) => (project.tasks = project.tasks.map((task) => new Task(task.title, task.dueDate, task.priority, task.description, task.isChecked))));
            return projectList;
        }
    }
}
