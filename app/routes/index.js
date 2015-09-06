import Ember from 'ember';
import authenticatedRoute from '../mixins/authenticated-route';
import endpoints from '../utils/endpoints'
import dataSerializers from '../utils/data-serializers'

export default Ember.Route.extend(authenticatedRoute, {
  model: function () {
    return Ember.$.get(endpoints.contributors());
  },

  setupController: function (controller, model) {
    var contributors = model.map(function (contributorData) {
      return dataSerializers.contributor(controller.store, contributorData)
    });
    controller.set('contributors', contributors);
  }
});
