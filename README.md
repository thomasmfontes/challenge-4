# Challenge 2025 — 2º Semestre (Front-end)

Frontend oficial do projeto Challenge 2025 (2º Semestre), implementado como SPA em React + Vite + TypeScript, com estilização em Tailwind CSS e roteamento via React Router. O sistema atende aos requisitos funcionais do desafio: cadastro e gestão de pacientes e consultas, envio de notificações, pré‑teste de teleconsulta e indicadores de risco de absenteísmo, com foco em usabilidade e acessibilidade.

Links obrigatórios:
- Repositório: https://github.com/thomasmfontes/challenge-4
- Deploy (Vercel): https://challenge-4-chi-five.vercel.app/
- Vídeo de apresentação: https://youtu.be/vEh5hcr33zg


## 1) Título e descrição do projeto

TELECARE+ — Aplicação SPA para gestão de consultas e pacientes, com comunicação multicanal e pré‑teste de dispositivos (câmera, microfone e conexão) visando reduzir o absenteísmo em atendimentos.

- Contexto: interface da equipe da clínica, com indicadores e ações rápidas sobre consultas e pacientes; páginas públicas de apresentação (Home, Sobre, FAQ, Contato) e vitrine de integrantes.
- Objetivo: melhorar a experiência de agendamento e acompanhamento, aumentar a presença do paciente e organizar o trabalho da equipe.


## 2) Requisitos funcionais e técnicos

Requisitos funcionais (implementados no front):
- Home com indicadores principais (total de consultas, confirmadas, alto risco).
- Lista de Consultas: paginação, status, risco de absenteísmo, ações de confirmar e notificar, acesso ao pré‑teste.
- Notificações: abertura de diálogo para escolher canal (WhatsApp, SMS, E‑mail, Ligação, Voz/URA) e envio.
- Pré‑consulta: fluxo de verificação de câmera, microfone e rede; resultado salvo e refletido na tela da equipe.
- Pacientes: listagem, criação, edição e exclusão; pesquisa e paginação.
- Páginas institucionais: Sobre, FAQ e Contato (com tratamento de erro e feedback via toast).
- Integrantes: listagem a partir de arquivo local `integrantes.json` com buscas e ordenação.

Requisitos técnicos / tecnológicos:
- React + Vite + TypeScript.
- Tailwind CSS (estilização consistente e responsiva).
- React Router para navegação SPA.
- React Hook Form em formulários.
- Gerenciamento leve de estado com hooks locais e Zustand (quando aplicável).
- Comunicação com backend via `fetch` nativo, centralizada em `services/`.
- Feedback ao usuário via componente de Toast próprio (`components/Toast`).
- Responsividade (mobile‑first) e boas práticas de acessibilidade (uso de role/aria, contraste e foco visível).


## 3) Estrutura do projeto

Diretório principal do front: `app/`

```
app/
   public/                 # estáticos públicos
   src/
      assets/               # imagens e mídias
      components/           # componentes reutilizáveis (Accordion, Badge, Button, Form*, Loading, Navbar, Toast etc.)
      data/                 # arquivos de dados (integrantes.json)
      pages/                # páginas (Home, Consultas, Pacientes, PacienteDetalhe, PreConsulta, Sobre, FAQ, Contato, Integrantes, IntegranteDetalhe)
      routes/               # roteador da aplicação (index.tsx)
      services/             # chamadas HTTP e mapeadores (api.ts, pacienteService.ts, consultaService.ts, notificacaoService.ts)
      styles/               # estilos globais (Tailwind)
      types/                # tipagens (consulta, paciente, médico, notificação)
      utils/                # utilitários (formatadores, assets)
   index.html
   package.json
   vite.config.ts
```

Padrões e boas práticas aplicadas:
- Componentização e separação por domínio (components/pages/services/types).
- Nomenclatura consistente (PT‑BR para textos/labels, camelCase no código, tipos com prefixo I* quando apropriado).
- Toasts centralizados para feedback (sem `alert`/`prompt`/`confirm` exceto confirmação nativa pontual).
- Formatação e lint seguindo configuração do projeto (ESLint, TypeScript estrito ao que está no `tsconfig`).


## 4) Configuração e execução

Pré‑requisitos:
- Node.js 20+ (LTS recomendado)
- npm (ou pnpm/yarn, se preferir)

Instalação e execução (desenvolvimento):

```bash
cd app
npm install
npm run dev
```

Build de produção e preview local:

```bash
cd app
npm run build
npm run preview
```

Variáveis de ambiente (Vite):

```bash
VITE_API_BASE_URL=http://localhost:8080
```

Deploy na Vercel:
1) Definir Root Directory como `app/` no painel do projeto e usar presets de Vite:
    - Install Command: `npm install`
    - Build Command: `npm run build`
    - Output Directory: `dist`
    - Env: `VITE_API_BASE_URL=https://sua-api.exemplo.com`
2) Alternativamente, manter um `vercel.json` dentro de `app/` (já existe) com as mesmas configurações.


## 5) Critérios de avaliação

Base sugerida:
- Funcionalidades atendidas (Consultas, Pacientes, Notificações, Pré‑consulta, Indicadores, Páginas públicas).
- Qualidade do layout e UX (consistência visual, estados de carregamento/erro, feedback via toast, microinterações).
- Responsividade (mobile‑first, grid fluido, testes em diferentes breakpoints).
- Código limpo e organização (componentização, serviços, tipagem, nomes claros, ausência de dead code).
- Boas práticas de acessibilidade (semântica, roles/aria, foco, contraste, textos descritivos).
- Versionamento (histórico de commits distribuído entre integrantes, mensagens claras).
- Deploy funcional (Vercel) e documentação (README completo).
- Apresentação em vídeo demonstrando fluxo principal e decisões técnicas.


## 6) Boas práticas e padrões obrigatórios

- Git e versionamento
   - Branches por feature/correção; PRs com descrição e revisão.
   - Commits semânticos: `feat:`, `fix:`, `chore:`, `docs:`, `refactor:`, `perf:`, `test:`.
- Arquitetura
   - SPA modular, separação por camadas (UI, services, types, utils).
   - Evitar `any` desnecessário, preferir tipos explícitos.
- Acessibilidade e responsividade
   - Layout mobile‑first; uso de `aria-*` e `role` quando necessário.
   - Contraste adequado e foco visível.
- UX e feedback
   - Uso de toasts em operações assíncronas (sucesso/erro).
   - Evitar `alert/prompt`; confirmação nativa apenas quando estritamente necessária.
- Qualidade
   - Lint: `npm run lint` e correções antes do commit.
   - Build sempre verde localmente antes de abrir PR/deploy.


## 7) Autores e licença

Integrantes:
- Gabriel Maciel — RM: 562795 — Turma: 1TDSR
- Matheus Molina — RM: 563399 — Turma: 1TDSR
- Thomas Fontes — RM: 562254 — Turma: 1TDSR
