# 🎮 SST: Protocolo de Segurança — Guia Completo v2

> **Gênero:** Puzzle / Segurança do Trabalho  
> **Sistema:** 3 Pilares de Proteção  
> **Tema:** Hierarquia de Controle de Riscos (NR-01)

---

## 📖 Índice

1. [Objetivo do Jogo](#-objetivo-do-jogo)
2. [Sistema de 3 Pilares](#-sistema-de-3-pilares)
3. [Como Funciona](#-como-funciona)
4. [Recursos do Jogador](#-recursos-do-jogador)
5. [Ações Disponíveis](#-ações-disponíveis)
6. [Níveis de Risco](#-níveis-de-risco)
7. [Catálogo Completo de Cartas](#-catálogo-completo-de-cartas)
8. [Dicas e Estratégias](#-dicas-e-estratégias)

---

## 🎯 Objetivo do Jogo

Você é um **Técnico de Segurança do Trabalho** responsável por proteger os trabalhadores de uma indústria. Sua missão é **neutralizar 10 riscos ocupacionais** utilizando as cartas corretas antes que o tempo acabe!

---

## ⚙️ Sistema de 3 Pilares

Todas as cartas e riscos são baseados em **3 tipos de dano**:

| Pilar       | Ícone | Descrição                                           |
| ----------- | ----- | --------------------------------------------------- |
| **Físico**  | 🔨    | Impactos, quedas, cortes, queimaduras, eletricidade |
| **Químico** | 🧪    | Gases, vapores, névoas, poeiras, corrosivos         |
| **Mental**  | 🧠    | Erro humano, fadiga, stress, desconhecimento        |

### 💡 Cartas Combo

Algumas cartas resolvem **múltiplos tipos** de dano simultaneamente, tornando-as mais valiosas (e caras):

- **Óculos Ampla Visão** 🔨🧪 (Físico + Químico)
- **Abafador de Ruído** 🔨🧠 (Físico + Mental)
- **Máscara Full Face** 🧪🔨 (Químico + Físico)
- **Cabine Acústica** 🔨🧠 (Físico + Mental)
- **Iluminação LED** 🧠🔨 (Mental + Físico)

---

## 🎲 Como Funciona

1. Um **risco** aparece com **slots** que precisam ser preenchidos
2. Cada slot representa um tipo de proteção necessária (🔨 Físico, 🧪 Químico, 🧠 Mental)
3. Use suas **cartas de solução** para preencher os slots corretos
4. **Carta correta:** Preenche um slot ✅
5. **Carta errada:** Você **perde 1 vida** ❌
6. Quando todos os slots forem preenchidos, o risco é neutralizado!

---

## 💎 Recursos do Jogador

| Recurso                | Descrição                                         | Valor Inicial     |
| ---------------------- | ------------------------------------------------- | ----------------- |
| ❤️ **Vidas**           | Erros permitidos (carta errada ou tempo esgotado) | 3 vidas           |
| 🃏 **Mão**             | Cartas disponíveis para jogar                     | 5 cartas (máx. 7) |
| ⏳ **Timer da Rodada** | Tempo para resolver o risco atual                 | 30 segundos       |
| ⏰ **Timer Total**     | Tempo total do jogo                               | 5 minutos (300s)  |

---

## 🕹️ Ações Disponíveis

### ▶️ Aplicar Carta

- Clique em uma carta da sua mão para aplicá-la no risco atual
- **Carta correta:** Preenche o slot correspondente
- **Carta errada:** **Perde 1 vida** + a carta é descartada

### 🗑️ Descartar Carta

- Clique no botão "Descartar", depois clique na carta
- Remove uma carta da sua mão
- Útil para abrir espaço para cartas melhores

### 📥 Comprar Carta

- Adiciona uma carta aleatória à sua mão (máximo 7)
- Use quando não tiver a carta necessária

### ⏭️ Pular Risco

- Ignora o risco atual e passa para o próximo
- **Penalidade:** Perde **20 segundos** do timer total
- **Não perde vida!** Use estrategicamente

---

## ⚠️ Níveis de Risco

### 🟢 Nível 1: Riscos Simples (1 slot)

Requerem apenas um tipo de proteção.

**Exemplos:**

- **Vazamento de Óleo no Chão** 🧠 — Precisa de sinalização
- **Ruído de Lixadeira** 🔨 — Precisa de protetor auricular
- **Poeira de Varrição** 🧪 — Precisa de respirador
- **Tédio Operacional** 🧠 — Precisa de rodízio/pausa

### 🟡 Nível 2: Riscos Intermediários (2 slots)

Requerem **combo** de proteções.

**Exemplos:**

- **Pintura em Spray** 🧪🧠 — Névoa tóxica + ambiente saturado
- **Quadro Elétrico Vivo** 🔨🧠 — Choque + tensão cognitiva
- **Prensa Hidráulica** 🔨🧠 — Esmagamento + repetição
- **Carga Suspensa** 🔨🧠 — Queda de materiais + distração

### 🔴 Nível 3: Riscos Críticos (3 slots)

Situações extremas que requerem **múltiplas proteções**.

**Exemplos:**

- **Espaço Confinado** 🧪🧠🧠 — IPVS + claustrofobia + procedimento
- **Soldagem em Altura** 🧪🔨🔨 — Fumos + queda + queimadura
- **Burnout Coletivo** 🧠🧠🧠 — Equipe sobrecarregada
- **Vazamento de Gás** 🧪🔨🧠 — Gás explosivo + calor + pânico

---

## 📦 Catálogo Completo de Cartas

### 🔵 EPI — Equipamento de Proteção Individual (12 cartas)

Proteção individual. Baixo custo, efetivo para uma pessoa.

| ID        | Nome                           | Fornece | Descrição                       | Energia |
| --------- | ------------------------------ | ------- | ------------------------------- | ------- |
| `EPI_001` | **Capacete com Jugular**       | �       | Contra impactos e quedas        | ⚡ 1    |
| `EPI_002` | **Óculos Ampla Visão**         | 🔨🧪    | Partículas + respingos          | ⚡ 2    |
| `EPI_003` | **Protetor Auricular Plug**    | 🔨      | Redução leve de ruído           | ⚡ 1    |
| `EPI_004` | **Abafador de Ruído (Concha)** | �🧠     | Redução drástica + foco         | ⚡ 2    |
| `EPI_005` | **Luva de Vaqueta**            | 🔨      | Trabalho pesado, abrasão        | ⚡ 1    |
| `EPI_006` | **Luva Nitrílica**             | 🧪      | Óleos e solventes               | ⚡ 1    |
| `EPI_007` | **Luva Isolante**              | 🔨      | Alta tensão elétrica            | ⚡ 2    |
| `EPI_008` | **Luva de Malha de Aço**       | 🔨      | Corte por lâminas               | ⚡ 1    |
| `EPI_009` | **Respirador PFF2 (N95)**      | 🧪      | Poeiras e névoas                | ⚡ 1    |
| `EPI_010` | **Máscara Full Face**          | 🧪🔨    | Gases tóxicos + proteção ocular | ⚡ 3    |
| `EPI_011` | **Cinto Paraquedista**         | 🔨      | Trabalho em altura              | ⚡ 2    |
| `EPI_012` | **Roupa de Aproximação**       | 🔨      | Calor radiante extremo          | ⚡ 2    |

---

### 🟡 ADM — Controles Administrativos (11 cartas)

Focadas no pilar **Mental** (previnem o erro antes que aconteça).

| ID        | Nome                           | Fornece | Descrição                       | Energia |
| --------- | ------------------------------ | ------- | ------------------------------- | ------- |
| `ADM_001` | **Permissão de Trabalho (PT)** | 🧠      | Burocracia que obriga checagem  | ⚡ 1    |
| `ADM_002` | **Análise de Risco (APR)**     | 🧠      | Identificação prévia de perigos | ⚡ 2    |
| `ADM_003` | **Treinamento Técnico**        | 🧠      | Aumenta perícia, reduz erro     | ⚡ 2    |
| `ADM_004` | **Pausa Programada**           | 🧠      | Reseta barra de fadiga          | ⚡ 1    |
| `ADM_005` | **Rodízio de Função**          | 🧠      | Quebra monotonia/hipnose        | ⚡ 1    |
| `ADM_006` | **Sinalização/Placas**         | 🧠      | Alerta visual passivo           | ⚡ 1    |
| `ADM_007` | **Diálogo Diário (DDS)**       | 🧠      | Reforço de memória curto prazo  | ⚡ 1    |
| `ADM_008` | **Procedimento de Emergência** | 🧠      | Evita pânico em crises          | ⚡ 2    |
| `ADM_009` | **Checklist de Pré-uso**       | 🧠      | Garante que máquina não falhe   | ⚡ 1    |
| `ADM_010` | **Vigia de Espaço Confinado**  | 🧠      | Monitoramento externo humano    | ⚡ 2    |
| `ADM_011` | **Isolamento de Área (Fita)**  | 🧠      | Barreira psicológica visual     | ⚡ 1    |

---

### 🟣 EPC — Engenharia/Coletivo (12 cartas)

Soluções definitivas que protegem múltiplas pessoas. Maior custo.

| ID        | Nome                           | Fornece | Descrição                     | Energia |
| --------- | ------------------------------ | ------- | ----------------------------- | ------- |
| `EPC_001` | **Guarda-Corpo Rígido**        | �       | Elimina risco de queda        | ⚡ 3    |
| `EPC_002` | **Sensor de Presença**         | 🔨      | Para máquina se alguém entrar | ⚡ 3    |
| `EPC_003` | **Botão de Emergência**        | �       | Parada imediata manual        | ⚡ 2    |
| `EPC_004` | **Exaustor Localizado**        | 🧪      | Suga veneno na fonte          | ⚡ 3    |
| `EPC_005` | **Cabine Acústica**            | �🧠     | Isola fonte de ruído          | ⚡ 4    |
| `EPC_006` | **Lava-Olhos de Emergência**   | 🧪      | Mitigação pós-acidente        | ⚡ 2    |
| `EPC_007` | **Kit de Bloqueio (LOTO)**     | 🔨      | Cadeado físico em disjuntores | ⚡ 3    |
| `EPC_008` | **Tapete Antifadiga**          | �       | Ergonomia para trabalho em pé | ⚡ 2    |
| `EPC_009` | **Iluminação LED Correta**     | 🧠�     | Visibilidade + atenção        | ⚡ 3    |
| `EPC_010` | **Ventilação Geral Diluidora** | 🧪      | Renovação de ar do galpão     | ⚡ 3    |
| `EPC_011` | **Aterramento Elétrico**       | 🔨      | Desvia fuga de corrente       | ⚡ 3    |
| `EPC_012` | **Biombo de Solda**            | 🔨      | Barreira contra UV e fagulhas | ⚡ 2    |

---

## 🧠 Dicas e Estratégias

### 💡 Estratégias Gerais

| Situação                   | Ação Recomendada                            |
| -------------------------- | ------------------------------------------- |
| Não tenho a carta certa    | **Comprar** carta ou **Pular** risco (-20s) |
| Mão cheia (7 cartas)       | **Descartar** cartas menos úteis            |
| Timer da rodada baixo      | Aplicar cartas rapidamente ou **Pular**     |
| Muitas vidas restantes (3) | Pode arriscar mais                          |
| Poucas vidas (1)           | Só aplique cartas corretas ou pule          |
| Muito tempo total restante | Pode pular vários riscos se necessário      |
| Pouco tempo total          | Evite pular, resolva rápido                 |

### ⚠️ Armadilhas Comuns

1. **Usar só EPIs ignorando Mental (🧠)**

   - Riscos como "Burnout Coletivo" 🧠🧠🧠 só podem ser resolvidos com cartas ADM
   - Se você não tiver cartas Mental na mão, terá que pular ou comprar

2. **Esquecer de descartar cartas inúteis**

   - Mão cheia impede comprar cartas novas
   - Descarte cartas que não correspondem ao risco atual

3. **Desperdiçar tempo**
   - Cada vez que você pula, perde 20 segundos do tempo total
   - Planeje bem antes de pular

### 🎯 Combos Eficientes

**Para Espaço Confinado** 🧪🧠🧠:

- Máscara Full Face (🧪�) + Vigia (🧠) + PT (🧠)
- Ou: Respirador PFF2 (🧪) + 2 cartas ADM quaisquer

**Para Soldagem em Altura** 🧪🔨🔨:

- Máscara Full Face (🧪🔨) + Cinto Paraquedista (🔨) = 2 cartas apenas!
- Ou: Respirador (🧪) + 2 cartas físicas

**Para Burnout Coletivo** 🧠🧠🧠:

- 3 cartas ADM quaisquer (Pausa + DDS + Rodízio, por exemplo)
- EPIs **não funcionam** aqui!

---

## 📜 Sobre a Hierarquia de Controle de Riscos

Este jogo é baseado na **NR-01** (Norma Regulamentadora sobre Gerenciamento de Riscos Ocupacionais).

A hierarquia estabelece prioridade para controle de riscos:

1. **Eliminação** — Remover o perigo completamente
2. **Substituição** — Trocar por algo menos perigoso
3. **Controles de Engenharia (EPC 🟣)** — Barreiras, ventilação
4. **Controles Administrativos (ADM 🟡)** — Procedimentos, treinamentos
5. **EPI (🔵)** — Última linha de defesa, proteção individual

No jogo, você aplica esses conceitos protegendo trabalhadores de riscos reais!

---

**Total de Cartas:** 35 (12 EPI + 11 ADM + 12 EPC)  
**Total de Riscos:** 12 (4 simples + 4 intermediários + 4 críticos)

**Boa sorte, Técnico de Segurança! 🛡️**
