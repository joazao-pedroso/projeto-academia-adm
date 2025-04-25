# Pulse Fit - Painel de Administração da Academia 🏋️‍♂️

Este é um painel administrativo feito com **Next.js (App Router)** para gerenciar usuários de uma academia. Com ele, você pode listar, buscar, editar, excluir e enviar mensagens via WhatsApp para os usuários, além de ativar/inativar cadastros.

[Link do site da Catraca na Vercel](https://pulse-fit-catraca.vercel.app/)

[Link do site Adm na Vercel](https://pulse-fit-adm.vercel.app/)

## 🚀 Tecnologias Utilizadas

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
- API: [https://api-academia-alpha.vercel.app](https://api-academia-alpha.vercel.app)
- API feita por [Pedro Vitor](https://github.com/Pedro-Vitor-Ribeiro-Silva)
- Repositório da API - [Clique aqui 🔍](https://github.com/Pedro-Vitor-Ribeiro-Silva/API_ACADEMIA)

---

## 🧾 Funcionalidades

- ✅ Listagem de usuários
- 🔍 Busca por nome ou CPF
- ➕ Criação de novos usuários
- ✏️ Edição de dados
- ❌ Exclusão com confirmação
- 🔐 Alteração de status (ativo/inativo)
- 📲 Envio de mensagem de cobrança via WhatsApp

---

## 📦 Instalação

### 1. Clone o repositório

```bash
git clone https://github.com/joazao-pedroso/projeto-academia-adm.git
cd projeto-academia-adm
```

### 2. Instale as dependências

```bash
npm install
```

ou

```bash
yarn
```

### 3. Rode o projeto localmente

```bash
npm run dev
```

ou

```bash
yarn dev
```

Acesse: [http://localhost:3000](http://localhost:3000)

---

## 📁 Estrutura do Projeto

```
📂src
 └📂app
    ┣📂components
    ┣📂edit
    ┣📂create
    ┣ 📄 favicon.ico
    ┣ 📄 globals.css
    ┣ 📄 layout.tsx
    └ 📄 page.tsx
```

---

## 🛠️ Dependências Importantes

```json
"dependencies": {
  "lucide-react": "^0.292.0",
  "next": "14.x",
  "react": "18.x",
  "react-dom": "18.x"
}
```

---

## 🌐 API Utilizada

Este projeto consome dados da seguinte API:

```
https://api-academia-alpha.vercel.app/gym
```

---

## ✍️ Criado por

Desenvolvido por [João Pedro](https://github.com/joazao-pedroso) 💻

---

## 📄 Licença

Este projeto está licenciado sob a licença MIT.
