import Project from "../modules/Project";
import Task from "../modules/Task";

it("should add task to task array of project", () => {
    const project = new Project("test");
    const task = new Task("take out trash", new Date(), 0);
    project.addTask(task);
    expect(project.tasks.length).toBe(1);
});

it("should get task from task array specified by id", () => {
    const project = new Project("test");
    const task = new Task("take out trash", new Date(), 0);
    project.addTask(task);
    const retrievedTask = project.getTask(task.id);
    expect(retrievedTask).toBe(task);
});

it("should get correct task from task array specified by id", () => {
    const project = new Project("test");
    const task = new Task("take out trash", new Date(), 0);
    const task2 = new Task("take out trash 2", new Date(), 1);
    project.addTask(task);
    project.addTask(task2);
    const retrievedTask = project.getTask(task2.id);
    expect(retrievedTask).not.toBe(task);
    expect(retrievedTask).toBe(task2);
});

it("should delete task from task array of project", () => {
    const project = new Project("test");
    const task = new Task("take out trash", new Date(), 0);
    project.addTask(task);
    project.deleteTask(task.id);
    expect(project.tasks.length).toBe(0);
});

it("should delete the correct task from task array of project", () => {
    const project = new Project("test");
    const task = new Task("take out trash", new Date(), 0);
    const task2 = new Task("take out trash 2", new Date(), 1);
    project.addTask(task);
    project.addTask(task2);
    project.deleteTask(task.id);
    expect(project.tasks[0].id).toBe(task2.id);
});
