import type { TTask } from "./task.js";

export class TaskRepository {
    private static instance: TaskRepository;

    private tasks: TTask[] = [];
    private taskIdCounter: number = 1;

    //Construtor PRIVADO (nínguem pode fazer "new TaskRepository()")
    private constructor() { }

    // Único jeito de criar uma instância
    static getInstance(): TaskRepository {
        if (!TaskRepository.instance) {
            TaskRepository.instance = new TaskRepository();
        }
        return TaskRepository.instance;
    }

    addTask(task: Omit<TTask, 'id' | 'createdAt'>): TTask {
        const newTask: TTask = {
            ...task,
            id: `task-${this.taskIdCounter++}`,
            createdAt: new Date()
        };
        this.tasks.push(newTask);
        return newTask;
    }

    findById(id: string): TTask | undefined {
        return this.tasks.find(task => task.id === id);
    }

    updateTask(id: string, updates: Partial<TTask>): TTask | undefined {
        const task = this.findById(id);
        if (!task) return undefined;
        Object.assign(task, updates);
        return task;
    }

    deleteTask(id: string): boolean {
        const index = this.tasks.findIndex(task => task.id === id);
        if (index === -1) return false;
        this.tasks.splice(index, 1);
        return true;
    }


    getAllTasks(): TTask[] {
        return [...this.tasks];
    }

    getStats() {
        return {
            total: this.tasks.length,
            completed: this.tasks.filter(task => task.status === 'completed').length,
            pending: this.tasks.filter(task => task.status === 'pending').length,
            inProgress: this.tasks.filter(task => task.status === 'in_progress').length,
        }
    }
}