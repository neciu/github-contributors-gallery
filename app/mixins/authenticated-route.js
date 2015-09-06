import Ember from 'ember';

export default Ember.Mixin.create({
  beforeModel: function (transition) {
    if (this.controllerFor('application').isUserSignedIn()) {
      this._super(transition);
    } else {
      transition.abort();
      this.transitionTo('not-authenticated');
    }
  }
});
