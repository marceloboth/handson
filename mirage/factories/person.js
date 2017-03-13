import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  firstName() { return faker.name.firstName(); },
  lastName() { return faker.name.lastName(); },
  email() { return faker.internet.email(); },
  birthDay() { return faker.date.past(); },
  salary() { return faker.finance.amount(); }
});
