# SST: Protocolo de Segurança

![Project Status](https://img.shields.io/badge/status-active-success.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Bun](https://img.shields.io/badge/Bun-1.1-black?logo=bun)
![Elysia](https://img.shields.io/badge/ElysiaJS-Fast-eb4034)
![React](https://img.shields.io/badge/React-18-blue?logo=react)
![Tailwind](https://img.shields.io/badge/Tailwind-3.4-38bdf8?logo=tailwindcss)

> Um jogo estratégico de _Lane Defense_ focado em Segurança e Saúde do Trabalho (SST), demonstrando a aplicação prática da Hierarquia de Controle de Riscos em um ambiente industrial gamificado.

---

## 📖 Sobre o Projeto

**SST: Protocolo de Segurança** é uma aplicação web desenvolvida com tecnologias modernas para gamificar o aprendizado sobre segurança do trabalho. O jogador assume o papel de um Engenheiro de Segurança que deve neutralizar riscos industriais (Físicos, Químicos e Mentais) utilizando cartas que representam medidas de controle reais.

O projeto utiliza uma arquitetura baseada em **Bun** para máxima performance, com um backend ultrarrápido em **ElysiaJS** servindo um frontend reativo em **React**.

## 🛠️ Tech Stack

### Core

- **Runtime & Package Manager:** [Bun](https://bun.sh/)
- **Linguagem:** TypeScript

### Backend (`/backend`)

- **Framework:** [ElysiaJS](https://elysiajs.com/)
- **Architecture:** REST API com Estado em Memória (Game Loop)

### Frontend (`/frontend`)

- **Framework:** React 18 + Vite
- **Estilização:** TailwindCSS
- **Animações:** Framer Motion
- **Ícones:** Lucide React
- **Toast/Feedback:** Sonner
- **Utilitários:** CLSX, Tailwind Merge

---

## 🎮 Mecânicas do Jogo

O jogo opera sob um **Game Loop** em tempo real onde:

1.  **Riscos** (ameaças) descem por trilhas ("lanes").
2.  Cada risco exige "slots" específicos para ser neutralizado (ex: 🔨 Físico, 🧪 Químico, 🧠 Mental).
3.  O jogador deve usar **Cartas de Solução** da sua mão para preencher esses slots.
4.  As cartas seguem a hierarquia de controle:
    - 🔵 **EPI**: Equipamento de Proteção Individual.
    - 🟡 **ADM**: Medidas Administrativas.
    - 🟣 **EPC**: Equipamento de Proteção Coletiva.

---

## 🚀 Como Executar

### Pré-requisitos

Certifique-se de ter o **Bun** instalado em sua máquina.

```bash
curl -fsSL https://bun.sh/install | bash
```

### Instalação

Clone o repositório e instale as dependências através do comando unificado na raiz do projeto:

```bash
# Instala dependências do backend e frontend
bun run install:all
```

_Alternativamente, você pode instalar manualmente em cada pasta:_

```bash
cd backend && bun install
cd frontend && bun install
```

### Ambiente de Desenvolvimento

Para iniciar o ambiente de desenvolvimento completo (Backend + Frontend), recomendamos abrir dois terminais:

**Terminal 1: Backend** (Porta 3001)

```bash
cd backend
bun run dev
```

**Terminal 2: Frontend** (Porta 5173)

```bash
cd frontend
bun run dev
```

Acesse a aplicação em: `http://localhost:5173`

---

## 📂 Estrutura do Projeto

A estrutura segue o padrão de **Monorepo** simplificado:

```
sst-protocolo/
├── backend/                # Servidor de Jogo Elysia
│   ├── src/
│   │   ├── data/          # Definições estáticas (Cartas, Níveis)
│   │   └── index.ts       # Entrypoint e Lógica do Game Loop
│   └── package.json
│
├── frontend/               # Cliente React
│   ├── src/
│   │   ├── api/           # Camada de comunicação com Backend
│   │   ├── components/    # Componentes UI (Cards, HUD, Screens)
│   │   ├── lib/           # Utilitários (cn, formatters)
│   │   ├── types/         # Definições de Tipos compartilhados
│   │   ├── App.tsx        # Container Principal
│   │   └── main.tsx       # Entrypoint React
│   └── package.json
│
├── README.md
├── package.json            # Scripts de raiz
└── bun.lock                # Lockfile unificado
```

## 🤝 Contribuição

Contribuições são bem-vindas! Se você deseja melhorar a mecânica do jogo, adicionar novas cartas ou otimizar a performance:

1.  Faça um Fork do projeto.
2.  Crie uma Branch para sua Feature (`git checkout -b feature/NovaMecanica`).
3.  Faça o Commit (`git commit -m 'Add: Nova carta de EPC'`).
4.  Push para a Branch (`git push origin feature/NovaMecanica`).
5.  Abra um Pull Request.

---

## 📄 Licença

Este projeto está sob a licença **MIT**. Veja o arquivo `LICENSE` para mais detalhes.

---

<div align="center">
  <sub>Desenvolvido com 💜 e Bun.</sub>
</div>
