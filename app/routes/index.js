import Ember from 'ember';
import authenticatedRoute from '../mixins/authenticated-route';
import authenticatedRequest from '../utils/authenticated-request'
import endpoints from '../utils/endpoints'
import dataSerializers from '../utils/data-serializers'

export default Ember.Route.extend(authenticatedRoute, {
  model: function () {
    return authenticatedRequest(endpoints.contributors(), 'GET');
  },

  setupController: function (controller, model) {
    var contributors = model.map(function (contributorData) {
      return dataSerializers.contributor(controller.store, contributorData)
    });
    controller.set('contributors', contributors);

    contributors.forEach(function (contributor) {
      authenticatedRequest(endpoints.contributor(contributor.get('login')), 'GET')
        .then(function (response) {
          dataSerializers.contributor(controller.store, response);
        });
    });
  }
});
