class Task {
    constructor(description) {
        this.description = description;
        this.completed = false;
        this.createdAt = new Date();
    }
}

module.exports = Task;
