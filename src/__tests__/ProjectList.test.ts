import ProjectList from "../modules/ProjectList";
import Project from "../modules/Project";

it("should add Project to projects array", () => {
    const projectList = new ProjectList();
    const project = new Project("test");
    projectList.addProject(project);
    expect(projectList.projects.length).toBe(1);
});

it("should get project from project array specified by id", () => {
    const projectList = new ProjectList();
    const project = new Project("test");
    projectList.addProject(project);
    const retrievedProject = projectList.getProject(project.id);
    expect(retrievedProject).toBe(project);
});

it("should get correct project from project array specified by id", () => {
    const projectList = new ProjectList();
    const project = new Project("test");
    const project2 = new Project("test");
    projectList.addProject(project);
    projectList.addProject(project2);
    const retrievedProject = projectList.getProject(project2.id);
    expect(retrievedProject).not.toBe(project);
    expect(retrievedProject).toBe(project2);
});

it("should delete project from project array", () => {
    const projectList = new ProjectList();
    const project = new Project("test");
    projectList.addProject(project);
    projectList.deleteProject(project.id);
    expect(projectList.projects.length).toBe(0);
});

it("should delete the correct project from project array", () => {
    const projectList = new ProjectList();
    const project = new Project("test");
    const project2 = new Project("test");
    projectList.addProject(project);
    projectList.addProject(project2);
    projectList.deleteProject(project.id);
    expect(projectList.projects[0].id).toBe(project2.id);
});
