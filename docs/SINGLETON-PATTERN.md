# Singleton Pattern - TaskRepository

> **Branch:** `feat-refactor-solid-v1`
>
> **Commit:** `0c961ab` - "feat: adicionado o pattern Singleton"

---

## O que é o Singleton Pattern?

O **Singleton Pattern** é um padrão de design criacional que garante que uma classe tenha **apenas uma instância** e fornece um **ponto de acesso global** a essa instância.

### Estrutura do Singleton

```typescript
class Singleton {
    private static instance: Singleton;    // Armazena a única instância

    private constructor() { }              // Construtor privado

    static getInstance(): Singleton {      // Método estático para obter instância
        if (!Singleton.instance) {
            Singleton.instance = new Singleton();
        }
        return Singleton.instance;
    }
}
```

---

## Implementação no TaskMaster

### Arquivo: [src/TaskRepository.ts](../src/TaskRepository.ts)

```typescript
export class TaskRepository {
    private static instance: TaskRepository;

    private tasks: TTask[] = [];
    private taskIdCounter: number = 1;

    // ✅ Construtor PRIVADO (ninguém pode fazer "new TaskRepository()")
    private constructor() { }

    // ✅ Único jeito de obter a instância
    static getInstance(): TaskRepository {
        if (!TaskRepository.instance) {
            TaskRepository.instance = new TaskRepository();
        }
        return TaskRepository.instance;
    }

    // Métodos do repository...
    addTask(task: Omit<TTask, 'id' | 'createdAt'>): TTask { ... }
    findById(id: string): TTask | undefined { ... }
    updateTask(id: string, updates: Partial<TTask>): TTask | undefined { ... }
    deleteTask(id: string): boolean { ... }
    getAllTasks(): TTask[] { ... }
    getStats() { ... }
}
```

---

## Como Usar

### ✅ Correto
```typescript
import { TaskRepository } from "./TaskRepository.js";

const repo = TaskRepository.getInstance();
const repo2 = TaskRepository.getInstance();

console.log(repo === repo2); // true - mesma instância!
```

### ❌ Incorreto (erro de compilação)
```typescript
const repo = new TaskRepository(); // ❌ Erro: construtor é privado
```

---

## Problema Resolvido

### Antes (v1.0 - branch `main`)
```typescript
// ❌ Estado global exposto
let tasks: TTask[] = [];
let taskIdCounter: number = 1;

// Qualquer um pode modificar diretamente
tasks.push({ ... }); // Sem controle
tasks = []; // Pode limpar tudo acidentalmente
```

**Problemas:**
- Dados acessíveis globalmente
- Sem encapsulamento
- Sem controle de acesso
- Difícil de rastrear modificações

### Depois (v2.0 - branch `feat-refactor-solid-v1`)
```typescript
// ✅ Encapsulado dentro da classe
private tasks: TTask[] = [];
private taskIdCounter: number = 1;

// Acesso controlado apenas via métodos públicos
const repo = TaskRepository.getInstance();
repo.addTask(...);    // ✅ Controlado
repo.deleteTask(...); // ✅ Controlado
```

**Benefícios:**
- Dados privados e protegidos
- Acesso controlado via métodos
- Validações centralizadas
- Única instância garantida

---

## Vantagens do Singleton

### 1. Única Instância
```typescript
const repo1 = TaskRepository.getInstance();
const repo2 = TaskRepository.getInstance();

repo1.addTask({ title: "Task 1", ... });

console.log(repo2.getAllTasks()); // Retorna a task criada por repo1
// ✅ Ambos compartilham o mesmo estado
```

### 2. Acesso Global Controlado
```typescript
// Em qualquer parte do código
import { TaskRepository } from "./TaskRepository.js";

const repo = TaskRepository.getInstance();
// Sempre a mesma instância, sem passar por parâmetros
```

### 3. Encapsulamento
```typescript
// ❌ Antes: acesso direto
tasks.push(invalidTask); // Sem validação

// ✅ Agora: acesso controlado
repo.addTask(task); // Valida e controla
```

### 4. Inicialização Lazy (Preguiçosa)
```typescript
static getInstance(): TaskRepository {
    if (!TaskRepository.instance) {
        // Só cria quando realmente necessário
        TaskRepository.instance = new TaskRepository();
    }
    return TaskRepository.instance;
}
```

---

## Desvantagens e Limitações

### 1. Estado Global (ainda presente)
Embora encapsulado, ainda é um estado global compartilhado:

```typescript
// Todos os módulos compartilham o mesmo estado
import { TaskRepository } from "./TaskRepository.js";

const repo = TaskRepository.getInstance();
// Se um módulo adiciona tasks, afeta todos os outros
```

**Problema:** Dificulta testes isolados

### 2. Difícil de Testar
```typescript
// ❌ Teste 1
test('adicionar tarefa', () => {
    const repo = TaskRepository.getInstance();
    repo.addTask({ title: "Test", ... });
    expect(repo.getAllTasks().length).toBe(1); // ✅ Passa
});

// ❌ Teste 2 - PODE FALHAR!
test('listar tarefas vazias', () => {
    const repo = TaskRepository.getInstance();
    expect(repo.getAllTasks().length).toBe(0); // ❌ Falha! É 1 do teste anterior
});
```

**Solução:** Adicionar método `reset()` para testes

### 3. Viola Single Responsibility Principle (parcialmente)
A classe tem duas responsabilidades:
1. Gerenciar sua própria instância (Singleton)
2. Gerenciar as tarefas (Repository)

---

## Melhorias Implementadas

| Aspecto | Antes (v1.0) | Depois (v2.0) |
|---------|--------------|---------------|
| **Estado** | Global exposto | Privado encapsulado |
| **Acesso** | Direto ao array | Via métodos controlados |
| **Instâncias** | Ilimitadas (variáveis globais) | Única instância garantida |
| **Validação** | Nenhuma | Pode adicionar nos métodos |
| **Rastreamento** | Impossível | Centralizado no repository |

---

## Melhorias Futuras

### 1. Adicionar método reset para testes
```typescript
// Para facilitar testes isolados
reset(): void {
    this.tasks = [];
    this.taskIdCounter = 1;
}
```

### 2. Injeção de Dependência (substituir Singleton)
O Singleton ainda é um anti-pattern em alguns casos. Melhor abordagem:

```typescript
// Interface
interface ITaskRepository {
    addTask(task: ...): TTask;
    findById(id: string): TTask | undefined;
    // ...
}

// Implementação
class InMemoryTaskRepository implements ITaskRepository {
    private tasks: TTask[] = [];
    // ...
}

// Uso com DI (próxima versão)
class TaskService {
    constructor(private repository: ITaskRepository) {}
}

// Permite trocar implementação facilmente
const repo = new InMemoryTaskRepository();
const service = new TaskService(repo);
```

---

## Quando Usar Singleton?

### ✅ Bom para:
- Configurações globais
- Cache compartilhado
- Pool de conexões
- Logger central
- Gerenciador de recursos únicos

### ❌ Evitar para:
- Lógica de negócio complexa
- Quando precisar de múltiplas instâncias no futuro
- Código que precisa ser altamente testável
- Quando DI (Dependency Injection) é possível

---

## Próximos Passos

Na próxima refatoração (v3.0), vamos:

1. **Substituir Singleton por DI**
   ```typescript
   class TaskService {
       constructor(private repository: ITaskRepository) {}
   }
   ```

2. **Criar interface ITaskRepository**
   ```typescript
   interface ITaskRepository {
       add(task: Task): Task;
       findById(id: string): Task | undefined;
       // ...
   }
   ```

3. **Múltiplas implementações**
   ```typescript
   class InMemoryTaskRepository implements ITaskRepository { ... }
   class FileTaskRepository implements ITaskRepository { ... }
   class DatabaseTaskRepository implements ITaskRepository { ... }
   ```

Isso permitirá:
- Testes isolados (mock repository)
- Trocar implementação facilmente
- Múltiplas instâncias quando necessário
- Melhor aderência ao SOLID

---

## Referências

- **Design Patterns:** Elements of Reusable Object-Oriented Software (Gang of Four)
- **Refactoring Guru:** [Singleton Pattern](https://refactoring.guru/design-patterns/singleton)
- **TypeScript Deep Dive:** Singleton Pattern

---

**Commit relacionado:** `0c961ab - feat: adicionado o pattern Singleton`
