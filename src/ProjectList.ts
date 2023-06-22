import Project from "./Project";
export default class Projects {
    static activeProject: Project;
    getProject(id: string): Project {
        return new Project();
    }
    deleteProject(id: string): void {}
}
