export default class ProjectList {
    constructor() {
        this.projects = [];
    }
    addProject(project) {
        this.projects.push(project);
    }
    getProject(id) {
        return (this.projects.find((project) => project.id === id) || null);
    }
    deleteProject(id) {
        const projectIndex = this.projects.findIndex((project) => project.id === id);
        if (projectIndex !== -1) {
            this.projects.splice(projectIndex, 1);
            return true;
        }
        else {
            return false;
        }
    }
}
