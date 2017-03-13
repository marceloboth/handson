## Estrutura do projeto

As principais partes do projeto são:

  - `app`: é onde o código da aplicação está: models, routes, templates, componentes e style.
  - `tests`: é onde o código de testes fica.
  - `config`: configurações da aplicação.
  - `bower.json`: controla dependências javascript por Bower
  - `package.json`: controla dependências javascript por NPM.

## Primeiro Cadastro - Pessoa:

`ember generate resource person firstName:string lastName:string email:string birthDay:date salary:number`

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

Entede o que é passado na url, e instância o Route.

#### Route

É capaz de buscar dados, gravar, remover e filtrar.

#### Model

Representa o dominio

#### Template

É onde fica o conteúdo da interface.

#### Testes

Testes unitários sobre a rote e o model.

### Comunicando com a API

#### Criando e ajustando o adapter

Para criar um adapter basta o comando `ember g adapter application`. O Adapter é
responsável por fazer a serialiazação e deserialização dos dados e comunicar com o servidor. O comando citado, gera os seguintes arquivos:

```
installing adapter
  create app/adapters/application.js
installing adapter-test
  create tests/unit/adapters/application-test.js
```

### Listando dados

Necessário criar um arquivo de route para buscar os dados no servidor e um template
para exibir, isso é possível pelo generator `route`:

`ember g route person/index`

Que gera os arquivos:

```
installing route
  create app/routes/person/index.js
  create app/templates/person/index.hbs
updating router
  add route person/index
installing route-test
  create tests/unit/routes/person/index-test.js
```

No arquivo de route (`app/routes/person/index.js`), é necessário buscar todos os cadastros:

```
import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.store.findAll('person');
  }
});
```

Já no arquivo de template (`app/templates/person/index.hbs`) basta fazer a exibição da listagem:

```
<ul>
  {{#each model as |person|}}
    <li>{{person.firstName}} {{person.lastName}}</li>
  {{/each}}
</ul>
```

#### Configurando Mock da API

Com o addon [Mirage](http://www.ember-cli-mirage.com/) podemos simular nossa API, sem ela ainda existir, basta instalar a biblioteca: `ember install ember-cli-mirage`, que ao final da instalação criará os seguintes arquivos:

```
installing ember-cli-mirage
  create /mirage/config.js
  create /mirage/scenarios/default.js
  create /mirage/serializers/application.js
```

Para conseguir simular, precisamos criar os arquivos de model e uma factory que irá gerar dados apartir do model:

`ember g mirage-model person`

```
create /mirage/models/person.js
```

`ember g mirage-factory person`

```
create /mirage/factories/person.js
```

Necessário adicionar a geração do conteúdo:

```
import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  firstName() { return faker.name.firstName(); },
  lastName() { return faker.name.lastName(); },
  email() { return faker.internet.email(); },
  birthDay() { return new Date(); },
  salary() { return 1000.00; }
});
```

Agora basta criar os dados, configurando o arquivo `/mirage/scenarios/default.js`:

```
export default function(server) {
  server.createList('person', 10);
}
```

E informar ao Mirage para simular todas as requisições de rotas para a API no endpoint `/people`. Basta no arquivo `/mirage/config.js` infomar:

```
export default function() {
  this.resource('people');
}
```

### Criando

### Editando

### Removendo

### Filtrando
