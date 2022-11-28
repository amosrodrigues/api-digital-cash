<div align="center">
  <h1>
    Projeto do desafio proposto pela NG.CASH!
  </h1>
<p align="center">
  <a href="#tecnologias">Tecnologias</a>&nbsp;&nbsp; |&nbsp;&nbsp;
  <a href="#projeto">Projeto</a>&nbsp;&nbsp; |&nbsp;&nbsp;
  <a href="#instruções">Instruções</a>&nbsp;&nbsp; |&nbsp;&nbsp;
  <a href="#contato">Contato</a>
</p>
<br>
    <img alt="App NG.CASH" title="NG.CASH Cateira Digital" src="./web/public/capa.png" />
</div>

---

<h1 id="tecnologias">✨ Tecnologias ✅</h1>

<br>

Projeto realizado como desafio sugerido ao processo seletivo da NG.CASH (repo. privado) 🚀

Esse projeto foi desenvolvido com as seguintes tecnologias:

### Frontend

- NextJS
- TypeScript
- Stitches
- Radix-ui

### Backend

- NodeJS
- Express
- TypeORM
- TypeScript
- PostgreSQL

<br>

---

<h1 id="projeto">💻 Projeto ✅</h1>

<br>

A aplicação é um app para gerenciar transações financeiras de uma carteira digital, que contém as seguintes funcionalidades:

- Realizar cadastro de usuário/conta com saldo inicial de R$ 100,00;

- Fazer login e autenticação para acesso e realizações de trasações;

- Visualizar o saldo atual;

- Listar transações realizadas por data e/ou creditadas, debitadas e todas;

- Fazer logof;

<br>

Sobre o desenvolvimento (conceitos e fundamentos):

### Frontend

- Utilização do ContextApi para gerencimento de estado;

- React-hook-form para criação e validação de fomulário;

- Imutabilidade do estado

- Cookies para armazenamento do token obtido na autenticação.

- Componentização

- Hooks

- Estilização dos componentes utilizando a lib [Stitches](https://stitches.dev/).

- Criação de componentes acessíveis (modal, tabs) com a lib [Radix-ui](https://www.radix-ui.com/).

### Backend

- Utilização de token com JWT (jsonwebtoken) para autenticação de acesso ás rotas http;

- Arquitetura seguindo os princípios SOLID, API REST e REST-FULL;

- Utilização da extesão [ESLint](https://eslint.org/) no vscode para padronização de ecrita do código.

<br>

---

<h1 id="instruções"> 🚀 Instruções ✅</h1>

<br>

### Para instalação

1. Descompacte o arquivo zip e acesse o diretório ngcash-test.

2. Utilizando o [Docker](https://www.docker.com/) e [Docker-compose](https://docs.docker.com/compose/) previamente instalados execute o senguite comando:

   - `docker-compose up` ou `docker-compose up -d` para sair do terminal interativo após concluir.

3. Após a conclusão da etapa anterior acesse a interface inserindo a [url](http://localhost:3000) `http://localhost:3000` em seu navegar.

4. Para rodar os projetos individualmente:

### Frontend

- Entre no diretório `web` e execute `yarn && yarn dev` ou `npm install && npm run dev` para instalar as dependências.

- Após a conclusão da etapa anterior acesse a interface inserindo a [url](http://localhost:3000) `http://localhost:3000` em seu navegar.

### Backend

- Entre no diretório `server`.

- Será necessário subir um container com a imagem do postgres ou ter o postgres instalado.

- Execute o comando docker para subir um container do postgres e o comando para rodar o app:

  - `docker run --name ngcash -e POSTGRES_USER=docker -e POSTGRES_DB=ngcash -e POSTGRES_PASSWORD=ngcash -e TZ=America/Sao_Paulo -p 5432:5432 -d postgres`

  - Altere o arquivo contido no diretório src/database/index.ts na linha 10 substitua `[database]` para `[localhost]`.

  - `yarn && yarn dev` ou `npm install && npm run dev`

5. Após as etapas anteriores poderá retornar a interface realizar seu cadastro e fazer login: 🎲

<br>

---

<h1 id="contato">📞 Contato ✅</h1>

<br>

<h1>
  <img alt="Foto de Amós Rodrigues" title="Amós Rodrigues" src="https://avatars.githubusercontent.com/u/73254602?v=4" width="200px"  />
</h1>

<div> 
  <a href = "mailto:amos.adm.rh@gmail.com"><img src="https://img.shields.io/badge/-Gmail-%23333?style=for-the-badge&logo=gmail&logoColor=white" target="_blank"></a>
  <a href="https://www.linkedin.com/in/amos-rodrigues-dev" target="_blank"><img src="https://img.shields.io/badge/-LinkedIn-%230077B5?style=for-the-badge&logo=linkedin&logoColor=white" target="_blank"></a> 
</div>

<br>

👋🏻 Espero que tenha curtido! 💜 💚
