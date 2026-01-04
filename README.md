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

> **Branch atual:** `feat-refactor-solid-v1`
>
> **Versão:** 2.0 (Singleton Pattern aplicado)

O projeto evoluiu de uma implementação procedural com problemas para uma versão refatorada aplicando boas práticas.

### Organização por Branch
- **`main`** (v1.0) - Código procedural original com problemas → [docs/README-V1.md](docs/README-V1.md)
- **`feat-refactor-solid-v1`** (v2.0) - Singleton Pattern aplicado ← **VOCÊ ESTÁ AQUI**
- **`feat-solid-complete`** (v3.0) - SOLID completo (planejado)

📚 **[Índice completo da documentação](docs/INDEX.md)** - Navegue por todas as versões

## Estrutura do Projeto

```
taskmaster/
├── docs/                  # Documentação
│   ├── PROBLEMAS.md      # Análise dos problemas identificados
│   └── ESTRUTURA.md      # Guia de estrutura de pastas recomendada
├── src/
│   ├── index.ts          # Entry point da aplicação
│   ├── TaskRepository.ts # Repository com Singleton Pattern
│   └── task.ts           # Type definitions
├── .gitignore
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
- **tsx** (execução TypeScript com suporte ESM)
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

O arquivo [src/index.ts](src/index.ts) demonstra o uso do TaskRepository com Singleton Pattern:

```typescript
import { TaskRepository } from "./TaskRepository.js";

const repo = TaskRepository.getInstance();

// Todas as funções agora usam o repositório
addTask('Estudar Design Patterns', 'Aprender Singleton, Factory, etc', 'high');
addTask('Fazer compras', 'Comprar ingredientes para jantar', 'medium');
addTask('Treinar', 'Academia às 18h', 'low');

// Demonstração do Singleton
const repo1 = TaskRepository.getInstance();
const repo2 = TaskRepository.getInstance();
console.log('São iguais?', repo1 === repo2); // true
```

## Evoluções Implementadas

### Design Patterns Aplicados

1. **Singleton Pattern** - [TaskRepository.ts](src/TaskRepository.ts)
   - Garante uma única instância do repositório
   - Controle centralizado de acesso aos dados
   - Estado compartilhado consistente

### Problemas Originais (Versão 1.0)

A primeira versão tinha os seguintes problemas:

1. **Funções fazendo múltiplas responsabilidades** - Violação do SRP
2. **Estado global** - Arrays globais impedem isolamento
3. **Lógica + apresentação acopladas** - Console.log hardcoded
4. **Sem abstrações** - Impossível trocar implementações
5. **Difícil de testar** - Testes acoplados e frágeis
6. **Bug na validação** - `updateTaskPriority` falha no index 0

Veja análise completa em [docs/PROBLEMAS.md](docs/PROBLEMAS.md).

## Roadmap

### Fase 1: Identificação ✅
- [x] Implementação básica com problemas
- [x] Documentação dos problemas
- [x] Estrutura de documentação organizada

### Fase 2: Refatoração (Em Andamento)
- [x] Singleton Pattern aplicado
- [x] Repository Pattern (básico)
- [ ] Aplicar Single Responsibility Principle completo
- [ ] Implementar Dependency Injection
- [ ] Criar abstrações e interfaces
- [ ] Aplicar Design Patterns adicionais:
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

### 📚 Documentação Completa
**Navegue por:** [docs/INDEX.md](docs/INDEX.md) - Índice completo organizado por branch

### Por Versão
- [docs/README-V1.md](docs/README-V1.md) - v1.0 (código com problemas - branch `main`)
- [docs/SINGLETON-PATTERN.md](docs/SINGLETON-PATTERN.md) - v2.0 (Singleton Pattern - branch atual)
- [docs/ESTRUTURA.md](docs/ESTRUTURA.md) - v3.0 (estrutura planejada)

### Análise e Problemas
- [docs/PROBLEMAS.md](docs/PROBLEMAS.md) - Análise completa de problemas e evoluções (v1.0 → v2.0 → v3.0)
- [docs/ESTRUTURA-ATUAL.md](docs/ESTRUTURA-ATUAL.md) - Estado atual do projeto (v2.0)

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
