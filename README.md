# cash-control

API para controle de caixa virtual

### .env template

A API possui três arquivos .env (.env.test, .env.development e .env.production) e todo possui a mesma formatação

```.env
DB_HOST=
DB_USERNAME=
DB_PASSWORD=
DB_DATABASE=
DB_DIALECT=
DB_STORAGE=

APP_PORT=3030
APP_SECRET=

BASIC_AUTH_USERNAME=
BASIC_AUTH_PASSWORD=

LOG_LEVEL=
LOG_DEFAULT_FILENAME=
LOG_MAX_SIZE=
LOG_MAX_FILES=
```

cada arquivo .env sera utilizado dependendo do script escolhido para ser executado, sendo:

- yarn start: executa o .env.production, para o ambiente de produção
- yarn dev: executa o .env.development, para o ambiente de desenvolvimento
- yarn test: executa o .env.test, para que execute os testes da API, os testes são feitos através da framework JEST
