import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    save(){
      this.attrs.save();
    },
    cancel(){
      this.attrs.cancel();
    }
  }
});
