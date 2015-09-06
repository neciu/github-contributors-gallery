import Ember from 'ember';
import authenticatedRequest from '../../utils/authenticated-request'
import endpoints from '../../utils/endpoints'
import dataSerializers from '../../utils/data-serializers'

export default Ember.Route.extend({
  model: function (params) {
    return Ember.RSVP.hash({
      repository: authenticatedRequest(endpoints.repository(params.login, params.name), 'GET'),
      contributors: authenticatedRequest(endpoints.repositoryContributors(params.login, params.name), 'GET')
    });
  },

  setupController: function (controller, model) {
    controller.setProperties({
      repository: dataSerializers.repository(controller.store, model.repository),
      contributors: model.contributors.map(function (contributorData) {
        return dataSerializers.contributor(controller.store, contributorData);
      })
    });
  }
});
