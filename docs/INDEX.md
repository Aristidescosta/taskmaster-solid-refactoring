# TaskMaster - Índice de Documentação

> Navegação organizada por branch e versão do projeto

---

## Organização por Branch

### 📌 Branch: `main` (v1.0)
**Código procedural original com problemas educacionais**

#### Documentação Específica
- [README-V1.md](README-V1.md) - README da versão 1.0 (código com problemas)

#### Característica
- ❌ Estado global exposto
- ❌ Funções fazendo múltiplas coisas
- ❌ Console.log hardcoded
- ❌ Sem abstrações
- ❌ Bug na validação (index 0)

---

### 📌 Branch: `feat-refactor-solid-v1` (v2.0) ← **VOCÊ ESTÁ AQUI**
**Singleton Pattern aplicado, primeiros passos da refatoração**

#### Documentação Específica
- [SINGLETON-PATTERN.md](SINGLETON-PATTERN.md) - Detalhes do Singleton Pattern aplicado
- [ESTRUTURA-ATUAL.md](ESTRUTURA-ATUAL.md) - Estado atual do projeto (v2.0)

#### Características
- ✅ Singleton Pattern aplicado
- ✅ Estado encapsulado (private)
- ✅ Repository Pattern (básico)
- ✅ Modularização (task.ts, TaskRepository.ts, index.ts)
- ⚠️ Ainda tem problemas (SRP, console.log, lógica+apresentação)

---

### 📌 Branch: `feat-solid-complete` (v3.0) - PLANEJADO
**SOLID completo com múltiplos Design Patterns**

#### Documentação Específica
- [ESTRUTURA.md](ESTRUTURA.md) - Estrutura de pastas recomendada
- *(Será criada ao implementar)*

#### Características Planejadas
- ✅ Dependency Injection
- ✅ Observer Pattern (notificações)
- ✅ Strategy Pattern (ordenação)
- ✅ Factory Pattern (criação)
- ✅ Services separados (SRP)
- ✅ Interfaces (ITaskRepository, INotificationService, etc)
- ✅ 100% testável

---

## Documentação Geral (Todas as Branches)

### 📚 Análise e Problemas
- [PROBLEMAS.md](PROBLEMAS.md) - Análise completa de problemas e evoluções
  - Problemas da v1.0
  - Problemas resolvidos na v2.0
  - Problemas ainda presentes na v2.0
  - Soluções planejadas para v3.0

### 📚 Estrutura e Arquitetura
- [ESTRUTURA.md](ESTRUTURA.md) - Guia completo de estrutura de pastas recomendada
  - Arquitetura em camadas (Domain, Repository, Services, etc)
  - Comparação v1-bad vs v2-refactored vs v3.0
  - Migração gradual
  - Design Patterns por camada

- [ESTRUTURA-ATUAL.md](ESTRUTURA-ATUAL.md) - Estado atual do projeto (v2.0)
  - Estrutura de pastas atual
  - Descrição de cada arquivo
  - Comparação v1.0 vs v2.0
  - Próximos passos

### 📚 Design Patterns
- [SINGLETON-PATTERN.md](SINGLETON-PATTERN.md) - Singleton Pattern aplicado
  - O que é Singleton
  - Implementação no TaskRepository
  - Vantagens e desvantagens
  - Quando usar/evitar
  - Migração futura (Singleton → DI)

---

## Guia de Leitura Recomendado

### Para Iniciantes
1. Leia [README.md](../README.md) (raiz do projeto) - Visão geral
2. Leia [README-V1.md](README-V1.md) - Entenda os problemas originais
3. Leia [SINGLETON-PATTERN.md](SINGLETON-PATTERN.md) - Primeiro pattern aplicado
4. Leia [PROBLEMAS.md](PROBLEMAS.md) - Evolução completa

### Para Estudo de Refatoração
1. Leia [PROBLEMAS.md](PROBLEMAS.md) - Identifique os problemas
2. Leia [SINGLETON-PATTERN.md](SINGLETON-PATTERN.md) - Veja a primeira solução
3. Leia [ESTRUTURA-ATUAL.md](ESTRUTURA-ATUAL.md) - Estado atual
4. Leia [ESTRUTURA.md](ESTRUTURA.md) - Visão do futuro (v3.0)

### Para Implementação de v3.0
1. Leia [ESTRUTURA.md](ESTRUTURA.md) - Arquitetura completa
2. Leia [PROBLEMAS.md](PROBLEMAS.md) - Soluções planejadas
3. Implemente camada por camada seguindo o guia

---

## Mapa de Conceitos

### Princípios SOLID
| Princípio | v1.0 | v2.0 | v3.0 |
|-----------|------|------|------|
| **S**RP - Single Responsibility | ❌ | ❌ | ✅ |
| **O**CP - Open/Closed | ❌ | ⚠️ | ✅ |
| **L**SP - Liskov Substitution | ❌ | ⚠️ | ✅ |
| **I**SP - Interface Segregation | ❌ | ❌ | ✅ |
| **D**IP - Dependency Inversion | ❌ | ❌ | ✅ |

### Design Patterns Aplicados
| Pattern | v1.0 | v2.0 | v3.0 |
|---------|------|------|------|
| **Singleton** | ❌ | ✅ | ⚠️ (substituído por DI) |
| **Repository** | ❌ | ⚠️ Básico | ✅ Completo |
| **Observer** | ❌ | ❌ | ✅ |
| **Strategy** | ❌ | ❌ | ✅ |
| **Factory** | ❌ | ❌ | ✅ |

### Qualidade do Código
| Aspecto | v1.0 | v2.0 | v3.0 |
|---------|------|------|------|
| **Testabilidade** | ❌ Difícil | ⚠️ Média | ✅ Fácil |
| **Manutenibilidade** | ❌ Baixa | ⚠️ Média | ✅ Alta |
| **Extensibilidade** | ❌ Difícil | ⚠️ Média | ✅ Fácil |
| **Reusabilidade** | ❌ Baixa | ⚠️ Média | ✅ Alta |

---

## Estrutura de Pastas da Documentação

```
docs/
├── INDEX.md                    # Este arquivo - Índice geral
│
├── # Documentação Geral
├── PROBLEMAS.md               # Análise de problemas e evoluções
├── ESTRUTURA.md               # Estrutura recomendada (v3.0)
├── ESTRUTURA-ATUAL.md         # Estado atual (v2.0)
│
├── # Específico por Versão
├── README-V1.md               # README da v1.0 (branch main)
│
└── # Design Patterns
    └── SINGLETON-PATTERN.md   # Singleton Pattern (v2.0)
```

---

## Links Rápidos por Tópico

### Estado Global
- [PROBLEMAS.md#estado-global](PROBLEMAS.md) - Problema identificado
- [SINGLETON-PATTERN.md#problema-resolvido](SINGLETON-PATTERN.md) - Como foi resolvido

### Single Responsibility Principle
- [PROBLEMAS.md#funções-fazendo-mais-de-uma-coisa](PROBLEMAS.md) - Problema
- [PROBLEMAS.md#solução-planejada-v30](PROBLEMAS.md) - Solução planejada

### Notificações
- [PROBLEMAS.md#consolelog-hardcoded](PROBLEMAS.md) - Problema
- [PROBLEMAS.md#observer-pattern](PROBLEMAS.md) - Solução com Observer Pattern

### Ordenação
- [PROBLEMAS.md#lógica--apresentação-acopladas](PROBLEMAS.md) - Problema
- [PROBLEMAS.md#strategy-pattern](PROBLEMAS.md) - Solução com Strategy Pattern

### Testabilidade
- [PROBLEMAS.md#difícil-de-testar](PROBLEMAS.md) - Problema
- [PROBLEMAS.md#dependency-injection](PROBLEMAS.md) - Solução com DI

---

## Como Navegar Entre Versões

### Ver v1.0 (código com problemas)
```bash
git checkout main
# Leia: docs/README-V1.md
```

### Ver v2.0 (Singleton Pattern)
```bash
git checkout feat-refactor-solid-v1
# Leia: docs/SINGLETON-PATTERN.md
# Leia: docs/ESTRUTURA-ATUAL.md
```

### Implementar v3.0 (SOLID completo)
```bash
git checkout -b feat-solid-complete
# Leia: docs/ESTRUTURA.md
# Implemente seguindo o guia
```

---

## Contribuindo com Documentação

Ao adicionar novos padrões ou refatorações:

1. **Crie documento específico** do pattern aplicado (ex: `OBSERVER-PATTERN.md`)
2. **Atualize PROBLEMAS.md** - marque o que foi resolvido
3. **Atualize ESTRUTURA-ATUAL.md** - reflita o novo estado
4. **Atualize este INDEX.md** - adicione links
5. **Atualize README.md** (raiz) - atualize status

---

## Versões e Histórico

| Versão | Branch | Status | Documentação |
|--------|--------|--------|--------------|
| v1.0 | `main` | ✅ Completo | [README-V1.md](README-V1.md) |
| v2.0 | `feat-refactor-solid-v1` | ✅ Completo | [SINGLETON-PATTERN.md](SINGLETON-PATTERN.md) |
| v3.0 | `feat-solid-complete` | 📋 Planejado | [ESTRUTURA.md](ESTRUTURA.md) |

---

## Legenda

- ✅ Implementado/Resolvido
- ⚠️ Parcialmente implementado/resolvido
- ❌ Não implementado/Problema presente
- 📋 Planejado
- 🚧 Em desenvolvimento

---

**Última atualização:** 2026-01-04

**Versão atual:** v2.0 (branch `feat-refactor-solid-v1`)
