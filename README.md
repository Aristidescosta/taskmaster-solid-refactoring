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

**Versão atual:** 1.0.0 (Versão com problemas de design)

Esta é a versão inicial deliberadamente implementada com más práticas para servir como base de estudo. Veja [PROBLEMAS.md](PROBLEMAS.md) para análise detalhada dos problemas identificados.

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
