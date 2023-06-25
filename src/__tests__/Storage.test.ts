import Storage from "../modules/Storage";
import ProjectList from "../modules/ProjectList";
import Project from "../modules/Project";
import Task from "../modules/Task";

it("should retrieve ProjectList from localstorage", () => {
    const projectList = new ProjectList();
    Storage.saveProjectList(projectList);
    const retrievedProjectList = Storage.getProjectList();
    expect(retrievedProjectList).toBeInstanceOf(ProjectList);
});

it("should retrieve Project instances from projects array of ProjectList", () => {
    const projectList = new ProjectList();
    const project = new Project("test");
    projectList.addProject(project);
    Storage.saveProjectList(projectList);
    const retrievedProjectList = Storage.getProjectList();
    expect(retrievedProjectList.projects[0]).toBeInstanceOf(Project);
});

it("should retrieve Task instances from tasks array of Project", () => {
    const projectList = new ProjectList();
    const project = new Project("test");
    const task = new Task("trash", new Date(), 0);
    projectList.addProject(project);
    project.addTask(task);
    Storage.saveProjectList(projectList);
    const retrievedProjectList = Storage.getProjectList();
    expect(retrievedProjectList.projects[0].tasks[0]).toBeInstanceOf(
        Task
    );
});
