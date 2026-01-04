# Estrutura Atual do Projeto

> **Branch:** `feat-refactor-solid-v1`
>
> **Versão:** 2.0 (Singleton Pattern aplicado)
>
> **Último commit:** `0c961ab - feat: adicionado o pattern Singleton`

---

## Visão Geral da Organização

```
taskmaster/
├── docs/                           # 📚 Documentação
│   ├── PROBLEMAS.md               # Análise de problemas (v1.0 → v2.0)
│   ├── SINGLETON-PATTERN.md       # Detalhes do Singleton Pattern
│   ├── ESTRUTURA.md               # Guia de estrutura recomendada (v3.0)
│   └── ESTRUTURA-ATUAL.md         # Este arquivo (estado atual)
│
├── src/                            # 💻 Código fonte
│   ├── index.ts                   # Entry point da aplicação
│   ├── TaskRepository.ts          # Repository com Singleton Pattern
│   └── task.ts                    # Type definitions (TTask)
│
├── dist/                           # 🏗️  Build (gerado por tsc)
│   └── ... (arquivos .js compilados)
│
├── .gitignore                      # Exclusões do Git
├── package.json                    # Dependências e scripts
├── pnpm-lock.yaml                 # Lock file do pnpm
├── tsconfig.json                  # Configuração do TypeScript
└── README.md                      # Documentação principal
```

---

## Arquivos de Código

### 📄 [src/task.ts](../src/task.ts)
**Descrição:** Define o tipo TTask usado em toda aplicação

```typescript
export type TTask = {
    id: string;
    title: string;
    description: string;
    status: 'pending' | 'in_progress' | 'completed';
    priority: 'low' | 'medium' | 'high';
    createdAt: Date;
    completedAt?: Date;
}
```

**Responsabilidade:** Definição de tipos e contratos de dados

**Mudanças vs v1.0:**
- ✅ Separado em arquivo próprio (modularização)
- ✅ Export/Import com ESM modules

---

### 📄 [src/TaskRepository.ts](../src/TaskRepository.ts)
**Descrição:** Repository com Singleton Pattern para gerenciar tarefas

**Design Pattern:** ✅ Singleton Pattern

**Características:**
```typescript
export class TaskRepository {
    private static instance: TaskRepository;  // ✅ Instância única
    private tasks: TTask[] = [];             // ✅ Array privado (encapsulado)
    private taskIdCounter: number = 1;       // ✅ Contador privado

    private constructor() { }                 // ✅ Construtor privado
    static getInstance(): TaskRepository { } // ✅ Acesso controlado
}
```

**Métodos Públicos:**
```typescript
addTask(task: Omit<TTask, 'id' | 'createdAt'>): TTask
findById(id: string): TTask | undefined
updateTask(id: string, updates: Partial<TTask>): TTask | undefined
deleteTask(id: string): boolean
getAllTasks(): TTask[]
getStats(): { total, completed, pending, inProgress }
```

**Responsabilidades:**
- ✅ Armazenamento em memória (array privado e encapsulado)
- ✅ CRUD de tarefas com métodos controlados
- ✅ Geração automática de IDs únicos
- ✅ Cálculo de estatísticas

**Mudanças vs v1.0:**
- ✅ Encapsulamento (dados privados)
- ✅ Singleton Pattern aplicado
- ✅ Métodos organizados em classe
- ✅ Acesso controlado via métodos públicos

**Ainda falta:**
- ⚠️ Interface ITaskRepository
- ⚠️ Múltiplas implementações (File, Database)

---

### 📄 [src/index.ts](../src/index.ts)
**Descrição:** Entry point da aplicação, contém funções de alto nível

**Estrutura:**
```typescript
import { TaskRepository } from "./TaskRepository.js";

const repo = TaskRepository.getInstance();  // ✅ Usa Singleton

// Funções de alto nível:
const addTask = (...) => { ... }
const completeTask = (...) => { ... }
const listTasks = (...) => { ... }
const showStats = () => { ... }
const deleteTask = (...) => { ... }
const updateTaskPriority = (...) => { ... }

// Demonstração de uso
console.log('=== TASKMASTER v1.0 (Versão Refatorada) ===\n');
addTask('Estudar Design Patterns', 'Aprender Singleton, Factory, etc', 'high');
// ...
```

**Melhorias vs v1.0:**
- ✅ Usa TaskRepository em vez de array global
- ✅ Import/Export com ESM modules

**Problemas ainda presentes:**
- ⚠️ Funções fazem múltiplas coisas (CRUD + notificação + logging)
- ⚠️ Console.log hardcoded em cada função
- ⚠️ Lógica + apresentação acopladas (especialmente em `listTasks`)

**Exemplo de problema:**
```typescript
// ⚠️ Viola Single Responsibility Principle
const addTask = (title: string, description: string, priority: ...) => {
    const task = repo.addTask({ ... })          // 1. Cria tarefa
    console.log(`[NOTIFICATION] ...`);          // 2. Notifica
    console.log(`[LOG] ...`);                   // 3. Loga
    return task;
}
```

---

## Documentação

### 📚 [docs/PROBLEMAS.md](PROBLEMAS.md)
Análise completa da evolução v1.0 → v2.0:

**Conteúdo:**
- ✅ Problemas RESOLVIDOS (estado global, abstrações básicas)
- ⚠️ Problemas AINDA PRESENTES (SRP, console.log, lógica+apresentação)
- 📋 Soluções planejadas para v3.0

### 📚 [docs/SINGLETON-PATTERN.md](SINGLETON-PATTERN.md)
Guia completo sobre o Singleton Pattern aplicado:

**Conteúdo:**
- O que é Singleton Pattern
- Implementação no TaskRepository
- Como usar (correto vs incorreto)
- Vantagens e desvantagens
- Comparação antes/depois
- Melhorias futuras

### 📚 [docs/ESTRUTURA.md](ESTRUTURA.md)
Guia de estrutura recomendada para v3.0:

**Conteúdo:**
- Arquitetura em camadas (Domain, Repository, Services, etc)
- Design Patterns a aplicar (Observer, Strategy, Factory)
- Migração gradual
- Organização v1-bad vs v2-refactored vs v3.0

---

## Scripts NPM

```json
{
  "dev": "tsx watch src/index.ts",      // Desenvolvimento com hot reload
  "build": "tsc",                        // Compilar TypeScript → JavaScript
  "start": "node dist/index.js"         // Executar versão compilada
}
```

**Como usar:**
```bash
# Desenvolvimento (recompila ao salvar)
pnpm dev

# Build para produção
pnpm build

# Executar versão compilada
pnpm start
```

**Mudanças vs v1.0:**
- ✅ `tsx` substituiu `ts-node` (melhor suporte ESM)
- ✅ `"type": "module"` no package.json (ESM nativo)

---

## Evolução do Projeto

### v1.0 (branch `main`) - Código Procedural
```typescript
// ❌ Estado global exposto
let tasks: TTask[] = [];

// ❌ Funções soltas
const addTask = (...) => {
    tasks.push(task);
}
```

**Problemas:**
- Estado global acessível
- Sem encapsulamento
- Sem organização

### v2.0 (branch `feat-refactor-solid-v1`) - Singleton Pattern ← ATUAL
```typescript
// ✅ Estado encapsulado
class TaskRepository {
    private tasks: TTask[] = [];
    private static instance: TaskRepository;
}

// ✅ Acesso controlado
const repo = TaskRepository.getInstance();
```

**Melhorias:**
- ✅ Singleton Pattern aplicado
- ✅ Encapsulamento de dados
- ✅ Repository Pattern (básico)
- ✅ Modularização (task.ts, TaskRepository.ts, index.ts)

**Ainda falta:**
- ⚠️ Separar responsabilidades (SRP)
- ⚠️ Desacoplar notificações (Observer Pattern)
- ⚠️ Separar lógica de apresentação (Strategy + Formatters)

### v3.0 (planejado) - SOLID Completo
```typescript
// ✅ Interfaces e DI
interface ITaskRepository { ... }
interface INotificationService { ... }

class TaskService {
    constructor(
        private repository: ITaskRepository,
        private notifier: INotificationService
    ) {}
}

// ✅ Observer Pattern
class ConsoleObserver implements ITaskObserver { ... }
class EmailObserver implements ITaskObserver { ... }

// ✅ Strategy Pattern
class SortByPriorityStrategy implements ISortStrategy { ... }
```

---

## Comparação Visual

### Encapsulamento de Dados

| Aspecto | v1.0 (main) | v2.0 (feat-refactor-solid-v1) |
|---------|-------------|-------------------------------|
| **Estado** | `let tasks: TTask[] = []` (global) | `private tasks: TTask[] = []` |
| **Acesso** | Direto ao array | Via métodos públicos |
| **Modificação** | Qualquer código pode modificar | Apenas TaskRepository pode modificar |
| **Controle** | Nenhum | Centralizado no repository |

### Organização do Código

| Aspecto | v1.0 (main) | v2.0 (feat-refactor-solid-v1) |
|---------|-------------|-------------------------------|
| **Arquivos** | 1 arquivo (index.ts) | 3 arquivos (task.ts, TaskRepository.ts, index.ts) |
| **Padrões** | Nenhum | Singleton + Repository (básico) |
| **Modularização** | Nenhuma | ESM modules com import/export |

### Problemas Resolvidos vs Pendentes

| Problema | v1.0 | v2.0 | v3.0 (planejado) |
|----------|------|------|------------------|
| Estado global exposto | ❌ | ✅ | ✅ |
| Sem abstrações | ❌ | ⚠️ Parcial | ✅ |
| Funções fazem demais (SRP) | ❌ | ❌ | ✅ |
| Console.log hardcoded | ❌ | ❌ | ✅ |
| Lógica + apresentação | ❌ | ❌ | ✅ |
| Difícil de testar | ❌ | ❌ | ✅ |

---

## Próximos Passos

Para evoluir para v3.0, vamos precisar:

### 1. Criar estrutura de pastas
```bash
mkdir -p src/v2-refactored/{domain,repositories,services,strategies,observers,presentation}
```

### 2. Implementar camadas progressivamente

**Domain Layer:**
```typescript
// domain/entities/Task.ts
export class Task {
    complete(): void { ... }
    isOverdue(): boolean { ... }
}

// domain/value-objects/TaskId.ts
export class TaskId {
    constructor(private readonly value: string) {}
}
```

**Services Layer:**
```typescript
// services/TaskService.ts
export class TaskService {
    constructor(
        private repository: ITaskRepository,
        private notifier: INotificationService,
        private logger: ILoggingService
    ) {}

    createTask(data: CreateTaskDTO): Task { ... }
}
```

**Observers Layer:**
```typescript
// observers/ConsoleNotificationObserver.ts
export class ConsoleNotificationObserver implements ITaskObserver {
    onTaskCreated(task: Task): void { ... }
}
```

**Strategies Layer:**
```typescript
// strategies/SortByPriorityStrategy.ts
export class SortByPriorityStrategy implements ISortStrategy {
    sort(tasks: Task[]): Task[] { ... }
}
```

### 3. Aplicar SOLID completo
- **S**RP: Cada classe uma responsabilidade
- **O**CP: Extensível via interfaces
- **L**SP: Substituição de implementações
- **I**SP: Interfaces específicas
- **D**IP: Dependência de abstrações

---

## Referências

- [README.md](../README.md) - Documentação principal
- [docs/PROBLEMAS.md](PROBLEMAS.md) - Análise de problemas e evoluções
- [docs/SINGLETON-PATTERN.md](SINGLETON-PATTERN.md) - Detalhes do Singleton
- [docs/ESTRUTURA.md](ESTRUTURA.md) - Estrutura recomendada para v3.0

---

**Branch atual:** `feat-refactor-solid-v1`

**Próxima branch:** `feat-solid-complete` (v3.0 com SOLID completo)
