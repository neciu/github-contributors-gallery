import Ember from 'ember';
import environment from '../config/environment';

export default Ember.Route.extend({
  beforeModel: function (transition) {
    this.set('code', transition.queryParams.code);
    this._super(transition);
  },

  setupController: function () {
    var route = this;
    Ember.$
      .get('http://localhost:3000/auth/', {
        client_id: environment.githubApplicationClientId,
        code: this.get('code')
      })
      .then(function (response) {
        route.controllerFor('application').set('accessToken', response);
      });
  }
});
