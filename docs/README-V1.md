# TaskMaster v1.0 - Versão Original com Problemas

> **Branch:** `main`
>
> **Propósito:** Versão educacional que demonstra problemas comuns em código procedural
>
> ⚠️ Esta versão contém **deliberadamente** más práticas de programação para fins educacionais

---

## Aviso

Esta é a versão 1.0 do projeto, criada intencionalmente com problemas de design para servir como base de estudo de refatoração. **NÃO use este código como referência de boas práticas.**

Para ver a versão refatorada, mude para a branch `feat-refactor-solid-v1`.

---

## O que está implementado

Sistema básico de gerenciamento de tarefas (CRUD) completamente procedural:

### Funcionalidades

1. **Criar tarefas** (`addTask`)
   - Adiciona tarefa com título, descrição e prioridade
   - Gera ID automático
   - Define status inicial como 'pending'
   - ❌ Também faz notificação e logging (viola SRP)

2. **Completar tarefas** (`completeTask`)
   - Marca tarefa como completada
   - Registra data de conclusão
   - ❌ Também faz notificação e logging (viola SRP)

3. **Listar tarefas** (`listTasks`)
   - Exibe todas as tarefas
   - Ordena por data, prioridade ou status
   - ❌ Mistura lógica de ordenação com apresentação

4. **Mostrar estatísticas** (`showStats`)
   - Total de tarefas
   - Contagem por status
   - Taxa de conclusão

5. **Deletar tarefas** (`deleteTask`)
   - Remove uma tarefa pelo ID
   - ❌ Também faz notificação e logging (viola SRP)

6. **Atualizar prioridade** (`updateTaskPriority`)
   - Altera prioridade de uma tarefa
   - ❌ **BUG:** Falha ao atualizar a primeira tarefa (index 0)

---

## Estrutura do Código

```typescript
// ❌ Estado global exposto
let tasks: TTask[] = [];
let taskIdCounter: number = 1;

// ❌ Funções soltas fazendo múltiplas coisas
const addTask = (title, description, priority) => {
    const task = { ... };
    tasks.push(task);                               // 1. Cria
    console.log(`[NOTIFICATION] ...`);              // 2. Notifica
    console.log(`[LOG] ...`);                       // 3. Loga
}

const completeTask = (id) => { ... }
const listTasks = (sortBy) => { ... }
const deleteTask = (id) => { ... }
const updateTaskPriority = (id, newPriority) => { ... }
const showStats = () => { ... }
```

---

## Problemas Identificados

### 1. ❌ Estado Global Exposto
```typescript
let tasks: TTask[] = [];
let taskIdCounter: number = 1;
```

**Problemas:**
- Qualquer código pode acessar e modificar diretamente
- Impossível ter múltiplas instâncias isoladas
- Testes interferem uns com os outros
- Sem controle de acesso

**Impacto:**
```typescript
// Qualquer lugar do código pode fazer:
tasks = [];              // Limpa tudo sem controle
tasks.push(invalidTask); // Adiciona dados inválidos
```

---

### 2. ❌ Funções Fazendo Múltiplas Responsabilidades (Viola SRP)
```typescript
const addTask = (title, description, priority) => {
    const task = { ... };
    tasks.push(task);                          // 1. Cria tarefa
    console.log(`[NOTIFICATION] ...`);         // 2. Notifica usuário
    console.log(`[LOG] ...`);                  // 3. Faz logging
}
```

**Problemas:**
- Uma função faz 3 coisas diferentes
- Impossível reusar apenas a criação sem notificação
- Para mudar notificação, tem que modificar TODAS as funções
- Viola Single Responsibility Principle

---

### 3. ❌ Lógica + Apresentação Acopladas
```typescript
const listTasks = (sortBy) => {
    // Lógica de ordenação
    let sorted = [...tasks];
    if (sortBy === 'priority') {
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        sorted = sorted.sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]);
    }

    // Apresentação no console (acoplado!)
    console.log('\n=== LISTA DE TAREFAS ===');
    sorted.forEach(task => {
        console.log(`[${task.status}] ${task.title}`);
    })
}
```

**Problemas:**
- Ordenação está presa à formatação console
- Impossível reusar ordenação para CSV/JSON export
- Para mudar formato, tem que reescrever tudo
- Duplicação de código se precisar ordenar em outro lugar

---

### 4. ❌ Console.log Hardcoded
```typescript
// Espalhado por TODAS as funções
console.log(`[NOTIFICATION] Nova tarefa criada: ${title}`);
console.log(`[LOG] Task ${task.id} adicionada ao sistema`);
```

**Problemas:**
- Impossível mudar para email/SMS sem modificar funções
- Testes poluídos com output no console
- Sem abstração de notificações
- Não escalável

---

### 5. ❌ Sem Abstrações/Interfaces
```typescript
// Tudo é concreto e hardcoded
let tasks: TTask[] = [];  // Só existe array em memória
```

**Problemas:**
- Impossível trocar para File/Database/Cache
- Sem possibilidade de múltiplas implementações
- Tudo está acoplado ao array concreto
- Não há contratos (interfaces)

---

### 6. ❌ Difícil de Testar
```typescript
// Impossível testar isoladamente
test('adicionar tarefa', () => {
    // Problema: tasks é global, pode ter dados de outros testes
    tasks = [];  // Precisa limpar manualmente

    // Problema: console.log vai poluir output
    const spy = jest.spyOn(console, 'log');

    addTask('Test', 'desc', 'low');

    // Problema: teste acoplado a implementação
    expect(tasks.length).toBe(1);
    expect(spy).toHaveBeenCalledTimes(2);

    // Cleanup manual
    spy.mockRestore();
});
```

---

### 7. ❌ Bug na Validação
```typescript
const updateTaskPriority = (id, newPriority) => {
    const index = tasks.findIndex(task => task.id === id);
    if (!index) {  // ❌ BUG! index 0 é falsy
        console.log(`[ERROR] Tarefa não encontrada.`);
        return;
    }
    // ...
}
```

**Bug:**
- `findIndex` retorna `0` para o primeiro elemento
- `!0` é `true`, então vai dizer que não encontrou
- Deveria ser `if (index === -1)`

---

## Resumo dos Problemas

| # | Problema | Impacto |
|---|----------|---------|
| 1 | Estado global exposto | Impossível isolar, testes interferem, sem controle |
| 2 | Funções fazem demais | Viola SRP, difícil modificar/reusar |
| 3 | Lógica + apresentação | Código duplicado, não reutilizável |
| 4 | Console.log hardcoded | Impossível escalar, testes poluídos |
| 5 | Sem abstrações | Impossível trocar implementações |
| 6 | Difícil de testar | Testes acoplados, frágeis, com muito setup |
| 7 | Bug na validação | `updateTaskPriority` falha no index 0 |

---

## Comparação com v2.0

### v1.0 (Esta versão - branch `main`)
```typescript
// ❌ Estado global
let tasks: TTask[] = [];

// ❌ Funções soltas
const addTask = (...) => {
    tasks.push(task);
    console.log('...');
}
```

**Problemas:**
- ❌ Estado global exposto
- ❌ Funções fazem múltiplas coisas
- ❌ Console.log hardcoded
- ❌ Sem abstrações
- ❌ Difícil de testar

### v2.0 (branch `feat-refactor-solid-v1`)
```typescript
// ✅ Estado encapsulado
class TaskRepository {
    private tasks: TTask[] = [];
    private static instance: TaskRepository;

    private constructor() { }
    static getInstance(): TaskRepository { ... }
}

const repo = TaskRepository.getInstance();
```

**Melhorias:**
- ✅ Singleton Pattern aplicado
- ✅ Estado encapsulado (private)
- ✅ Repository Pattern (básico)
- ✅ Acesso controlado
- ⚠️ Ainda tem problemas (SRP, console.log, etc)

---

## Como Evoluir Este Código

Veja a branch `feat-refactor-solid-v1` para ver como este código foi refatorado com:

1. **Singleton Pattern** - Encapsulamento de estado
2. **Repository Pattern** - Abstração de acesso a dados
3. **Modularização** - Separação em arquivos

E planeje para v3.0:

4. **Services Layer** - Separar responsabilidades (SRP)
5. **Observer Pattern** - Desacoplar notificações
6. **Strategy Pattern** - Separar lógica de ordenação
7. **Dependency Injection** - Tornar testável
8. **Interfaces** - Permitir múltiplas implementações

---

## Documentação Relacionada

- [docs/PROBLEMAS.md](PROBLEMAS.md) - Análise completa dos problemas (v1.0 → v2.0 → v3.0)
- [docs/SINGLETON-PATTERN.md](SINGLETON-PATTERN.md) - Como o Singleton resolve alguns problemas
- [docs/ESTRUTURA.md](ESTRUTURA.md) - Estrutura recomendada para v3.0

---

## Executar Este Código

```bash
# Certifique-se de estar na branch main
git checkout main

# Instale dependências
pnpm install

# Execute
pnpm dev
```

---

## Objetivo Educacional

Esta versão existe para:

1. **Demonstrar problemas comuns** em código procedural
2. **Ilustrar violações SOLID** na prática
3. **Servir como base de comparação** com versões refatoradas
4. **Ensinar identificação de code smells**

**Não use este código em produção!**

Para boas práticas, veja:
- Branch `feat-refactor-solid-v1` (Singleton Pattern)
- Planejado: Branch `feat-solid-complete` (SOLID completo)

---

**Versão:** 1.0 (Código Original com Problemas)

**Branch:** `main`

**Propósito:** Educacional - Demonstração de más práticas
