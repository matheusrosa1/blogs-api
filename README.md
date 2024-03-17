# API Blogs

Este projeto é uma API de blogs desenvolvida utilizando Node.js e Sequelize. Ele oferece endpoints para gerenciar posts, categorias e comentários em um blog.

## Índice

- [Visão Geral](#visão-geral)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Instalação](#instalação)
- [Como Usar](#como-usar)
- [Contribuição](#contribuição)
- [Licença](#licença)
- [Contato](#contato)

## Visão Geral

Uma visão geral mais detalhada do projeto, explicando o que ele faz, por que é útil, etc.

## Principais Características:

- **Gerenciamento de Posts:** Crie, leia, atualize e delete posts do blog.
- **Gerenciamento de Categorias:** Crie, leia, atualize e delete categorias para organizar seus posts.
- **Comentários:** Os usuários podem comentar em posts existentes.
- **Autenticação e Autorização:** Implementação de autenticação de usuário e autorização de acesso aos recursos da API.

## Tecnologias Utilizadas

- **Node.js:** Plataforma de execução de código JavaScript do lado do servidor.
- **Express.js:** Framework web para Node.js utilizado na construção da API.
- **Sequelize:** ORM (Object-Relational Mapping) para Node.js, utilizado para interagir com o banco de dados MySQL.
- **MySQL:** Banco de dados relacional utilizado para armazenar dados da aplicação.
- **JWT (JSON Web Tokens):** Sistema de autenticação utilizado para autenticar usuários e proteger rotas da API.

## Instalação


## Com Docker

⚠️ Antes de começar, seu docker-compose precisa estar na versão 1.29 ou superior. Veja aqui ou na documentação como instalá-lo. No primeiro artigo, você pode substituir onde está com 1.26.0 por 1.29.2.

1. Rode os serviços node e db com o comando `docker-compose up -d --build`.

2. Lembre-se de parar o mysql se estiver usando localmente na porta padrão (3306), ou adapte, caso queira fazer uso da aplicação em containers.

3. Esses serviços irão inicializar um container chamado `blogs_api` e outro chamado `blogs_api_db`.

4. A partir daqui você pode rodar o container `blogs_api` via CLI ou abri-lo no VS Code.

5. Use o comando `docker exec -it blogs_api bash`. Ele te dará acesso ao terminal interativo do container criado pelo compose, que está rodando em segundo plano.

6. Instale as dependências com `npm install`. (Instale dentro do container)

⚠️ Atenção: Caso opte por utilizar o Docker, TODOS os comandos disponíveis no `package.json` (`npm start`, `npm test`, `npm run dev`, ...) devem ser executados DENTRO do container, ou seja, no terminal que aparece após a execução do comando `docker exec` citado acima.


## Sem Docker

1. Instale as dependências [Caso existam] com `npm install`.

2. Lembre-se de usar o prefixo `env $(cat .env)` ao rodar os comandos localmente para carregar as variáveis de ambiente do arquivo `.env`. 

# Como Usar

Este projeto pode ser testado e utilizado utilizando ferramentas como Thunder Client no Visual Studio Code ou outras ferramentas similares que permitem fazer requisições HTTP.

## Configuração Inicial

Antes de começar, você precisará garantir que o servidor esteja em execução. Siga as instruções na seção de Instalação do README para iniciar o servidor localmente, seja utilizando Docker ou sem Docker.

## Autenticação de Usuário

Antes de fazer qualquer outra requisição que exija autenticação, você precisará autenticar um usuário para obter um token de autenticação JWT. Siga estes passos:

1. Faça um POST para o endpoint `http://localhost:port/users/login` com as credenciais no corpo da requisição de um usuário existente no banco de dados. Isso irá gerar um token de autenticação.

   Exemplo de corpo da requisição:
   ```json
   {
       "email": "lewishamilton@gmail.com",
       "password": "123456"
   }



## Contato

Linkedin: https://www.linkedin.com/in/matheus-rosa-2a0652201/
