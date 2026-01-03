import { TaskRepository } from "./TaskRepository.js";

const repo = TaskRepository.getInstance();

const addTask = (title: string, description: string, priority: 'low' | 'medium' | 'high') => {
    const task = repo.addTask({ title, description, status: 'pending', priority })

    console.log(`[NOTIFICATION] Nova tarefa criada: ${title}`);
    console.log(`[LOG] Task ${task.id} adicionada ao sistema`);
    return task;
}

const completeTask = (id: string) => {
    const task = repo.updateTask(id, {
        status: 'completed',
        completedAt: new Date()
    })

    if (!task) {
        console.log('[ERROR] Tarefa com ID ${id} não encontrada.');
        return;
    }
    console.log(`[NOTIFICATION] Tarefa concluída: ${task.title}`);
    console.log(`[LOG] Task ${task.id} marcada como concluída`);
}

const listTasks = (sortBy: 'date' | 'priority' | 'status') => {
    let tasks = repo.getAllTasks();

    let sorted = [...tasks];

    if (sortBy === 'date') {
        sorted = sorted.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    } else if (sortBy === 'priority') {
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        sorted = sorted.sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]);
    } else if (sortBy === 'status') {
        const statusOrder = { in_progress: 3, pending: 2, completed: 1 };
        sorted = sorted.sort((a, b) => statusOrder[b.status] - statusOrder[a.status]);
    }
    console.log('\n=== LISTA DE TAREFAS ===');
    sorted.forEach(task => {
        console.log(`[${task.status.toUpperCase()}] ${task.title} (${task.priority})`);
        console.log(`  ID: ${task.id}`);
        console.log(`  Criada: ${task.createdAt.toLocaleDateString()}`);
        if (task.completedAt) {
            console.log(`  Completada: ${task.completedAt.toLocaleDateString()}`);
        }
        console.log('---');
    })
}

const showStats = () => {
    const stats = repo.getStats();
    console.log('\n=== ESTATÍSTICAS ===');
    console.log(`Total: ${stats.total}`);
    console.log(`Completadas: ${stats.completed}`);
    console.log(`Pendentes: ${stats.pending}`);
    console.log(`Em Progresso: ${stats.inProgress}`);
    console.log(`Taxa de conclusão: ${stats.total > 0 ? ((stats.completed / stats.total) * 100).toFixed(1) : 0}%`);
}

const deleteTask = (id: string) => {
    const hasDeleted = repo.deleteTask(id);
    if (!hasDeleted) {
        console.log(`[ERROR] Tarefa com ID ${id} não encontrada, ou houve um erro interno.`);
        return;
    }
    console.log(`[NOTIFICATION] Tarefa deletada com sucesso`);
    console.log(`[LOG] Task ${id} removida do sistema`);
}

const updateTaskPriority = (id: string, newPriority: 'low' | 'medium' | 'high') => {
    const task = repo.updateTask(id, {
        priority: newPriority
    })
    if (!task) {
        console.log(`[ERROR] Tarefa com ID ${id} não encontrada.`);
        return;
    }
    console.log(`[NOTIFICATION] Prioridade da tarefa alterada para: ${newPriority}`);
    console.log(`[LOG] Task ${id} prioridade alterada para ${newPriority}`);
}

console.log('=== TASKMASTER v1.0 (Versão Refatorada) ===\n');
addTask('Estudar Design Patterns', 'Aprender Singleton, Factory, etc', 'high');
addTask('Fazer compras', 'Comprar ingredientes para jantar', 'medium');
addTask('Treinar', 'Academia às 18h', 'low');

//deleteTask('task-2')
updateTaskPriority('task-3', 'medium')
updateTaskPriority('task-1', 'low')
listTasks('priority');
completeTask('task-1');
showStats();