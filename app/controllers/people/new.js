import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    save() {
      this.get('model').save().then((person) => {
        this.transitionToRoute('person.show', person);
      });
    },
    cancel() {
      this.transitionToRoute('people');
    }
  }
});
