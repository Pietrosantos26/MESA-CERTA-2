<p align="center">
  <a href="#" target="_blank">
    <img src="https://raw.githubusercontent.com/user-attachments/assets/dddb8482-1e8c-4861-8077-3e1af76e7371" alt="Logo MesaCerta" width="120">
  </a>
  <h1 align="center">MesaCerta</h1>
</p>

<p align="center">
  <strong>Plataforma completa para descoberta e reserva de restaurantes.</strong>
  <br />
  <br />
  <a href="https://mesa-certa-2.vercel.app/" target="_blank"><strong>Ver Aplicação »</strong></a>
  <br />
  <br />
  <img src="https://img.shields.io/badge/status-ativo-brightgreen?style=for-the-badge" alt="Status do Projeto">
  <img src="https://img.shields.io/badge/licen%C3%A7a-MIT-blue?style=for-the-badge" alt="Licença">
</p>

---

## 📖 Tabela de Conteúdos

* [Sobre o Projeto](#-sobre-o-projeto)
  * [Preview](#-preview)
  * [Tech Stack](#-tech-stack)
* [✨ Funcionalidades](#-funcionalidades)
* [🚀 Links ao Vivo](#-links-ao-vivo)
* [⚙️ Como Rodar Localmente](#️-como-rodar-localmente)
  * [Pré-requisitos](#-pré-requisitos)
  * [Instalação do Backend](#-instalação-do-backend)
  * [Instalação do Frontend](#-instalação-do-frontend)
* [📚 Documentação da API](#-documentação-da-api)
* [🤝 Contribuidores](#-contribuidores)
* [📄 Licença](#-licença)

---

## 🍴 Sobre o Projeto

O **MesaCerta** é uma aplicação web full-stack desenvolvida para modernizar a forma como as pessoas descobrem e reservam mesas em restaurantes. A plataforma foi construída com foco em uma arquitetura robusta e escalável, utilizando tecnologias de ponta para oferecer uma experiência de usuário rápida, intuitiva e agradável.

Desde a busca por um restaurante até a confirmação da reserva, cada passo foi pensado para ser simples e eficiente, conectando clientes a experiências gastronômicas memoráveis.

### 🖼️ Preview

<p align="center">
  <img src="https://raw.githubusercontent.com/user-attachments/assets/958fc928-fd44-42f0-91a0-d1303126ec86" alt="Preview da Aplicação MesaCerta">
</p>

### 🛠️ Tech Stack

A aplicação é dividida em duas partes principais: um backend RESTful e um frontend reativo.

| Backend | Frontend | Banco de Dados & Deploy |
|---------|----------|-------------------------|
| ![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=node.js&logoColor=white) | ![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB) | ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=flat-square&logo=postgresql&logoColor=white) |
| ![Express.js](https://img.shields.io/badge/Express.js-000000?style=flat-square&logo=express&logoColor=white) | ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white) | ![Neon](https://img.shields.io/badge/Neon-0A101E?style=flat-square&logo=neon&logoColor=00E5C9) |
| ![JWT](https://img.shields.io/badge/JWT-000000?style=flat-square&logo=jsonwebtokens&logoColor=white) | ![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white) | ![Render](https://img.shields.io/badge/Render-46E3B7?style=flat-square&logo=render&logoColor=white) |
| ![Swagger](https://img.shields.io/badge/Swagger-85EA2D?style=flat-square&logo=swagger&logoColor=black) | ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white) | ![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white) |

---

## ✨ Funcionalidades

- **✅ Autenticação Segura:** Cadastro e login de usuários com tokens JWT.
- **👤 Gestão de Perfil:** Usuários podem visualizar, atualizar e deletar suas contas.
- **🔍 Busca Inteligente:** Encontre restaurantes por nome, tipo de culinária ou localização.
- **📅 Sistema de Reservas:** Crie, visualize e gerencie suas reservas em tempo real.
- **📱 Design Responsivo:** Experiência otimizada para desktop, tablets e celulares.
- **📄 Documentação de API:** Endpoints documentados com Swagger para fácil consulta e teste.

---

## 🚀 Links ao Vivo

Acesse a aplicação em produção nos seguintes links:

- **Frontend (Vercel):** [https://mesa-certa-2.vercel.app/](https://mesa-certa-2.vercel.app/)
- **Backend API (Render):** [https://meu-backend-mvp.onrender.com/api](https://meu-backend-mvp.onrender.com/api)

---

## ⚙️ Como Rodar Localmente

Siga estas instruções para configurar e executar o projeto em seu ambiente local.

### ✅ Pré-requisitos

- **Node.js**: Versão 18.x ou superior.
- **npm** ou **Yarn**.
- **Conta no Neon**: Para criar o banco de dados PostgreSQL gratuito.

### 📦 Instalação do Backend

1.  **Clone o repositório:**
    ```sh
    git clone [https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git](https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git)
    cd SEU_REPOSITORIO/backend
    ```

2.  **Instale as dependências:**
    ```sh
    npm install
    ```

3.  **Configure as variáveis de ambiente:**
    - Crie um arquivo `.env` na pasta `backend/`.
    - Copie o conteúdo do arquivo `.env.example` (se houver) ou use o modelo abaixo:

    ```env
    # String de conexão do seu banco de dados no Neon
    DATABASE_URL=postgresql://user:password@host:port/dbname?sslmode=require

    # Porta para o servidor local
    PORT=3002

    # Chaves para autenticação JWT
    JWT_SECRET=SUA_CHAVE_SECRETA_FORTE_E_ALEATORIA
    JWT_EXPIRES_IN=7d

    # Ambiente
    NODE_ENV=development
    ```

4.  **Execute o servidor:**
    ```sh
    npm run dev
    ```
    O servidor estará disponível em `http://localhost:3002`.

### 🖥️ Instalação do Frontend

1.  **Navegue para a pasta do frontend:**
    ```sh
    cd ../frontend
    ```

2.  **Instale as dependências:**
    ```sh
    npm install
    ```

3.  **Configure as variáveis de ambiente:**
    - Crie um arquivo `.env` na pasta `frontend/`.
    - Adicione a seguinte variável, apontando para o seu backend local:

    ```env
    VITE_API_URL=http://localhost:3002/api
    ```

4.  **Execute o servidor de desenvolvimento:**
    ```sh
    npm run dev
    ```
    Abra [http://localhost:5173](http://localhost:5173) no seu navegador.

---

## 📚 Documentação da API

A documentação completa dos endpoints da API, gerada com Swagger, pode ser acessada enquanto o backend está rodando localmente:

[**http://localhost:3002/api-docs**](http://localhost:3002/api-docs)

---

## 🤝 Contribuidores

Este projeto foi desenvolvido com a dedicação de:

| Nome              | GitHub                                  | LinkedIn                                        |
|-------------------|-----------------------------------------|-------------------------------------------------|
| **Pietro Costa** | [Link para o GitHub](https://github.com/pietro)  | [Link para o LinkedIn](https://linkedin.com/in/pietro)  |
| **Arthur Oliveira** | [Link para o GitHub](https://github.com/arthur) | [Link para o LinkedIn](https://linkedin.com/in/arthur) |

---

## 📄 Licença

Distribuído sob a licença MIT. Veja `LICENSE` para mais informações.
