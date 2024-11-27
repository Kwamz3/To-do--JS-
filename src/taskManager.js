const fs = require('fs');
const Task = require('./task');

class TaskManager {
    constructor(filename) {
        this.filename = filename;
        this.tasks = [];
        this.loadTasks();
    }

    addTask(description) {
        const task = new Task(description);
        this.tasks.push(task);
        this.saveTasks();
        return task;
    }

    listTasks() {
        return this.tasks.map((task, index) => ({
            number: index + 1,
            description: task.description,
            status: task.completed ? 'Completed' : 'Pending',
            createdAt: task.createdAt

               }));
    }

    markAsCompleted(taskNumber) {
        const index = taskNumber - 1;
        if (index >= 0 && index < this.tasks.length) {
            this.tasks[index].completed = true;
            this.saveTasks();
            return true;
        }
        return false;
    }

    deleteTask(taskNumber) {
        const index = taskNumber - 1;
        if (index >= 0 && index < this.tasks.length) {
            this.tasks.splice(index, 1);
            this.saveTasks();
            return true;
        }
        return false;
    }

    saveTasks() {
        fs.writeFileSync(this.filename, JSON.stringify(this.tasks, null, 2));
    }

    loadTasks() {
        try {
            const data = fs.readFileSync(this.filename, 'utf8');
            this.tasks = JSON.parse(data);
        } catch (error) {
            this.tasks = [];
        }
    }
}

module.exports = TaskManager;
