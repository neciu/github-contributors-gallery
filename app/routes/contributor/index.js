import Ember from 'ember';
import authenticatedRequest from '../../utils/authenticated-request'
import endpoints from '../../utils/endpoints'
import dataSerializers from '../../utils/data-serializers'

export default Ember.Route.extend({
  model: function (params) {
    return Ember.RSVP.hash({
      contributor: authenticatedRequest(endpoints.contributor(params.login), 'GET'),
      repositories: authenticatedRequest(endpoints.contributorsRepositories(params.login), 'GET')
    });
  },

  setupController: function (controller, model) {
    controller.setProperties({
      contributor: dataSerializers.contributor(controller.store, model.contributor),
      repositories: model.repositories.map(function(repositoryData){
        return dataSerializers.repository(controller.store, repositoryData);
      })
    });
  }
});
