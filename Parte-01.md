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

`ember g route people/index`

Que gera os arquivos:

```
installing route
  create app/routes/people/index.js
  create app/templates/people/index.hbs
updating router
  add route people/index
installing route-test
  create tests/unit/routes/people/index-test.js
```

No arquivo de route (`app/routes/people/index.js`), é necessário buscar todos os cadastros:

```
import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.store.findAll('person');
  }
});
```

Já no arquivo de template (`app/templates/people/index.hbs`) basta fazer a exibição da listagem:

```
<ul>
  {{#each model as |person|}}
    <li>{{person.firstName}} {{person.lastName}}</li>
  {{/each}}
</ul>
```

Adicione um link para a listagem de pessoas. No arquivo de template principal (`app/templates/people/application.hbs`):

```
<nav>
  {{link-to 'Pessoas' 'people'}}
</nav>
<br />
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

Para criar um novo cadastro, precisamos criar um rota e os arquivos de route e template:

`ember g route people/new`

```
installing route
  create app/routes/people/new.js
  create app/templates/people/new.hbs
updating router
  add route people/new
installing route-test
  create tests/unit/routes/people/new-test.js
```

Para o usuário acessar a criação de cadastro, precisamos adicionar um link para a rota, no arquivo `app/templates/people/index.hbs` adicione:

```
{{link-to 'Novo cadastro' 'people.new'}}
```

Agora no arquivo de route `app/routes/people/new.js`, instancie um novo registro de pessoa:

```
import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.store.createRecord('person');
  }
});
```

E crie o formulário no template gerado `app/templates/people/new.hbs`:

```
<form {{action "save" on="submit"}}>
  <p>
    <label>Nome:
      {{input value=model.firstName}}
    </label>
  </p>
  <p>
    <label>Ultimo nome:
      {{input value=model.lastName}}
    </label>
  </p>
  <p>
    <label>E-mail:
      {{input value=model.email}}
    </label>
  </p>
  <p>
    <label>Data de nascimento:
      {{input value=model.birthDay}}
    </label>
  </p>
  <p>
    <label>Salario:
      {{input value=model.salary}}
    </label>
  </p>
  <input type="submit" value="Salvar"/>
  <button {{action "cancel"}}>Cancelar</button>
</form>
```

Para salvar, precisamos criar as ações de salvar (save) e cancelar (cancel). Vamos criar um arquivo de controller para isso, basta gerar ele: `ember g controller person/new` e adicionar o código abaixo:

```
import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    save() {
      this.get('model').save().then((person) => {
        this.transitionToRoute('people.person.show', person);
      });
    },
    cancel() {
      this.transitionToRoute('people');
    }
  }
});
```

### Exibindo um cadastro

`ember g route people/person --path=:person_id`

```
installing route
  create app/routes/people/person.js
  create app/templates/people/person.hbs
updating router
  add route people/person
installing route-test
  create tests/unit/routes/people/person-test.js
```

Para encontrar o cadastro, no arquivo de route defina a busca:

```
import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    return this.store.findRecord('person', params.person_id);
  }
});
```

Renomeie o arquivo de template para `app/templates/people/person/show.hbs` e adicione a seguinte estrutura responsável
por exibir os dados do cadastro:

```
<ul>
  <li>Nome: {{model.firstName}}</li>
  <li>Ultímo nome: {{model.lastName}}</li>
  <li>E-mail: {{model.email}}</li>
  <li>Data de nascimento: {{model.birthDay}}</li>
  <li>Salário: {{model.salary}}</li>
</ul>

{{link-to 'Voltar' 'person'}}
```

E atualize a listagem para navegar ao cadastro de cada pessoa:

`<li>{{person.firstName}} {{person.lastName}} - {{link-to 'Exibir' 'people.person.show' person}}</li>`

### Editando

Adicione o link para Alterar o cadastro na listagem geral:

`<li>{{person.firstName}} {{person.lastName}} - {{link-to 'Exibir' 'people.person.show' person}} | {{link-to 'Editar' 'people.person.edit' person}}</li>`

Já temos a rota que recupera o cadastro a ser alterado, basta criar o arquivo de template:

`ember g template people/person/edit.hbs`

Nesse arquivo adicionariemos o código do formulário de edição, porém criaremos um componente para reaproveitar o formulário de cadastro:

`ember g component people/person-form`

```
installing component
  create app/components/people/person-form.js
  create app/templates/components/people/person-form.hbs
installing component-test
  create tests/integration/components/people/person-form-test.js
```

Mova o código que está em `app/templates/people/new.hbs` para `app/templates/people/person-form` e no arquivo `new.hbs` faça a chamada ao componente. 

```
{{people/person-form}}
```

Faça o mesmo procedimento no arquivo `app/templates/people/person/edit.hbs`
### Removendo

### Filtrando
