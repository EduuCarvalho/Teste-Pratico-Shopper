# Teste-Pratico-Shopper

Este projeto é uma aplicação full stack que utiliza React.js para o front-end e Node.js para o back-end, além de um banco de dados MySQL para armazenamento de dados. 

## Instalação Back End

Antes de começar a usar a aplicação, é necessário instalar algumas dependências. Certifique-se de ter o Node.js e o MySQL instalados em seu sistema.

1. Clone o repositório para sua máquina:

```git clone https://github.com/EduuCarvalho/Teste-Pratico-Shopper.git```

2. Acesse a pasta do projeto Shopper-api:

`cd nome-do-projeto`

3. Instale as dependências do back-end: 

`npm install`

4. Crie um banco de dados MySQL e importe o arquivo database.sql localizado na pasta:

`src/config`

5. Crie um arquivo `.env` na raiz do projeto e configure suas variáveis de ambiente. Aqui está um exemplo:

```
PORT=porta local que deseja rodar a aplicação back end
DB_HOST='ocalhost'
DB_USER='root' ou usuario MySL
DB_PASSWORD='sua-senha'
DB_NAME=nome-do-banco-de-dados

``` 

6. No diretorio da pasta do back end rode a API:

`npm run dev`


## Instalação Front End

Para rodar a aplicação, siga os seguintes passos:

1. Na raiz do projeto fron end execute:

`npm start`

2. Acesse a aplicação em:

`http://localhost:3000`

Por padrão React.js usa a porta 3000 se a mesma estiver em uso execute:

`fuser -k 3000/tcp`

Agora a porta 3000 está liberada, retorne ao passo 2

##Funcionalidades

A partir de um arquivo CSV, a aplicação importa os dados em um input e utiliza a validação de preços com a ajuda do TypeScript. Além disso, a aplicação usa uma conexão com o banco de dados MySQL para realizar a atualização dos preços. A interface é desenvolvida em React.js e a parte do servidor é construída em Node.js. A aplicação é fácil de usar e pode ajudar a economizar tempo e esforço na atualização de preços de produtos em grandes volumes.
