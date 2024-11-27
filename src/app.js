const readlineSync = require('readline-sync');
const TaskManager = require('./taskManager');

class TodoApp {
    constructor() {
        this.taskManager = new TaskManager('tasks.json');
    }

    displayMenu() {
        console.log('\n=== TODO APP ===');
        console.log('1. Add Task');
        console.log('2. List Tasks');
        console.log('3. Mark Task as Completed');
        console.log('4. Delete Task');
        console.log('5. Exit');
    }

    run() {
        while (true) {
            this.displayMenu();
            const choice = readlineSync.question('Enter your choice (1-5): ');

            switch (choice) {
                case '1':
                    const description = readlineSync.question('Enter task description: ');
                    this.taskManager.addTask(description);
                    console.log('Task added successfully!');
                    break;

                case '2':
                    const tasks = this.taskManager.listTasks();
                    console.log('\nTASK LIST:');
                    tasks.forEach(task => {
                        console.log(`${task.number}. [${task.status}] ${task.description}`);
                    });
                    break;

                case '3':
                    const taskNumber = readlineSync.question('Enter task number to mark as completed: ');
                    if (this.taskManager.markAsCompleted(parseInt(taskNumber))) {
                        console.log('Task marked as completed!');
                    } else {
                        console.log('Invalid task number!');
                    }
                    break;

                case '4':
                    const deleteNumber = readlineSync.question('Enter task number to delete: ');
                    if (this.taskManager.deleteTask(parseInt(deleteNumber))) {
                        console.log('Task deleted successfully!');
                    } else {
                        console.log('Invalid task number!');
                    }
                    break;

                case '5':
                    console.log('Goodbye!');
                    return;

                default:
                    console.log('Invalid choice! Please try again.');
            }
        }
    }
}

module.exports = TodoApp;
