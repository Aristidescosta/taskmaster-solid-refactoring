type TTask = {
    id: string;
    title: string;
    description: string;
    status: 'pending' | 'in_progress' | 'completed';
    priority: 'low' | 'medium' | 'high';
    createdAt: Date;
    completedAt?: Date;
}

let tasks: TTask[] = [];
let taskIdCounter: number = 1;

const addTask = (title: string, description: string, priority: 'low' | 'medium' | 'high') => {
    const task: TTask = {
        id: `task-${taskIdCounter++}`,
        title,
        description,
        status: 'pending',
        priority,
        createdAt: new Date()
    };

    tasks.push(task);
    console.log(`[NOTIFICATION] Nova tarefa criada: ${title}`);
    console.log(`[LOG] Task ${task.id} adicionada ao sistema`);
}

const completeTask = (id: string) => {
    const task = tasks.find(t => t.id === id);
    if (!task) {
        console.log('Task não encontrada');
        return;
    }
    task.status = 'completed';
    task.completedAt = new Date();
    console.log(`[NOTIFICATION] Tarefa completada: ${task.title}`);
    console.log(`[LOG] Task ${task.id} marcada como completa`);
}

const listTasks = (sortBy: 'date' | 'priority' | 'status') => {
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
    const total = tasks.length;
    const completed = tasks.filter(task => task.status === 'completed').length;
    const pending = tasks.filter(task => task.status === 'pending').length;
    const inProgress = tasks.filter(task => task.status === 'in_progress').length;
    console.log('\n=== ESTATÍSTICAS ===');
    console.log(`Total: ${total}`);
    console.log(`Completadas: ${completed}`);
    console.log(`Pendentes: ${pending}`);
    console.log(`Em Progresso: ${inProgress}`);
    console.log(`Taxa de conclusão: ${total > 0 ? ((completed / total) * 100).toFixed(1) : 0}%`);
}

console.log('=== TASKMASTER v1.0 (Versão Ruim) ===\n');
addTask('Estudar Design Patterns', 'Aprender Singleton, Factory, etc', 'high');
addTask('Fazer compras', 'Comprar ingredientes para jantar', 'medium');
addTask('Treinar', 'Academia às 18h', 'low');

listTasks('priority');
completeTask('task-1');
showStats();