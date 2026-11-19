# 📝 Notaria — Front-end em React para Bloco de Notas & Tarefas

> Aplicação web moderna, intuitiva e responsiva desenvolvida em **React 18 + Vite** para gerenciamento de notas e tarefas em tempo real, consumindo uma API REST em **Node.js / Express** hospedada no Render.

![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-5.1-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Vercel](https://img.shields.io/badge/Deploy-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

---

## 🌐 Links Rápidos

- 🔗 **Front-end no Vercel**: [https://notasfront.vercel.app/](https://notasfront.vercel.app/)
- ⚙️ **Repositório Backend**: [https://github.com/w-tangly/notas_back](https://github.com/w-tangly/notas_back)
- 🌐 **API REST (Render)**: [https://notas-back-ut9s.onrender.com/](https://notas-back-ut9s.onrender.com/)
- 🚀 **Coleção no Postman**: [https://documenter.getpostman.com/view/38311854/2sBYHbtGnJ](https://documenter.getpostman.com/view/38311854/2sBYHbtGnJ)

---

## ✨ Funcionalidades

- ➕ **Criar Nota/Tarefa**: Adição rápida com título, texto, contador de caracteres e atalho de teclado (`Ctrl + Enter`).
- 📖 **Listar & Organizar**: Exibição em grade com cartões dinâmicos e datas formatadas.
- 📌 **Fixar Notas**: Opção de fixar notas importantes no topo da tela.
- 🔍 **Pesquisa em Tempo Real**: Filtro instantâneo por título ou conteúdo das notas.
- ✏️ **Editar Nota (Modal)**: Janela modal interativa para atualizar o título e o texto de notas existentes.
- 🗑️ **Excluir Nota**: Remoção de notas com atualização instantânea na interface.
- 📋 **Copiar para Área de Transferência**: Copie o conteúdo da nota com 1 clique.
- 🌓 **Tema Escuro & Claro**: Alternância de temas com persistência no `localStorage`.
- 🟢 **Indicador de Conexão**: Badge com o status da API em tempo real (detecta se a instância gratuita do Render está inicializando).
- 🔔 **Notificações Toast**: Feedback visual instantâneo para todas as ações do usuário (sucesso, aviso, erro).

---

## 🛠️ Tecnologias Utilizadas

- **React 18**: Biblioteca para construção da interface de usuário baseada em componentes redefinidos.
- **Vite**: Ferramenta de build rápida e servidor de desenvolvimento com proxy configurado.
- **Lucide React**: Biblioteca de ícones modernos e leves.
- **CSS Vanilla (Glassmorphism)**: Design personalizado com variáveis CSS, efeito de vidro fosco, sombras e micro-animações.
- **Fetch API**: Comunicação assíncrona com o servidor backend.

---

## 📡 Endpoints da API Consumidos

A aplicação consome a API REST rodando no Render:

| Método | Endpoint | Descrição | Corpo da Requisição |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/notes` | Retorna a lista de todas as notas | — |
| `POST` | `/api/notes` | Cria uma nova nota | `{ "titulo": "...", "texto": "..." }` |
| `PUT` | `/api/notes/:id` | Atualiza uma nota existente pelo ID | `{ "titulo": "...", "texto": "..." }` |
| `DELETE` | `/api/notes/:id` | Exclui uma nota pelo ID | — |

---

## 📂 Estrutura do Projeto

```text
front-notas/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css
    ├── services/
    │   └── api.js          # Comunicação com a API REST
    └── components/
        ├── Header.jsx       # Cabeçalho com busca, status e tema
        ├── NoteForm.jsx     # Formulário de criação de notas
        ├── NoteCard.jsx     # Cartão individual da nota
        ├── NoteModal.jsx    # Modal para edição de nota
        └── Toast.jsx        # Notificações estilo Toast
```

---

## 💻 Como Executar Localmente

### Pré-requisitos
- **Node.js** (versão 18 ou superior)
- **npm** ou **yarn**

### Passo a passo

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/Arthur-2612/front-notas.git
   ```

2. **Navegue até a pasta do projeto:**
   ```bash
   cd front-notas
   ```

3. **Instale as dependências:**
   ```bash
   npm install
   ```

4. **Execute o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```

5. **Acesse no seu navegador:**
   [http://localhost:5173](http://localhost:5173)

---

## 👤 Autor

Desenvolvido por **[Pedro Carmo](https://github.com/w-tangly)** 🚀
