# 🎮 SST: Protocolo de Segurança — Guia Completo

> **Gênero:** Puzzle / Segurança do Trabalho  
> **Sistema:** 3 Pilares de Proteção + Timer Duplo  
> **Tema:** Hierarquia de Controle de Riscos (NR-01)

---

## 📖 Índice

1. [Objetivo do Jogo](#-objetivo-do-jogo)
2. [Sistema de 3 Pilares](#-sistema-de-3-pilares)
3. [Mecânica de Jogo Detalhada](#-mecânica-de-jogo-detalhada)
4. [Sistema de Duplo Timer](#-sistema-de-duplo-timer)
5. [Sistema de Vidas](#-sistema-de-vidas)
6. [Recursos do Jogador](#-recursos-do-jogador)
7. [Ações Disponíveis](#-ações-disponíveis)
8. [Níveis de Risco](#-níveis-de-risco)
9. [Condições de Vitória e Derrota](#-condições-de-vitória-e-derrota)
10. [Catálogo Completo de Cartas](#-catálogo-completo-de-cartas)
11. [Dicas e Estratégias](#-dicas-e-estratégias)

---

## 🎯 Objetivo do Jogo

Você é um **Técnico de Segurança do Trabalho** responsável por proteger os trabalhadores de uma indústria. Sua missão é **neutralizar 10 riscos ocupacionais** consecutivos utilizando as cartas corretas!

### 🏆 Meta de Vitória

- Resolva **10 riscos** antes que:
  - Suas **3 vidas** acabem, OU
  - O **timer total de 5 minutos** zere

---

## ⚙️ Sistema de 3 Pilares

Todas as cartas e riscos são baseados em **3 tipos de dano**:

| Pilar          | Ícone | Descrição                                           | Exemplos                                 |
| -------------- | ----- | --------------------------------------------------- | ---------------------------------------- |
| **🔨 Físico**  | 🔨    | Impactos, quedas, cortes, queimaduras, eletricidade | Queda de altura, choque elétrico, corte  |
| **🧪 Químico** | 🧪    | Gases, vapores, névoas, poeiras, corrosivos         | Solvente, fumos de solda, poeira         |
| **🧠 Mental**  | 🧠    | Erro humano, fadiga, stress, desconhecimento        | Falta de treinamento, cansaço, distração |

### 💡 Cartas Combo

Algumas cartas **resolvem múltiplos tipos** de dano simultaneamente (custam mais energia):

| Carta                  | Ícones | Custo | Por que é combo?                                        |
| ---------------------- | ------ | ----- | ------------------------------------------------------- |
| **Óculos Ampla Visão** | 🔨🧪   | ⚡2   | Protege contra partículas (físico) e respingos químicos |
| **Abafador de Ruído**  | 🔨🧠   | ⚡2   | Reduz ruído (físico) e melhora foco (mental)            |
| **Máscara Full Face**  | 🧪🔨   | ⚡3   | Gases tóxicos (químico) + proteção ocular (físico)      |
| **Cabine Acústica**    | 🔨🧠   | ⚡4   | Isola ruído (físico) e melhora concentração (mental)    |
| **Iluminação LED**     | 🧠🔨   | ⚡3   | Melhora atenção (mental) e visibilidade (físico)        |

---

## 🎲 Mecânica de Jogo Detalhada

### Fluxo de Uma Rodada

```
1. Risco aparece com slots vazios
   ↓
2. Você escolhe uma carta da mão
   ↓
3. Clica na carta para aplicá-la
   ↓
4a. CARTA CORRETA → Preenche 1 slot
4b. CARTA ERRADA → Perde 1 vida + carta é descartada
   ↓
5. Todos os slots preenchidos?
   → SIM: Risco neutralizado! +5s no timer total
   → NÃO: Continua preenchendo slots
```

### Como Funcionam os Slots

1. **Risco aparece** com slots representados por ícones (ex: 🔨🧠)
2. **Você precisa preencher cada slot** com uma carta que forneça aquele ícone
3. **Cartas combo** podem preencher qualquer um dos ícones que fornecem
   - Exemplo: **Abafador de Ruído** (🔨🧠) pode preencher slot 🔨 OU slot 🧠

### Exemplo Prático

**Risco:** Manutenção em Quadro Elétrico Vivo  
**Slots:** 🔨 + 🧠 (2 slots)

**Opção 1 (2 cartas):**

- Luva Isolante (🔨) → preenche slot 🔨
- Permissão de Trabalho (🧠) → preenche slot 🧠

**Opção 2 (1 carta + 1 carta):**

- Abafador de Ruído (🔨🧠) → preenche slot 🔨
- Diálogo Diário (🧠) → preenche slot 🧠

**Opção 3 (carta errada):**

- Respirador PFF2 (🧪) → ❌ **ERROR! Perde 1 vida**

---

## ⏱️ Sistema de Duplo Timer

O jogo possui **2 timers simultâneos** que criam tensão:

### 1. ⏳ Timer da Rodada (30 segundos)

- **Função:** Tempo para resolver o risco atual
- **Resetado:** A cada novo risco
- **Se zerar:** **Perde 1 vida** + passa para o próximo risco

### 2. ⏰ Timer Total (5 minutos)

- **Função:** Tempo total da partida
- **Nunca reseta:** Conta continuamente até zerar
- **Se zerar:** **GAME OVER** (derrota imediata)

### 📊 Regras dos Timers

| Ação                              | Timer da Rodada    | Timer Total                       |
| --------------------------------- | ------------------ | --------------------------------- |
| Aplicar carta (correta ou errada) | Continua contando  | Continua contando                 |
| Resolver risco completamente      | ✅ Reseta para 30s | ✅ **+5 segundos** (bônus!)       |
| Pular risco                       | ✅ Reseta para 30s | ⚠️ **-20 segundos** (penalidade!) |
| Timer da rodada zerar             | ⚠️ Próximo risco   | ⚠️ **-1 vida**                    |
| Comprar carta                     | Continua contando  | Continua contando                 |
| Descartar carta                   | Continua contando  | Continua contando                 |

### 💡 Estratégia de Tempo

**Quando você tem muito tempo total (ex: 4 minutos):**

- Pode pular vários riscos difíceis
- Cada pulo = -20s, mas você tem folga

**Quando você tem pouco tempo total (ex: 1 minuto):**

- **EVITE** pular riscos
- Resolva rápido mesmo que use cartas não-ideais
- Compre cartas rapidamente se não tiver

**Quando o timer da rodada está baixo (<10s):**

- Aplique a melhor carta disponível AGORA
- Ou pule (-20s é melhor que -1 vida se você tem tempo)

---

## ❤️ Sistema de Vidas

Você começa com **3 vidas**. Perde vida em 2 situações:

### ❌ Situação 1: Aplicar Carta Errada

```
Risco: Poeira de Varrição (precisa 🧪)
Você aplica: Capacete (🔨)
Resultado: ❌ Carta errada! -1 vida
```

- A carta é **descartada** (você perde ela)
- O risco continua na tela
- Vida: 3 → 2

### ⏰ Situação 2: Timer da Rodada Zerar

```
Timer da rodada: 30s → 0s
Você não resolveu o risco a tempo
Resultado: ⏰ -1 vida + próximo risco
```

- O risco atual é **pulado** automaticamente
- Novo risco aparece
- Vida: 2 → 1

### 💀 Game Over por Vidas

```
Vidas: 1 → 0
Resultado: 💀 DERROTA (Game Over)
```

---

## 💎 Recursos do Jogador

| Recurso             | Ícone | Descrição                               | Valor Inicial | Máximo |
| ------------------- | ----- | --------------------------------------- | ------------- | ------ |
| **Vidas**           | ❤️    | Erros permitidos                        | 3             | 3      |
| **Mão**             | 🃏    | Cartas disponíveis                      | 5             | 7      |
| **Energia**         | ⚡    | (Sistema futuro - não usado atualmente) | -             | -      |
| **Timer da Rodada** | ⏳    | Tempo para o risco atual                | 30s           | 30s    |
| **Timer Total**     | ⏰    | Tempo total da partida                  | 300s (5min)   | 300s   |
| **Pontuação**       | 🏆    | Pontos ganhos                           | 0             | ∞      |

### Como Funciona a Pontuação

- Cada risco tem um valor de **dano_ao_trabalhador**
- Ao resolver: **Pontos = dano × 10**
- Exemplo: Espaço Confinado (dano 50) = **500 pontos**

---

## 🕹️ Ações Disponíveis

### 1. ▶️ Aplicar Carta

**Como fazer:**

1. Olhe os slots do risco atual
2. Clique em uma carta da sua mão que tenha o ícone necessário
3. A carta é aplicada automaticamente

**Resultados:**

- ✅ **Carta correta:** Preenche 1 slot
- ❌ **Carta errada:** **-1 vida** + carta descartada
- 🏆 **Risco completo:** +5s no timer total + pontos

### 2. 📥 Comprar Carta

**Botão:** "Comprar" (canto superior direito)

**Regras:**

- Adiciona 1 carta aleatória à sua mão
- Máximo de **7 cartas** na mão
- **Sem custo** de energia ou vidas
- Use quando não tiver a carta certa

**Quando usar:**

- Risco precisa 🧪 mas você só tem cartas 🔨🧠
- Mão vazia ou com cartas inúteis

### 3. 🗑️ Descartar Carta

**Como fazer:**

1. Clique no botão "Descartar"
2. Clique na carta que quer remover
3. Carta é removida permanentemente

**Quando usar:**

- Mão cheia (7/7) e quer comprar carta nova
- Carta inútil para os próximos riscos

### 4. ⏭️ Pular Risco

**Botão:** "Pular (-20s do tempo total)"

**Regras:**

- **-20 segundos** do timer total
- **Não perde vida**
- Novo risco aparece imediatamente
- Timer da rodada reseta para 30s

**Quando usar:**

- Risco muito difícil (ex: 🧠🧠🧠 e você não tem cartas Mental)
- Você tem muito tempo total sobrando (>3min)
- Timer da rodada está acabando E você tem poucas vidas

**Quando NÃO usar:**

- Tempo total baixo (<1min)
- Você tem as cartas certas (mesmo que demore para preencher)

---

## ⚠️ Níveis de Risco

### 🟢 Nível 1: Riscos Simples (1 slot)

**Dificuldade:** Fácil  
**Slots:** 1 ícone  
**Dano:** 8-15

| Risco                         | Slots | Solução Ideal                  | Dano |
| ----------------------------- | ----- | ------------------------------ | ---- |
| **Vazamento de Óleo no Chão** | 🧠    | Sinalização/Placas             | 10   |
| **Ruído de Lixadeira**        | 🔨    | Protetor Auricular ou Abafador | 12   |
| **Poeira de Varrição**        | 🧪    | Respirador PFF2                | 8    |
| **Tédio Operacional**         | 🧠    | Rodízio ou Pausa Programada    | 15   |

---

### 🟡 Nível 2: Riscos Intermediários (2 slots)

**Dificuldade:** Médio  
**Slots:** 2 ícones (combos)  
**Dano:** 20-30

| Risco                    | Slots | Solução Ideal                    | Dano |
| ------------------------ | ----- | -------------------------------- | ---- |
| **Pintura em Spray**     | 🧪🧠  | Máscara Full Face + APR          | 25   |
| **Quadro Elétrico Vivo** | 🔨🧠  | Luva Isolante + PT               | 30   |
| **Prensa Hidráulica**    | 🔨🧠  | Sensor de Presença + Treinamento | 28   |
| **Carga Suspensa**       | 🔨🧠  | Capacete + Sinalização           | 20   |

**Dica:** Cartas combo (ex: Abafador 🔨🧠) podem preencher 1 dos 2 slots sozinhas!

---

### 🔴 Nível 3: Riscos Críticos (3 slots)

**Dificuldade:** Muito Difícil  
**Slots:** 3 ícones (situações extremas)  
**Dano:** 40-50

| Risco                  | Slots  | Solução Ideal                        | Dano |
| ---------------------- | ------ | ------------------------------------ | ---- |
| **Espaço Confinado**   | 🧪🧠🧠 | Full Face + Vigia + PT               | 50   |
| **Soldagem em Altura** | 🧪🔨🔨 | Full Face + Cinto + Biombo           | 45   |
| **Burnout Coletivo**   | 🧠🧠🧠 | Pausa + DDS + Rodízio                | 40   |
| **Vazamento de Gás**   | 🧪🔨🧠 | Full Face + Botão + Proc. Emergência | 48   |

**Armadilha:** Burnout Coletivo (🧠🧠🧠) só pode ser resolvido com cartas ADM (🟡). EPIs não funcionam!

---

## 🏁 Condições de Vitória e Derrota

### ✅ VITÓRIA

```
Riscos Resolvidos: 10/10
Resultado: 🏆 PARABÉNS! VITÓRIA!
Tela mostra: Pontuação final + Tempo restante
```

### ❌ DERROTA — 2 Formas

**1. Vidas Zeradas**

```
Vidas: 0/3
Causas possíveis:
- Aplicou 3 cartas erradas, OU
- Timer da rodada zerou 3 vezes, OU
- Combinação das duas

Resultado: 💀 GAME OVER
```

**2. Tempo Total Zerado**

```
Timer Total: 0:00
Causas possíveis:
- Pulou muitos riscos (-20s cada)
- Demorou muito para resolver riscos

Resultado: ⏰ TEMPO ESGOTADO!
```

---

## 📦 Catálogo Completo de Cartas (35 Total)

### 🔵 EPI — Equipamento de Proteção Individual (12 cartas)

Proteção individual. Baixo custo (1-3 energia). Um trabalhador por vez.

| Carta                          | Ícones | Descrição                       | Energia |
| ------------------------------ | ------ | ------------------------------- | ------- |
| **Capacete com Jugular**       | 🔨     | Contra impactos e quedas        | ⚡1     |
| **Óculos Ampla Visão**         | 🔨🧪   | Partículas + respingos químicos | ⚡2     |
| **Protetor Auricular Plug**    | 🔨     | Redução leve de ruído           | ⚡1     |
| **Abafador de Ruído (Concha)** | 🔨🧠   | Redução drástica + foco         | ⚡2     |
| **Luva de Vaqueta**            | 🔨     | Trabalho pesado, abrasão        | ⚡1     |
| **Luva Nitrílica**             | 🧪     | Manuseio de óleos e solventes   | ⚡1     |
| **Luva Isolante**              | 🔨     | Alta tensão elétrica            | ⚡2     |
| **Luva de Malha de Aço**       | 🔨     | Corte por lâminas               | ⚡1     |
| **Respirador PFF2 (N95)**      | 🧪     | Poeiras e névoas                | ⚡1     |
| **Máscara Full Face**          | 🧪🔨   | Gases tóxicos + proteção ocular | ⚡3     |
| **Cinto Paraquedista**         | 🔨     | Trabalho em altura              | ⚡2     |
| **Roupa de Aproximação**       | 🔨     | Calor radiante extremo          | ⚡2     |

---

### 🟡 ADM — Controles Administrativos (11 cartas)

**100% focado em 🧠 Mental**. Previne erro antes que aconteça.

| Carta                          | Ícones | Descrição                         | Energia |
| ------------------------------ | ------ | --------------------------------- | ------- |
| **Permissão de Trabalho (PT)** | 🧠     | Burocracia que obriga checagem    | ⚡1     |
| **Análise de Risco (APR)**     | 🧠     | Identificação prévia de perigos   | ⚡2     |
| **Treinamento Técnico**        | 🧠     | Aumenta perícia, reduz erro       | ⚡2     |
| **Pausa Programada**           | 🧠     | Reseta barra de fadiga            | ⚡1     |
| **Rodízio de Função**          | 🧠     | Quebra monotonia/hipnose          | ⚡1     |
| **Sinalização/Placas**         | 🧠     | Alerta visual passivo             | ⚡1     |
| **Diálogo Diário (DDS)**       | 🧠     | Reforço de memória de curto prazo | ⚡1     |
| **Procedimento de Emergência** | 🧠     | Evita pânico em crises            | ⚡2     |
| **Checklist de Pré-uso**       | 🧠     | Garante que máquina não falhe     | ⚡1     |
| **Vigia de Espaço Confinado**  | 🧠     | Monitoramento externo humano      | ⚡2     |
| **Isolamento de Área (Fita)**  | 🧠     | Barreira psicológica visual       | ⚡1     |

---

### 🟣 EPC — Engenharia/Coletivo (12 cartas)

Soluções definitivas. Alto custo (2-4 energia). Protege múltiplas pessoas.

| Carta                          | Ícones | Descrição                      | Energia |
| ------------------------------ | ------ | ------------------------------ | ------- |
| **Guarda-Corpo Rígido**        | 🔨     | Elimina risco de queda         | ⚡3     |
| **Sensor de Presença**         | 🔨     | Para máquina se alguém entrar  | ⚡3     |
| **Botão de Emergência**        | 🔨     | Parada imediata manual         | ⚡2     |
| **Exaustor Localizado**        | 🧪     | Suga veneno na fonte           | ⚡3     |
| **Cabine Acústica**            | 🔨🧠   | Isola fonte de ruído           | ⚡4     |
| **Lava-Olhos de Emergência**   | 🧪     | Mitigação pós-acidente         | ⚡2     |
| **Kit de Bloqueio (LOTO)**     | 🔨     | Cadeado físico em disjuntores  | ⚡3     |
| **Tapete Antifadiga**          | 🔨     | Ergonomia para trabalho em pé  | ⚡2     |
| **Iluminação LED Correta**     | 🧠🔨   | Melhora visibilidade + atenção | ⚡3     |
| **Ventilação Geral Diluidora** | 🧪     | Renovação de ar do galpão      | ⚡3     |
| **Aterramento Elétrico**       | 🔨     | Desvia fuga de corrente        | ⚡3     |
| **Biombo de Solda**            | 🔨     | Barreira contra UV e fagulhas  | ⚡2     |

---

## 🧠 Dicas e Estratégias Avançadas

### 💡 Matriz de Decisão

| Situação                    | Timer Total | Vidas    | Ação Recomendada                    |
| --------------------------- | ----------- | -------- | ----------------------------------- |
| Não tenho carta certa       | >2min       | 3        | **Comprar** carta                   |
| Não tenho carta certa       | >2min       | 1-2      | **Pular** (-20s)                    |
| Não tenho carta certa       | <1min       | Qualquer | **Comprar** rápido                  |
| Mão cheia (7/7)             | Qualquer    | Qualquer | **Descartar** carta inútil          |
| Timer rodada <5s            | >2min       | 3        | **Pular** ou aplicar                |
| Timer rodada <5s            | >2min       | 1        | **Pular** (-20s melhor que -1 vida) |
| Timer rodada <5s            | <1min       | Qualquer | **Aplicar** carta (mesmo imprecisa) |
| Risco 🧠🧠🧠 sem cartas ADM | >1min       | 2-3      | **Pular** imediatamente             |
| Risco 🧠🧠🧠 sem cartas ADM | <1min       | Qualquer | **Comprar** até ter ADM             |

### ⚠️ Armadilhas Fatais

**1. "Cadê minhas cartas Mental?"**

```
Problema: Risco "Burnout Coletivo" (🧠🧠🧠)
Sua mão: 5 EPIs, 2 EPCs, 0 ADM
Solução: Compre cartas até ter 3 ADM, ou pule
```

**2. "Mão cheia, sem saída"**

```
Problema: Mão 7/7 com cartas inúteis
Impacto: Não pode comprar cartas novas
Solução: Descarte 2-3 cartas, depois compre
```

**3. "Pulei demais, agora estou sem tempo"**

```
Problema: Pulou 8 riscos = -160 segundos
Timer total: 300s - 160s = 140s (2min20s)
Solução: Pare de pular! Resolva tudo agora
```

**4. "Tentei adivinhar e perdi 3 vidas"**

```
Problema: Aplicou cartas sem verificar ícones
Resultado: ❌❌❌ = Game Over
Solução: SEMPRE confirme os ícones antes
```

### 🎯 Combos Eficientes

**Espaço Confinado** (🧪🧠🧠) — 50 pontos

```
Solução A (3 cartas):
  1. Respirador PFF2 (🧪)
  2. Vigia (🧠)
  3. PT (🧠)

Solução B (2 cartas):
  1. Máscara Full Face (🧪🔨) → usa 🧪
  2. APR (🧠)
  3. Qualquer ADM (🧠)
```

**Soldagem em Altura** (🧪🔨🔨) — 45 pontos

```
Solução A (2 cartas):
  1. Máscara Full Face (🧪🔨) → usa ambos
  2. Cinto Paraquedista (🔨)

Solução B (3 cartas):
  1. Respirador PFF2 (🧪)
  2. Luva Isolante (🔨)
  3. Biombo de Solda (🔨)
```

**Burnout Coletivo** (🧠🧠🧠) — 40 pontos

```
⚠️ ATENÇÃO: Só cartas ADM funcionam!

Solução (3 cartas ADM):
  1. Pausa Programada (🧠)
  2. DDS (🧠)
  3. Rodízio de Função (🧠)
```

### 📊 Gerenciamento de Tempo

**Tempo Total vs Vidas — Trade-off**

| Estratégia                                 | Quando Usar         | Prós            | Contras           |
| ------------------------------------------ | ------------------- | --------------- | ----------------- |
| **Conservador** (nunca pular)              | Muito tempo (>3min) | Não perde tempo | Pode perder vidas |
| **Agressivo** (pular sempre que difícil)   | Muitas vidas (3)    | Não perde vidas | Pode zerar tempo  |
| **Balanceado** (pular se >2min E <2 vidas) | Situação mista      | Equilibrado     | Requer atenção    |

**Pontos de Checagem**

- **Risco 3/10:** Deve ter >3min e 2+ vidas
- **Risco 5/10:** Deve ter >2min e 1+ vida
- **Risco 8/10:** Deve ter >1min e 1+ vida
- **Risco 10/10:** Qualquer tempo serve (último risco!)

---

## 📜 Sobre a NR-01 — Hierarquia de Controle de Riscos

Este jogo é baseado na **NR-01** (Norma Regulamentadora sobre Gerenciamento de Riscos Ocupacionais) do Ministério do Trabalho brasileiro.

### Hierarquia de Controle (do melhor para o pior):

1. **🚫 Eliminação** — Remover o perigo completamente
2. **🔄 Substituição** — Trocar por algo menos perigoso
3. **🟣 Controles de Engenharia (EPC)** — Barreiras, ventilação, automação
4. **🟡 Controles Administrativos (ADM)** — Procedimentos, treinamentos, turnos
5. **🔵 EPI** — Última linha de defesa, proteção individual

### Por que essa ordem?

**EPC > ADM > EPI**

- **EPC** protege todos automaticamente (ex: Guarda-Corpo impede queda de qualquer um)
- **ADM** previne erro humano (ex: Treinamento evita que o trabalhador erre)
- **EPI** depende do uso correto (ex: Capacete só funciona se o trabalhador usar)

No jogo, isso se reflete no **custo**:

- EPI: ⚡1-3 (barato, individual)
- ADM: ⚡1-2 (barato, preventivo)
- EPC: ⚡2-4 (caro, mas definitivo)

---

## 📊 Estatísticas

**Total de Cartas:** 35

- 🔵 EPI: 12 cartas
- 🟡 ADM: 11 cartas
- 🟣 EPC: 12 cartas

**Total de Riscos:** 12

- 🟢 Simples (1 slot): 4 riscos
- 🟡 Intermediário (2 slots): 4 riscos
- 🔴 Crítico (3 slots): 4 riscos

**Cartas Combo:** 5

- Óculos Ampla Visão (🔨🧪)
- Abafador de Ruído (🔨🧠)
- Máscara Full Face (🧪🔨)
- Cabine Acústica (🔨🧠)
- Iluminação LED (🧠🔨)

---

**Boa sorte, Técnico de Segurança! 🛡️**

_"Segurança não é acaso, é conhecimento e planejamento."_
