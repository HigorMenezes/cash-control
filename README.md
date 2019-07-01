# cash-control

API para controle de caixa virtual

## Ambiente de desenvolvimento

Esta API foi desenvolvida no seguinte ambiente:

- Ubuntu 19.04
- Visual Code v1.35.1 (x64)
- Node v10.16.0
- yarn v1.16.0

## Template dos arquivos .env

A API possui três arquivos .env (.env.test, .env.development e .env.production) e todo possui a mesma formatação.

```.env
DB_HOST=
DB_USERNAME=
DB_PASSWORD=
DB_DATABASE=
DB_DIALECT=
DB_STORAGE=

APP_PORT=
APP_SECRET=

BASIC_AUTH_USERNAME=
BASIC_AUTH_PASSWORD=

LOG_LEVEL='info'
LOG_DEFAULT_FILENAME='log'
LOG_MAX_SIZE='5m'
LOG_MAX_FILES='7d'
```

As variáveis que iniciam com "DB\_" se referem as configurações do banco de dados. A aplicação utiliza a ORM Sequelize para realizar a conexão com o banco de dados, quem já utilizou provável que esteja familiarizado com estas variáveis. [http://docs.sequelizejs.com/manual/getting-started.html#setting-up-a-connection];

As variáveis "APP_PORT" e "APP_SECRET" são referentes a porta da aplicação e o secret utilizado no Jasonwebtoken (JWT), pode ser escolhido de acordo com o gosto.

As variáveis "BASIC*AUTH*" é o usuário MASTER da API, o único que terá permissão a algumas rotas, sendo validado através do Basic Auth.

As variáveis iniciadas com "LOG\_" são referentes as configurações dos arquivos de logs que serão gerados pela API, por ser configuração mais específica de duas libs para o JS, elas estão pré configuradas. [https://www.npmjs.com/package/file-stream-rotator] e [https://www.npmjs.com/package/winston-daily-rotate-file].

## Scripts de execução

```json
{
  "scripts": {
    "start": "NODE_ENV=production node src/index.js",
    "start:pm2": "pm2 start ecosystem.config.js --env production",
    "dev": "NODE_ENV=development nodemon src/index.js",
    "dev:pm2": "pm2 start ecosystem.config.js",
    "pretest": "NODE_ENV=test sequelize db:migrate:undo:all && NODE_ENV=test sequelize db:migrate",
    "test": "NODE_ENV=test jest",
    "migrate:prod": "NODE_ENV=production sequelize db:migrate",
    "migrate:dev": "NODE_ENV=development sequelize db:migrate",
    "prettier:fix": "prettier --config ./.prettierrc.json --write  './src/**/*.*'"
  }
}
```

- "start": utiliza o node para executar o projeto utilizando as configurações de produção;
- "start:pm2": utiliza o pm2 para executar o projeto utilizando as configurações de produção; [http://pm2.keymetrics.io/docs/usage/pm2-doc-single-page/]
- "dev": utiliza o nodemon para executar o projeto utilizando as configurações de desenvolvimento;
- "dev:pm2": utiliza o pm2 para executar o projeto utilizando as configurações de desenvolvimento; [http://pm2.keymetrics.io/docs/usage/pm2-doc-single-page/]
- "pretest": executa antes do script "teste", assim configurando o ambiente de teste;
- "test": utiliza o JEST como ferramenta para realizar testes que estão na pasta "\_\_tests\_\_";
- "migrate:prod": prepara o banco de dados da configuração de produção;
- "migrate:dev": prepara o banco de dados da configuração de desenvolvimento;

Portanto, para executar o projeto em ambiente de desenvolvimento, é necessário configurar as variáveis de ambiente, realizar a configuração do banco de dados, através do script "migrate:dev" e depois executá-lo através do script "dev".

Para rodas os testes unitários e de integração da API basta rodar o script "test".

### Executando com docker-compose

A API possui um configuração básica para levantar o ambiente de DEV, apenas executando o comando:

```bash
docker-compose -f docker-compose.yml run --rm install
docker-compose up
```

# Como usar a API

A API tem intuito de simular um caixa, assim podendo registrar entrada e saída de dinheiro. Porém varias pessoas podem utilizar a mesma API sem ter acesso aos dados de outros.

## Status

Definitivamente as rotas menos preocupante para uso da API, já que serve apenas para padronizar os status utilizado por toda aplicação. Três status já são inseridos automático quando são rodadas as configurações do banco:

- 100 - ativo
- 200 - pendente
- 300 - inativo

O status é utilizado para principalmente, controlar o acesso dos usuários, na qual somente usuários ativos poderão utilizar o controle de caixa.

### rotas

Todas as rotas possui um basicAuth para acessa-las, que é o qual foi definido nas variáveis de ambiente, BASIC_AUTH_USERNAME e BASIC_AUTH_PASSWORD.

#### Listar todos status - get - /status

Retorna json no seguinte formato:

```json
{
  "code": 200,
  "message": "Status recovered with success",
  "content": {
    "status": [
      {
        "id": 100,
        "name": "active",
        "description": "indicates that is active",
        "createdAt": "2019-06-30T23:27:27.349Z",
        "updatedAt": "2019-06-30T23:27:27.349Z"
      },
      {
        "id": 200,
        "name": "pending",
        "description": "indicates that is pending",
        "createdAt": "2019-06-30T23:27:27.349Z",
        "updatedAt": "2019-06-30T23:27:27.349Z"
      },
      {
        "id": 300,
        "name": "inactive",
        "description": "indicates that is inactive",
        "createdAt": "2019-06-30T23:27:27.349Z",
        "updatedAt": "2019-06-30T23:27:27.349Z"
      }
    ]
  }
}
```

#### Listar um status - get - /status/:id

Retorna json no seguinte formato:

```json
{
  "code": 200,
  "message": "Status recovered with success",
  "content": {
    "status": [
      {
        "id": 100,
        "name": "active",
        "description": "indicates that is active",
        "createdAt": "2019-06-30T23:27:27.349Z",
        "updatedAt": "2019-06-30T23:27:27.349Z"
      }
    ]
  }
}
```

#### Criar status - post - /status

Exige um body json, no seguinte formato:

```json
{
  "id": 301,
  "name": "deleted",
  "description": "indicates that was deleted"
}
```

e retorna um objeto json:

```json
{
  "code": 201,
  "massage": "Status created with success",
  "content": {
    "status": {
      "id": 302,
      "name": "deleted",
      "description": "indicates that was deleted",
      "updatedAt": "2019-07-01T02:24:14.498Z",
      "createdAt": "2019-07-01T02:24:14.498Z"
    }
  }
}
```

#### Editar status - patch - /status/:id

Exige um body json, no seguinte formato:

```json
{
  "name": "deleted",
  "description": "indicates that is deleted"
}
```

e retorna um objeto json:

```json
{
  "code": 200,
  "message": "Status edited with success",
  "content": {
    "status": {
      "id": 302,
      "name": "deleted",
      "description": "indicates that is deleted",
      "createdAt": "2019-06-29T14:10:40.868Z",
      "updatedAt": "2019-06-29T14:19:23.859Z"
    }
  }
}
```

## Usuários

Manipulação dos usuários na API.

### rotas

Todas as rotas possui um basicAuth para acessa-las, que é o qual foi definido nas variáveis de ambiente, BASIC_AUTH_USERNAME e BASIC_AUTH_PASSWORD.

#### Listar todos usuários - get - /users

Retorna json no seguinte formato:

```json
{
  "code": 200,
  "message": "Users recovered with success",
  "content": {
    "users": [
      {
        "id": 1,
        "name": "Higor",
        "lastName": "Menezes",
        "email": "higormenezes1996@gmail.com",
        "statusId": 100,
        "createdAt": "2019-06-30T23:35:37.180Z",
        "updatedAt": "2019-06-30T23:36:29.587Z"
      },
      {
        "id": 2,
        "name": "Maria",
        "lastName": "Souza",
        "email": "maria@souza.c",
        "statusId": 100,
        "createdAt": "2019-06-30T23:35:37.180Z",
        "updatedAt": "2019-06-30T23:36:29.587Z"
      }
    ]
  }
}
```

#### Listar um usuário - get - /users/:id

Retorna json no seguinte formato:

```json
{
  "code": 200,
  "message": "User recovered with success",
  "content": {
    "users": [
      {
        "id": 1,
        "name": "Higor",
        "lastName": "Menezes",
        "email": "higormenezes1996@gmail.com",
        "statusId": 100,
        "createdAt": "2019-06-30T23:35:37.180Z",
        "updatedAt": "2019-06-30T23:36:29.587Z"
      }
    ]
  }
}
```

#### Criar usuário - post - /users

Exige um body json, no seguinte formato:

```json
{
  "name": "Higor",
  "lastName": "Menezes",
  "email": "higormenezes1996@gmail.com",
  "password": "123",
  "statusId": 100
}
```

e retorna um objeto json:

```json
{
  "code": 201,
  "massage": "User created with success",
  "content": {
    "users": {
      "id": 1,
      "name": "Higor",
      "lastName": "Menezes",
      "email": "higormenezes1996@gmail.com",
      "statusId": 100,
      "createdAt": "2019-06-30T23:35:37.180Z",
      "updatedAt": "2019-06-30T23:36:29.587Z"
    }
  }
}
```

#### Editar usuário - patch - /users/:id

Exige um body json, no seguinte formato:

```json
{
  "name": "Higor",
  "lastName": "Menezes",
  "email": "higormenezes1996@gmail.com",
  "password": "123",
  "statusId": 300
}
```

e retorna um objeto json:

```json
{
  "code": 200,
  "massage": "User edited with success",
  "content": {
    "users": [
      {
        "id": 1,
        "name": "Higor",
        "lastName": "Menezes",
        "email": "higormenezes1996@gmail.com",
        "statusId": 300,
        "createdAt": "2019-06-30T23:35:37.180Z",
        "updatedAt": "2019-06-30T23:36:29.587Z"
      }
    ]
  }
}
```

## Session

Criar um sessão (efetuar login) para o usuário.

### rota

A rota retornará um token (JWT) na qual será utilizado como auth em algumas rotas

#### Criar sessão - post - /session

Exige um body json, no seguinte formato:

```json
{
  "email": "higormenezes1996@gmail.com",
  "password": "123"
}
```

e retorna um objeto json:

```json
{
  "code": 200,
  "message": "Session validate with success",
  "content": {
    "token": "eyJhbGciOiASDdasASDdsADsadA156pXVCJ9.eyJpZCI6MSwiaWF0IjoxNTYxOTQ2NzkwLCJleHAiOjE1NjIwMzMxOTB9.HQhx8VIBFYr_OFhq7QsrkMPdBlii0gicUsraXnA-dCU"
  }
}
```

## Categorias

Manipulação das categorias de fluxo de caixa.

### rotas

Todas as rotas possui um bearerAuth para acessa-las, que é o token retornado pela /session.

#### Listar todas categorias - get - /categories

Retorna json no seguinte formato:

```json
{
  "code": 200,
  "message": "Category recovered with success",
  "content": {
    "categories": [
      {
        "id": 1,
        "name": "buy",
        "userId": 1,
        "createdAt": "2019-07-01T02:06:38.345Z",
        "updatedAt": "2019-07-01T02:06:38.345Z"
      },
      {
        "id": 2,
        "name": "sell",
        "userId": 1,
        "createdAt": "2019-07-01T02:06:38.345Z",
        "updatedAt": "2019-07-01T02:06:38.345Z"
      }
    ]
  }
}
```

#### Listar uma categorias - get - /categories/:id

Retorna json no seguinte formato:

```json
{
  "code": 200,
  "message": "Category recovered with success",
  "content": {
    "categories": [
      {
        "id": 1,
        "name": "buy",
        "userId": 1,
        "createdAt": "2019-07-01T02:06:38.345Z",
        "updatedAt": "2019-07-01T02:06:38.345Z"
      }
    ]
  }
}
```

#### Criar categoria - post - /categories

Exige um body json, no seguinte formato:

```json
{
  "name": "buy"
}
```

e retorna um objeto json:

```json
{
  "code": 201,
  "massage": "Category created with success",
  "content": {
    "categories": {
      "id": 1,
      "name": "buy",
      "userId": 1,
      "updatedAt": "2019-07-01T02:06:38.345Z",
      "createdAt": "2019-07-01T02:06:38.345Z"
    }
  }
}
```

#### Editar categoria - patch - /categories/:id

Exige um body json, no seguinte formato:

```json
{
  "name": "sell"
}
```

e retorna um objeto json:

```json
{
  "code": 200,
  "message": "Category edited with success",
  "content": {
    "categories": [
      {
        "id": 2,
        "name": "sell",
        "userId": 1,
        "createdAt": "2019-07-01T02:06:38.345Z",
        "updatedAt": "2019-07-01T02:56:42.239Z"
      }
    ]
  }
}
```

## Fluxo de caixa

Manipulação de fluxo de caixa.

### rotas

Todas as rotas possui um bearerAuth para acessa-las, que é o token retornado pela /session.

#### Listar todo fluxo de caixa - get - /cash-flow

Retorna json no seguinte formato:

```json
{
  "code": 200,
  "message": "CashFlow recovered with success",
  "content": {
    "totalBalance": 200,
    "totalCashIn": 500.5,
    "totalCashOut": 300.5,
    "cashFlow": [
      {
        "id": "4d41840e-e2bc-4901-9902-adb0a78dee47",
        "type": "cash-in",
        "description": "Sell a kitty",
        "date": "2019-06-30T17:00:00.000Z",
        "value": 500.5,
        "Category": {
          "id": 1,
          "name": "sell"
        }
      },
      {
        "id": "2bcea192-2e12-4ae1-b8e5-aee7ddd95127",
        "type": "cash-out",
        "description": "buy a puppy",
        "date": "2019-06-30T18:00:00.000Z",
        "value": 300.5,
        "Category": {
          "id": 2,
          "name": "buy"
        }
      }
    ]
  }
}
```

#### Cadastrar a entrada no caixa - post - /cash-flow-in

Exige um body json, no seguinte formato:

```json
{
  "description": "Sell a kitty",
  "categoryId": 1,
  "value": 500.5,
  "date": "2019-06-30T14:00:00-03:00"
}
```

Retorna json no seguinte formato:

```json
{
  "code": 201,
  "massage": "CashIn created with success",
  "content": {
    "totalBalance": 500.5,
    "totalCashIn": 500.5,
    "totalCashOut": 0,
    "cashFlow": {
      "id": "4d41840e-e2bc-4901-9902-adb0a78dee47",
      "type": "cash-in",
      "description": "Sell a kitty",
      "categoryId": 1,
      "date": "2019-06-30T17:00:00.000Z",
      "userId": 1,
      "value": 500.5,
      "updatedAt": "2019-07-01T03:06:18.451Z",
      "createdAt": "2019-07-01T03:06:18.451Z"
    }
  }
}
```

#### Cadastrar a saída no caixa - post - /cash-flow-in

Exige um body json, no seguinte formato:

```json
{
  "description": "buy a puppy",
  "categoryId": 2,
  "value": 300.5,
  "date": "2019-06-30T15:00:00-03:00"
}
```

Retorna json no seguinte formato:

```json
{
  "code": 201,
  "massage": "CashOut created with success",
  "content": {
    "totalBalance": 200,
    "totalCashIn": 500.5,
    "totalCashOut": 300.5,
    "cashFlow": {
      "id": "2bcea192-2e12-4ae1-b8e5-aee7ddd95127",
      "type": "cash-out",
      "description": "buy a puppy",
      "categoryId": 2,
      "date": "2019-06-30T18:00:00.000Z",
      "userId": 1,
      "value": 300.5,
      "updatedAt": "2019-07-01T03:07:59.412Z",
      "createdAt": "2019-07-01T03:07:59.412Z"
    }
  }
}
```

#### Relatório do fluxo de caixa - post - /cash-flow-in

O objeto json de request pode ter até todos esses campos, porém nenhum deles é obrigatório para retirada do relatório.

```json
{
  "id": "4d41840e-e2bc-4901-9902-adb0a78dee47",
  "type": "cash-in",
  "description": "Sell a kitty",
  "date": "2019-06-30T17:00:00.000Z",
  "value": 500.5,
  "categoryId": 1,
  "startDate": "2019-06-27T22:00:00-03:00",
  "endDate": "2019-06-30T22:00:00-03:00"
}
```

Retorna json no seguinte formato:

```json
{
  "code": 200,
  "message": "CashFlow recovered with success",
  "content": {
    "totalBalance": 200,
    "totalCashIn": 500.5,
    "totalCashOut": 300.5,
    "cashFlow": [
      {
        "id": "4d41840e-e2bc-4901-9902-adb0a78dee47",
        "type": "cash-in",
        "description": "Sell a kitty",
        "date": "2019-06-30T17:00:00.000Z",
        "value": 500.5,
        "Category": {
          "id": 1,
          "name": "sell"
        }
      }
    ]
  }
}
```

####
