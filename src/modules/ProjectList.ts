import Project from "./Project.js";
export default class ProjectList {
    static activeProject: Project;
    projects: Project[] = [];
    addProject(project: Project): void {
        this.projects.push(project);
    }
    getProject(id: string): Project | null {
        return (
            this.projects.find((project) => project.id === id) || null
        );
    }
    deleteProject(id: string): boolean {
        const projectIndex = this.projects.findIndex(
            (project) => project.id === id
        );
        if (projectIndex !== -1) {
            this.projects.splice(projectIndex, 1);
            return true;
        } else {
            return false;
        }
    }
}
