# TaskMaster - Análise de Problemas e Evoluções

> **Organização por Branch:**
> - `main` - Versão 1.0 (código procedural com problemas)
> - `feat-refactor-solid-v1` - Versão 2.0 (Singleton Pattern aplicado) **← VOCÊ ESTÁ AQUI**

---

## O que foi implementado até agora

### Versão 1.0 (branch `main`)
Implementação básica procedural com CRUD de tarefas:
- Criar, completar, listar, deletar e atualizar tarefas
- Sistema de estatísticas
- Ordenação por data, prioridade ou status

**Problemas:** Estado global, funções fazendo múltiplas coisas, sem abstrações

### Versão 2.0 (branch `feat-refactor-solid-v1`) ✅
Refatoração com Singleton Pattern:
- ✅ TaskRepository com Singleton Pattern
- ✅ Encapsulamento de dados (array privado)
- ✅ Acesso controlado via métodos
- ✅ Separação em módulos (task.ts, TaskRepository.ts, index.ts)

---

## Status dos Problemas

### ✅ Problemas RESOLVIDOS (v1.0 → v2.0)

#### 1. Estado Global Exposto ✅ RESOLVIDO
**Antes (v1.0):**
```typescript
// ❌ Dados acessíveis globalmente
let tasks: TTask[] = [];
let taskIdCounter: number = 1;

// Qualquer um pode modificar
tasks.push({ ... });
tasks = [];
```

**Depois (v2.0):**
```typescript
// ✅ Encapsulado no repository
export class TaskRepository {
    private tasks: TTask[] = [];        // Privado!
    private taskIdCounter: number = 1;  // Privado!

    static getInstance(): TaskRepository { ... }
}
```

**Melhorias:**
- Dados protegidos (private)
- Acesso apenas via métodos públicos
- Única instância garantida (Singleton)

---

#### 2. Sem Abstrações ✅ PARCIALMENTE RESOLVIDO
**Antes (v1.0):**
```typescript
// ❌ Funções soltas manipulando array global
const addTask = (...) => {
    tasks.push(task);
}
```

**Depois (v2.0):**
```typescript
// ✅ Repository Pattern aplicado
class TaskRepository {
    addTask(...) { ... }
    findById(...) { ... }
    deleteTask(...) { ... }
    updateTask(...) { ... }
}
```

**Melhorias:**
- Repository Pattern implementado
- Métodos organizados em classe
- Singleton Pattern aplicado

**Ainda falta:**
- Interface ITaskRepository
- Múltiplas implementações (File, Database)

---

### ⚠️ Problemas AINDA PRESENTES (v2.0)

#### 3. Funções Fazendo Mais de Uma Coisa ⚠️ AINDA PRESENTE
**Violação do Single Responsibility Principle (SRP)**

```typescript
// ❌ PROBLEMA: addTask faz 3 coisas diferentes
const addTask = (title: string, description: string, priority: ...) => {
    // 1. Cria a tarefa
    const task = repo.addTask({ title, description, status: 'pending', priority })

    // 2. Notifica
    console.log(`[NOTIFICATION] Nova tarefa criada: ${title}`);

    // 3. Faz logging
    console.log(`[LOG] Task ${task.id} adicionada ao sistema`);

    return task;
}
```

**Impacto Real:**
- Se quiseres mudar como notificas (email, SMS, push), tens que modificar TODAS as funções
- Impossível reusar a lógica de criação sem disparar notificações
- Testes têm que verificar criação + notificação + logging de uma vez

**Mesmo problema em:**
- `completeTask` (atualiza + notifica + loga)
- `deleteTask` (remove + notifica + loga)
- `updateTaskPriority` (atualiza + notifica + loga)

**Solução planejada (v3.0):**
```typescript
// Services separados
class TaskService {
    constructor(
        private repository: ITaskRepository,
        private notificationService: INotificationService,
        private loggingService: ILoggingService
    ) {}

    createTask(data: CreateTaskDTO): Task {
        const task = this.repository.add(data);
        this.notificationService.notify(`Task created: ${task.title}`);
        this.loggingService.log(`Task ${task.id} added`);
        return task;
    }
}
```

---

#### 4. Lógica + Apresentação Acopladas ⚠️ AINDA PRESENTE

**Problema: `listTasks` mistura ordenação (lógica) com formatação (apresentação)**

```typescript
// ❌ PROBLEMA: Tudo junto numa função
const listTasks = (sortBy: 'date' | 'priority' | 'status') => {
    let tasks = repo.getAllTasks();
    let sorted = [...tasks];

    // Lógica de ordenação
    if (sortBy === 'date') {
        sorted = sorted.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    } else if (sortBy === 'priority') {
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        sorted = sorted.sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]);
    }
    // ...

    // Apresentação no console
    console.log('\n=== LISTA DE TAREFAS ===');
    sorted.forEach(task => {
        console.log(`[${task.status.toUpperCase()}] ${task.title} (${task.priority})`);
        console.log(`  ID: ${task.id}`);
        // ...
    })
}
```

**Impactos Reais:**

**Não consegues reusar a ordenação:**
```typescript
// ❌ Queres exportar para CSV ordenado por prioridade?
// Tens que DUPLICAR o código de ordenação!
const exportToCSV = () => {
    const priorityOrder = { high: 3, medium: 2, low: 1 };
    const sorted = tasks.sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]);
    // ...
}
```

**Solução planejada (v3.0):**
```typescript
// Strategy Pattern para ordenação
interface ISortStrategy {
    sort(tasks: Task[]): Task[];
}

class SortByPriorityStrategy implements ISortStrategy {
    sort(tasks: Task[]): Task[] {
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        return [...tasks].sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]);
    }
}

// Formatters para apresentação
class ConsoleFormatter {
    format(tasks: Task[]): void { ... }
}

class JSONFormatter {
    format(tasks: Task[]): string { ... }
}

class CSVFormatter {
    format(tasks: Task[]): string { ... }
}
```

---

#### 5. Console.log Hardcoded ⚠️ AINDA PRESENTE

**Problema: Notificações e logs estão espalhados e hardcoded**

```typescript
// ❌ Em addTask
console.log(`[NOTIFICATION] Nova tarefa criada: ${title}`);
console.log(`[LOG] Task ${task.id} adicionada ao sistema`);

// ❌ Em completeTask
console.log(`[NOTIFICATION] Tarefa concluída: ${task.title}`);
console.log(`[LOG] Task ${task.id} marcada como concluída`);

// ❌ Em deleteTask
console.log(`[NOTIFICATION] Tarefa deletada com sucesso`);
console.log(`[LOG] Task ${id} removida do sistema`);
```

**Impactos Reais:**

**Impossível adicionar novos canais de notificação:**
```typescript
// ❌ Queres enviar email quando criar tarefa?
// Tens que modificar addTask, completeTask, deleteTask, etc.
const addTask = (...) => {
    const task = repo.addTask(...);
    console.log(`[NOTIFICATION]...`);    // Linha antiga
    sendEmail(user.email, ...);          // Nova linha - MODIFICOU A FUNÇÃO!
    sendSMS(user.phone, ...);            // Outra linha - MODIFICOU NOVAMENTE!
}
```

**Testes poluídos:**
```typescript
// ❌ Testes vão imprimir um monte de lixo:
test('adicionar tarefa', () => {
    addTask('Test', 'desc', 'low');
    // Console output:
    // [NOTIFICATION] Nova tarefa criada: Test
    // [LOG] Task task-1 adicionada ao sistema
});
```

**Solução planejada (v3.0) - Observer Pattern:**
```typescript
// Interface
interface ITaskObserver {
    onTaskCreated(task: Task): void;
    onTaskCompleted(task: Task): void;
    onTaskDeleted(taskId: string): void;
}

// Implementações
class ConsoleNotificationObserver implements ITaskObserver {
    onTaskCreated(task: Task): void {
        console.log(`[NOTIFICATION] Task created: ${task.title}`);
    }
}

class EmailNotificationObserver implements ITaskObserver {
    onTaskCreated(task: Task): void {
        sendEmail(`New task: ${task.title}`);
    }
}

class LoggingObserver implements ITaskObserver {
    onTaskCreated(task: Task): void {
        logger.info(`Task ${task.id} created`);
    }
}

// Uso
class TaskService {
    private observers: ITaskObserver[] = [];

    registerObserver(observer: ITaskObserver): void {
        this.observers.push(observer);
    }

    createTask(data: CreateTaskDTO): Task {
        const task = this.repository.add(data);

        // Notifica todos os observers
        this.observers.forEach(observer => observer.onTaskCreated(task));

        return task;
    }
}
```

---

#### 6. Difícil de Testar ⚠️ AINDA PRESENTE

**Testes impossíveis/difíceis devido aos problemas anteriores:**

```typescript
// ❌ IMPOSSÍVEL testar isoladamente
function addTask(title: string, description: string, priority: ...) {
    const task = repo.addTask(...)       // 1. Usa Singleton global
    console.log(`[NOTIFICATION]...`);    // 2. Output para console
    console.log(`[LOG]...`);             // 3. Mais output
    return task
}
```

**Por que é difícil?**

1. **Depende do Singleton global** - Testes compartilham estado
2. **Faz `console.log`** - Vai poluir os testes com prints
3. **Não consegues testar só a "criação"** sem testar "notificação" e "log"

**Exemplo de teste ruim:**
```typescript
// ❌ Teste frágil e acoplado
test('adicionar tarefa', () => {
    // Setup: Precisaria resetar o Singleton
    const repo = TaskRepository.getInstance();
    // Estado pode estar "sujo" de testes anteriores

    // Mockar console.log (poluição)
    const consoleSpy = jest.spyOn(console, 'log');

    addTask('Test', 'desc', 'low');

    // Assertions acopladas
    expect(repo.getAllTasks().length).toBe(1); // Depende do estado global
    expect(consoleSpy).toHaveBeenCalledTimes(2); // Depende do console.log

    // Cleanup
    consoleSpy.mockRestore();
});
```

**Solução planejada (v3.0) - Dependency Injection:**
```typescript
// Services com DI
class TaskService {
    constructor(
        private repository: ITaskRepository,
        private notifier: INotificationService,
        private logger: ILoggingService
    ) {}
}

// Teste isolado
test('criar tarefa', () => {
    // Mocks
    const mockRepo = new MockTaskRepository();
    const mockNotifier = new MockNotificationService();
    const mockLogger = new MockLoggingService();

    // Service com dependências mockadas
    const service = new TaskService(mockRepo, mockNotifier, mockLogger);

    service.createTask({ title: 'Test', ... });

    // Assertions isoladas
    expect(mockRepo.add).toHaveBeenCalledWith({ title: 'Test', ... });
    expect(mockNotifier.notify).toHaveBeenCalledWith('Task created: Test');
    expect(mockLogger.log).toHaveBeenCalled();
});
```

---

## Resumo da Evolução

### v1.0 (branch `main`) - Código Procedural

| Problema | Status |
|----------|--------|
| Estado global exposto | ❌ |
| Funções fazem demais | ❌ |
| Lógica + apresentação juntas | ❌ |
| Console.log hardcoded | ❌ |
| Sem abstrações | ❌ |
| Difícil de testar | ❌ |

### v2.0 (branch `feat-refactor-solid-v1`) - Singleton Pattern

| Problema | Status |
|----------|--------|
| Estado global exposto | ✅ Resolvido (encapsulado no repository) |
| Funções fazem demais | ⚠️ Ainda presente |
| Lógica + apresentação juntas | ⚠️ Ainda presente |
| Console.log hardcoded | ⚠️ Ainda presente |
| Sem abstrações | ⚠️ Parcialmente resolvido (Repository Pattern aplicado) |
| Difícil de testar | ⚠️ Ainda presente |

### v3.0 (planejado) - SOLID Completo

| Problema | Solução Planejada |
|----------|-------------------|
| Estado global exposto | ✅ Já resolvido |
| Funções fazem demais | ✅ Services separados (TaskService, NotificationService, LoggingService) |
| Lógica + apresentação juntas | ✅ Strategy Pattern + Formatters |
| Console.log hardcoded | ✅ Observer Pattern |
| Sem abstrações | ✅ Interfaces (ITaskRepository, ISortStrategy, ITaskObserver) |
| Difícil de testar | ✅ Dependency Injection |

---

## Próximos Passos (v3.0)

Na próxima refatoração vamos aplicar:

### 1. Dependency Injection
```typescript
class TaskService {
    constructor(
        private repository: ITaskRepository,
        private notifier: INotificationService,
        private logger: ILoggingService
    ) {}
}
```

### 2. Observer Pattern
```typescript
interface ITaskObserver {
    onTaskCreated(task: Task): void;
    onTaskCompleted(task: Task): void;
    onTaskDeleted(taskId: string): void;
}
```

### 3. Strategy Pattern
```typescript
interface ISortStrategy {
    sort(tasks: Task[]): Task[];
}

class SortByPriorityStrategy implements ISortStrategy { ... }
class SortByDateStrategy implements ISortStrategy { ... }
```

### 4. Factory Pattern
```typescript
class TaskFactory {
    static create(data: CreateTaskDTO): Task {
        // Validações e lógica de criação
        return new Task(...);
    }
}
```

Isso permitirá código:
- ✅ Testável (DI permite mocks)
- ✅ Extensível (interfaces permitem múltiplas implementações)
- ✅ Manutenível (responsabilidades separadas)
- ✅ Reutilizável (lógica desacoplada da apresentação)
- ✅ Desacoplado (Observer Pattern para notificações)

---

## Documentação Relacionada

- [SINGLETON-PATTERN.md](SINGLETON-PATTERN.md) - Detalhes do Singleton aplicado
- [ESTRUTURA.md](ESTRUTURA.md) - Estrutura de pastas recomendada para v3.0
- [ESTRUTURA-ATUAL.md](ESTRUTURA-ATUAL.md) - Estado atual do projeto
