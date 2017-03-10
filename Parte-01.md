## Estrutura do projeto

As principais partes do projeto são:

  - `app`: é onde o código da aplicação está: models, routes, templates, componentes e style.
  - `tests`: é onde o código de testes fica.
  - `config`: configurações da aplicação.
  - `bower.json`: controla dependências javascript por Bower
  - `package.json`: controla dependências javascript por NPM.

## Primeiro Cadastro - Pessoa:

ember generate resource person firstName:string lastName:string email:string birthDay:date salary:number

Com esse comando algus arquivos são gerados, que servem de base para iniciar um cadastro:

```
create app/models/person.js
installing model-test
  create tests/unit/models/person-test.js
installing route
  create app/routes/person.js
  create app/templates/person.hbs
updating router
  add route person
installing route-test
  create tests/unit/routes/person-test.js
```

#### Router

#### Route

#### Model

#### Template

#### Testes

### Comunicando com a API

#### Criando e ajustando o adapter

### Listando dados

### Criando

### Editando

### Removendo

### Filtrando 
