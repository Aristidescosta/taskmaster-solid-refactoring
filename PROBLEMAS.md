# TaskMaster - Análise de Problemas de Design

## O que foi implementado até agora

Foi criado um sistema básico de gerenciamento de tarefas (CRUD) com as seguintes funcionalidades:

### Funcionalidades Implementadas

1. **Criar tarefas** (`addTask`)
   - Adiciona uma tarefa com título, descrição e prioridade
   - Gera ID automático
   - Define status inicial como 'pending'

2. **Completar tarefas** (`completeTask`)
   - Marca uma tarefa como completada
   - Registra a data de conclusão

3. **Listar tarefas** (`listTasks`)
   - Exibe todas as tarefas
   - Suporta ordenação por data, prioridade ou status

4. **Mostrar estatísticas** (`showStats`)
   - Total de tarefas
   - Contagem por status
   - Taxa de conclusão

5. **Deletar tarefas** (`deleteTask`)
   - Remove uma tarefa pelo ID

6. **Atualizar prioridade** (`updateTaskPriority`)
   - Altera a prioridade de uma tarefa existente

### Estrutura de Dados

```typescript
type TTask = {
    id: string;
    title: string;
    description: string;
    status: 'pending' | 'in_progress' | 'completed';
    priority: 'low' | 'medium' | 'high';
    createdAt: Date;
    completedAt?: Date;
}
```

---

## Problemas Identificados

### 1. Funções Fazendo Mais de Uma Coisa

**Violação do Single Responsibility Principle (SRP)**

Cada função está fazendo múltiplas responsabilidades:

```typescript
// ❌ PROBLEMA: addTask faz 3 coisas diferentes
const addTask = (title: string, description: string, priority: 'low' | 'medium' | 'high') => {
    // 1. Cria a tarefa
    const task: TTask = { ... };

    // 2. Persiste no array
    tasks.push(task);

    // 3. Notifica
    console.log(`[NOTIFICATION] Nova tarefa criada: ${title}`);

    // 4. Faz logging
    console.log(`[LOG] Task ${task.id} adicionada ao sistema`);
}
```

**Impacto Real:**
- Se quiseres mudar como notificas (email, SMS, push), tens que modificar TODAS as funções
- Impossível reusar a lógica de criação de tarefa sem disparar notificações
- Testes têm que verificar criação + notificação + logging de uma vez

**Mesmo problema em:**
- `completeTask` (atualiza + notifica + loga)
- `deleteTask` (remove + notifica + loga)
- `updateTaskPriority` (atualiza + notifica + loga)

---

### 2. Estado Global (Dados Globais)

```typescript
// ❌ PROBLEMA: Estado global compartilhado
let tasks: TTask[] = [];
let taskIdCounter: number = 1;
```

**Impactos Reais:**

**Impossível ter múltiplas listas:**
```typescript
// ❌ Tenta fazer isto - IMPOSSÍVEL!
const tasksPessoais = gerenciarTasks();
const tasksTrabalho = gerenciarTasks();
// Ambos partilham o mesmo array global!
```

**Testes interferem uns com os outros:**
```typescript
// ❌ Teste 1
test('adicionar tarefa', () => {
    addTask('Teste 1', 'desc', 'low');
    expect(tasks.length).toBe(1); // Passa
});

// ❌ Teste 2 - FALHA!
test('adicionar outra tarefa', () => {
    addTask('Teste 2', 'desc', 'high');
    expect(tasks.length).toBe(1); // FALHA! É 2 porque o Teste 1 já adicionou
});
```

**Sem controlo de concorrência:**
- Se tiveres múltiplos utilizadores, todos mexem no mesmo array
- Não podes ter instâncias isoladas

---

### 3. Lógica + Apresentação Acopladas

**Problema: `listTasks` mistura ordenação (lógica) com formatação (apresentação)**

```typescript
// ❌ PROBLEMA: Tudo junto numa função
const listTasks = (sortBy: 'date' | 'priority' | 'status') => {
    // Lógica de ordenação
    let sorted = [...tasks];
    if (sortBy === 'date') {
        sorted = sorted.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    }

    // Apresentação no console
    console.log('\n=== LISTA DE TAREFAS ===');
    sorted.forEach(task => {
        console.log(`[${task.status.toUpperCase()}] ${task.title}`);
    });
}
```

**Impactos Reais:**

**Não consegues reusar a ordenação:**
```typescript
// ❌ Queres exportar para CSV ordenado por prioridade?
// Tens que DUPLICAR o código de ordenação!
const exportToCSV = () => {
    // Copia/cola a lógica de ordenação aqui :(
    const priorityOrder = { high: 3, medium: 2, low: 1 };
    const sorted = tasks.sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]);
    // ...
}
```

**Não consegues mudar o formato sem mudar a lógica:**
```typescript
// ❌ Queres retornar JSON em vez de imprimir?
// Tens que REESCREVER a função inteira!
const listTasksJSON = (sortBy: 'date' | 'priority' | 'status') => {
    // Duplica TUDO porque a ordenação está presa ao console.log
}
```

---

### 4. Console.log Hardcoded (Sem Abstração de Notificações)

**Problema: Notificações e logs estão espalhados e hardcoded**

```typescript
// ❌ Em addTask
console.log(`[NOTIFICATION] Nova tarefa criada: ${title}`);
console.log(`[LOG] Task ${task.id} adicionada ao sistema`);

// ❌ Em completeTask
console.log(`[NOTIFICATION] Tarefa completada: ${task.title}`);
console.log(`[LOG] Task ${task.id} marcada como completa`);

// ❌ Em deleteTask
console.log(`[NOTIFICATION] Tarefa deletada: ${deletedTask?.title}`);
console.log(`[LOG] Task ${deletedTask?.id} removida do sistema`);
```

**Impactos Reais:**

**Impossível adicionar novos canais de notificação:**
```typescript
// ❌ Queres enviar email quando criar tarefa?
// Tens que modificar addTask, completeTask, deleteTask, etc.
const addTask = (...) => {
    // ...
    console.log(`[NOTIFICATION]...`); // Linha antiga
    sendEmail(user.email, ...); // Nova linha - MODIFICOU A FUNÇÃO!
    sendSMS(user.phone, ...); // Outra linha - MODIFICOU NOVAMENTE!
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

---

### 5. Sem Interfaces/Abstrações

**Problema: Tudo é concreto, nada é abstraído**

```typescript
// ❌ Só existe uma forma de armazenar tasks (array global)
let tasks: TTask[] = [];

// ❌ Não podes trocar para:
// - Armazenar em ficheiro
// - Armazenar em base de dados
// - Armazenar em localStorage
// - Armazenar em memória cache
```

**Impactos Reais:**

**Impossível trocar implementação:**
```typescript
// ❌ Queres salvar em ficheiro? Tens que REESCREVER TUDO:
const addTask = (...) => {
    const task = { ... };
    // tasks.push(task); // Linha antiga
    fs.writeFileSync('tasks.json', JSON.stringify([...tasks, task])); // TEM QUE MODIFICAR!
}

// E fazer o mesmo em deleteTask, completeTask, updateTaskPriority...
```

**Não há contratos (interfaces):**
```typescript
// ❌ Não existe algo como:
interface ITaskRepository {
    add(task: TTask): void;
    findById(id: string): TTask | undefined;
    getAll(): TTask[];
    delete(id: string): void;
}

// Que permitiria múltiplas implementações:
class ArrayTaskRepository implements ITaskRepository { ... }
class FileTaskRepository implements ITaskRepository { ... }
class DatabaseTaskRepository implements ITaskRepository { ... }
```

---

### 6. Difícil de Testar

**Testes impossíveis/difíceis devido aos problemas anteriores:**

```typescript
// ❌ IMPOSSÍVEL testar isoladamente
function addTask(title: string, description: string, priority: "low" | "medium" | "high") {
    tasks.push(task) // 1. Modifica estado global
    console.log(`[NOTIFICATION]...`); // 2. Output para console
    console.log(`[LOG]...`); // 3. Mais output
    return task
}
```

**Por que é difícil?**

1. **Depende do array `tasks` global** - Não podes controlar o estado inicial
2. **Faz `console.log`** - Vai poluir os teus testes com prints
3. **Não consegues testar só a "criação"** sem testar "notificação" e "log"

**Exemplo de teste ruim:**
```typescript
// ❌ Teste frágil e acoplado
test('adicionar tarefa', () => {
    // Setup: Limpar estado global (código de teste poluído)
    tasks = [];
    taskIdCounter = 1;

    // Mockar console.log (mais poluição)
    const consoleSpy = jest.spyOn(console, 'log');

    addTask('Test', 'desc', 'low');

    // Assertions acopladas
    expect(tasks.length).toBe(1); // Depende do global
    expect(consoleSpy).toHaveBeenCalledTimes(2); // Depende do console.log
    expect(tasks[0].title).toBe('Test');

    // Cleanup
    consoleSpy.mockRestore();
});
```

---

### 7. Bug Identificado

**Em `updateTaskPriority` (linha 92):**

```typescript
const index = tasks.findIndex(task => task.id === id);
if (!index) { // ❌ BUG: index 0 é falsy!
    console.log(`[ERROR] Tarefa com ID ${id} não encontrada.`);
    return;
}
```

**Problema:**
- `findIndex` retorna `0` se encontrar no primeiro elemento
- `!0` é `true`, então vai dizer que não encontrou
- Deveria ser `if (index === -1)`

---

## Resumo dos Problemas Reais

| # | Problema | Impacto Real |
|---|----------|--------------|
| 1 | **Funções fazem demais** | Mudar notificações = mexer em 5 lugares diferentes |
| 2 | **Dados Globais** | Impossível ter múltiplas listas, testes interferem uns com outros |
| 3 | **Lógica + Apresentação juntas** | Não consegues reusar ordenação, mudar formato output é difícil |
| 4 | **Console.log hardcoded** | Notificações presas, impossível adicionar email/SMS facilmente |
| 5 | **Sem interfaces/abstrações** | Tudo está concreto, difícil trocar implementações (file, DB, cache) |
| 6 | **Difícil de testar** | Testes acoplados, frágeis, com muito setup/cleanup/mocking |
| 7 | **Bug na validação** | `updateTaskPriority` falha ao atualizar a primeira tarefa (index 0) |

---

## Próximos Passos

Para refatorar este código aplicando princípios SOLID e Design Patterns, precisaremos de:

1. **Separar responsabilidades** (Single Responsibility Principle)
2. **Injetar dependências** (Dependency Inversion Principle)
3. **Criar abstrações** (interfaces/abstracts)
4. **Aplicar patterns:**
   - Repository Pattern (para acesso aos dados)
   - Observer Pattern (para notificações)
   - Strategy Pattern (para ordenação)
   - Factory Pattern (para criação de tasks)

Isso permitirá código:
- Testável
- Extensível
- Manutenível
- Reutilizável
- Desacoplado
