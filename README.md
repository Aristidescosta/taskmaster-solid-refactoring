# TaskMaster

Sistema de gerenciamento de tarefas desenvolvido para fins educacionais, demonstrando a evolução de código procedural com problemas de design para uma arquitetura baseada em princípios SOLID e Design Patterns.

## Objetivo

Este projeto foi criado para:

- Demonstrar problemas comuns em código procedural
- Ilustrar violações de princípios SOLID
- Ensinar refatoração progressiva
- Aplicar Design Patterns na prática
- Mostrar como escrever código testável e manutenível

## Status do Projeto

> **Branch atual:** `main`
>
> **Versão:** 1.0 (Código procedural com problemas)

⚠️ **Esta é a versão inicial deliberadamente implementada com más práticas para servir como base de estudo.**

Veja [PROBLEMAS.md](PROBLEMAS.md) para análise detalhada dos problemas identificados.

---

## 🔀 Branches Disponíveis - Evolução do Projeto

Este projeto está organizado em branches que demonstram a evolução progressiva do código:

### 📍 `main` (v1.0) ← **VOCÊ ESTÁ AQUI**
**Status:** ✅ Completo

**Características:**
- Código procedural com problemas intencionais
- Estado global exposto
- Funções fazendo múltiplas coisas (viola SRP)
- Console.log hardcoded
- Sem abstrações ou interfaces
- Bug conhecido na validação

**Propósito educacional:** Demonstrar problemas comuns em código procedural

```bash
# Você já está nesta branch
git branch
```

---

### 📍 `feat-refactor-solid-v1` (v2.0)
**Status:** ✅ Completo | **Último commit:** `ed07b34`

**O que foi implementado:**

#### 🏗️ Arquitetura
- ✅ **Singleton Pattern** - TaskRepository com instância única
  ```typescript
  class TaskRepository {
      private static instance: TaskRepository;
      private constructor() { }
      static getInstance(): TaskRepository { ... }
  }
  ```
- ✅ **Repository Pattern** (básico) - Encapsulamento do acesso a dados
- ✅ **Estado encapsulado** - Arrays e counters agora são `private`
- ✅ **Modularização** - Código separado em 3 arquivos:
  - `task.ts` - Type definitions
  - `TaskRepository.ts` - Repository com Singleton
  - `index.ts` - Entry point e funções de alto nível

#### 📚 Documentação Completa
- ✅ **Pasta `docs/`** criada com 5 documentos:
  - `INDEX.md` - Índice central de navegação
  - `SINGLETON-PATTERN.md` - Detalhes do Singleton (7.8KB)
  - `PROBLEMAS.md` - Análise v1.0 → v2.0 → v3.0 (13KB)
  - `ESTRUTURA-ATUAL.md` - Estado atual do projeto (11KB)
  - `README-V1.md` - Documentação da versão original (9KB)

#### 🛠️ Melhorias Técnicas
- ✅ **`.gitignore`** adicionado (node_modules, dist, logs, etc)
- ✅ **tsx** substituiu ts-node (melhor suporte ESM)
- ✅ **ESM modules** com `"type": "module"`

#### ⚠️ Problemas ainda presentes
- Funções fazendo múltiplas coisas (viola SRP)
- Console.log hardcoded nas funções
- Lógica + apresentação acopladas em `listTasks()`
- Sem interfaces/abstrações (ITaskRepository)
- Difícil de testar (Singleton compartilha estado)

**Como acessar:**
```bash
git checkout feat-refactor-solid-v1

# Ver documentação
ls docs/  # 5 arquivos .md

# Executar
pnpm dev
```

**Documentação disponível:**
- 📖 `docs/INDEX.md` - Índice completo organizado por branch
- 🎯 `docs/SINGLETON-PATTERN.md` - Como funciona, vantagens/desvantagens
- 📊 `docs/PROBLEMAS.md` - Evolução completa (o que foi resolvido, o que falta)
- 📂 `docs/ESTRUTURA-ATUAL.md` - Arquivos e comparação v1.0 vs v2.0
- 📜 `docs/README-V1.md` - Documentação da versão original

---

### 📍 `feat-solid-complete` (v3.0)
**Status:** 📋 Planejado

**Refatorações planejadas:**
- 📋 **Dependency Injection** completo
- 📋 **Observer Pattern** para sistema de notificações
- 📋 **Strategy Pattern** para algoritmos de ordenação
- 📋 **Factory Pattern** para criação de objetos
- 📋 Separação completa de responsabilidades (SRP)
- 📋 Interfaces e abstrações (ITaskRepository, INotificationService, etc)
- 📋 100% testável com testes unitários e de integração

**Arquitetura planejada:**
```
src/v3-solid/
├── domain/           # Entidades e lógica de negócio
├── repositories/     # Abstração de persistência
├── services/         # Lógica de aplicação
├── strategies/       # Algoritmos intercambiáveis
├── observers/        # Sistema de eventos
└── presentation/     # Formatação e UI
```

**Como acompanhar:**
```bash
# Branch será criada em breve
git checkout feat-solid-complete
```

---

## 📊 Comparação Detalhada Entre Versões

| Aspecto | v1.0 (main) | v2.0 (feat-refactor) | v3.0 (planejado) |
|---------|-------------|----------------------|------------------|
| **Arquivos** | 1 arquivo (index.ts) | 3 arquivos + docs/ | Estrutura em camadas |
| **Estado Global** | ❌ `let tasks = []` (exposto) | ✅ `private tasks` (encapsulado) | ✅ Encapsulado com DI |
| **Acesso aos Dados** | ❌ Direto ao array | ✅ Via TaskRepository | ✅ Via ITaskRepository |
| **Instâncias** | ❌ Variáveis globais | ✅ Singleton (única instância) | ✅ DI (múltiplas instâncias) |
| **Documentação** | 1 arquivo (PROBLEMAS.md) | 📚 5 arquivos em docs/ | 📚 Completa por camada |
| **SRP** | ❌ Funções fazem 3+ coisas | ❌ Ainda violado | ✅ Cada classe 1 responsabilidade |
| **Notificações** | ❌ `console.log` hardcoded | ❌ `console.log` hardcoded | ✅ Observer Pattern |
| **Ordenação** | ❌ Acoplada ao console | ❌ Acoplada ao console | ✅ Strategy Pattern |
| **Criação de Tasks** | ❌ Object literal | ⚠️ Repository.addTask() | ✅ Factory Pattern |
| **Testabilidade** | ❌ Impossível isolar | ⚠️ Difícil (Singleton global) | ✅ Fácil (DI + mocks) |
| **Design Patterns** | ❌ 0 patterns | ✅ 2 (Singleton, Repository) | ✅ 5+ (Observer, Strategy, Factory, etc) |
| **SOLID Score** | ❌ 0/5 princípios | ⚠️ 1/5 (parcial OCP) | ✅ 5/5 completo |
| **Linhas de Código** | ~120 linhas (1 arquivo) | ~180 linhas + 50KB docs | ~400 linhas (organizado) |

---

## 🎓 Como Estudar Este Projeto

### Opção 1: Seguir a Evolução
```bash
# 1. Comece aqui (main) - veja os problemas
git checkout main
# Leia: PROBLEMAS.md, execute: pnpm dev

# 2. Veja a primeira refatoração (Singleton)
git checkout feat-refactor-solid-v1
# Leia: docs/SINGLETON-PATTERN.md

# 3. (Futuro) Veja a versão completa
git checkout feat-solid-complete
# Leia: docs/ (quando implementado)
```

### Opção 2: Comparar Diretamente
```bash
# Ver diferenças entre v1.0 e v2.0
git diff main feat-refactor-solid-v1 -- src/

# Ver apenas arquivos modificados
git diff --name-status main feat-refactor-solid-v1
```

### Opção 3: Experimentar
```bash
# Criar sua própria branch de refatoração
git checkout -b minha-refatoracao main
# Tente resolver os problemas você mesmo!
```

## Estrutura do Projeto

```
taskmaster/
├── src/
│   └── index.ts          # Implementação atual (versão com problemas)
├── PROBLEMAS.md          # Análise detalhada dos problemas de design
├── package.json
├── tsconfig.json
└── README.md
```

## Funcionalidades Implementadas

### CRUD de Tarefas

- **Criar tarefa** - Adiciona nova tarefa com título, descrição e prioridade
- **Completar tarefa** - Marca tarefa como completada
- **Listar tarefas** - Exibe tarefas com ordenação (data/prioridade/status)
- **Deletar tarefa** - Remove tarefa do sistema
- **Atualizar prioridade** - Modifica prioridade de tarefa existente
- **Mostrar estatísticas** - Exibe métricas e taxa de conclusão

### Modelo de Dados

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

## Tecnologias

- **TypeScript** 5.9.3
- **Node.js** (runtime)
- **ts-node** (execução TypeScript)
- **nodemon** (desenvolvimento com hot reload)
- **pnpm** (gerenciador de pacotes)

## Instalação

### Pré-requisitos

- Node.js (versão LTS recomendada)
- pnpm 10.20.0+

### Passos

```bash
# Clone o repositório
git clone <url-do-repositorio>
cd taskmaster

# Instale as dependências
pnpm install
```

## Como Usar

### Modo Desenvolvimento

```bash
# Executa com hot reload
pnpm dev
```

### Build para Produção

```bash
# Compila TypeScript para JavaScript
pnpm build

# Executa versão compilada
pnpm start
```

### Execução Atual

O arquivo [src/index.ts](src/index.ts) contém um exemplo de uso no final:

```typescript
console.log('=== TASKMASTER v1.0 (Versão Ruim) ===\n');
addTask('Estudar Design Patterns', 'Aprender Singleton, Factory, etc', 'high');
addTask('Fazer compras', 'Comprar ingredientes para jantar', 'medium');
addTask('Treinar', 'Academia às 18h', 'low');

deleteTask('task-2')
updateTaskPriority('task-2', 'high')
listTasks('priority');
completeTask('task-1');
showStats();
```

## Problemas Identificados

Esta versão possui intencionalmente os seguintes problemas de design:

1. **Funções fazendo múltiplas responsabilidades** - Violação do SRP
2. **Estado global** - Arrays globais impedem isolamento
3. **Lógica + apresentação acopladas** - Console.log hardcoded
4. **Sem abstrações** - Impossível trocar implementações
5. **Difícil de testar** - Testes acoplados e frágeis
6. **Bug na validação** - `updateTaskPriority` falha no index 0

Veja análise completa em [PROBLEMAS.md](PROBLEMAS.md).

## Roadmap

### Fase 1: Identificação (Atual)
- [x] Implementação básica com problemas
- [x] Documentação dos problemas

### Fase 2: Refatoração
- [ ] Aplicar Single Responsibility Principle
- [ ] Implementar Dependency Injection
- [ ] Criar abstrações e interfaces
- [ ] Aplicar Design Patterns:
  - Repository Pattern
  - Observer Pattern
  - Strategy Pattern
  - Factory Pattern

### Fase 3: Testes
- [ ] Configurar framework de testes (Jest/Vitest)
- [ ] Escrever testes unitários
- [ ] Escrever testes de integração

### Fase 4: Persistência
- [ ] Adicionar persistência em arquivo
- [ ] Adicionar suporte a banco de dados
- [ ] Implementar cache

### Fase 5: Interface
- [ ] CLI interativo
- [ ] API REST
- [ ] Interface Web

## Aprendizados

Este projeto demonstra:

### O que NÃO fazer
- Estado global compartilhado
- Funções com múltiplas responsabilidades
- Lógica de negócio acoplada à apresentação
- Código hardcoded sem abstração
- Código difícil de testar

### O que FAZER (após refatoração)
- Separação de responsabilidades
- Injeção de dependências
- Abstração através de interfaces
- Código testável e modular
- Princípios SOLID aplicados

## Contribuindo

Este é um projeto educacional. Sugestões e melhorias são bem-vindas através de:

- Issues para discussão de problemas
- Pull Requests para melhorias na documentação
- Feedback sobre abordagens de refatoração

## Licença

ISC

## Recursos Adicionais

### Documentação
- [PROBLEMAS.md](PROBLEMAS.md) - Análise detalhada dos problemas

### Princípios SOLID
- **S**ingle Responsibility Principle
- **O**pen/Closed Principle
- **L**iskov Substitution Principle
- **I**nterface Segregation Principle
- **D**ependency Inversion Principle

### Design Patterns Planejados
- **Repository Pattern** - Abstração de acesso aos dados
- **Observer Pattern** - Sistema de notificações desacoplado
- **Strategy Pattern** - Algoritmos de ordenação intercambiáveis
- **Factory Pattern** - Criação de objetos complexos

---

**Nota:** Esta versão 1.0.0 contém deliberadamente más práticas de programação para fins educacionais. O objetivo é demonstrar problemas comuns e como resolvê-los através de refatoração sistemática.
