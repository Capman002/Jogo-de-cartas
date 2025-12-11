# SST: Protocolo de Segurança

> **Gênero:** Puzzle / Lane Defense
> **Plataforma:** Web / Mobile
> **Tema:** Segurança do Trabalho e Hierarquia de Controle de Riscos

## 🚀 Como Executar

### Pré-requisitos

- [Bun](https://bun.sh/) instalado

### Instalação

```bash
# Backend
cd backend
bun install

# Frontend
cd frontend
bun install
```

### Desenvolvimento

```bash
# Terminal 1 - Backend (porta 3000)
cd backend
bun run dev

# Terminal 2 - Frontend (porta 5173)
cd frontend
bun run dev
```

Acesse: `http://localhost:5173`

## 🎮 Mecânica Principal

O jogo utiliza uma mecânica de **Sistema de Encaixe (Socket System)**:

- **Riscos** descem pelas lanes com slots vazios
- **Soluções** (EPIs, Procedimentos, EPCs) preenchem esses slots
- Neutralize o risco antes que atinja o trabalhador!

### Tipos de Cartas

| Ícone | Categoria | Função                         |
| :---: | :-------- | :----------------------------- |
|  🔵   | **EPI**   | Proteção individual consumível |
|  🟡   | **ADM**   | Conhecimento e autorizações    |
|  🟣   | **EPC**   | Proteção coletiva permanente   |

## 📁 Estrutura

```
├── backend/           # API Elysia + Bun
│   └── src/
│       ├── data/      # Cartas e estado do jogo
│       └── routes/    # Endpoints da API
│
└── frontend/          # React + Vite
    └── src/
        ├── components/  # Componentes React
        ├── api/         # Funções de API
        ├── styles/      # CSS global
        └── types/       # TypeScript types
```

## 📜 Licença

MIT
