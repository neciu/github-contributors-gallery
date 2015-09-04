import Ember from 'ember';
import endpoints from '../../utils/endpoints'
import dataSerializers from '../../utils/data-serializers'

export default Ember.Route.extend({
  model: function (params) {
    return Ember.RSVP.hash({
      contributor: Ember.$.get(endpoints.contributor(params.login)),
      repositories: Ember.$.get(endpoints.contributorsRepositories(params.login))
    });
  },

  setupController: function (controller, model) {
    console.log(model);

    controller.setProperties({
      contributor: dataSerializers.contributor(controller.store, model.contributor),
      repositories: model.repositories.map(function(repositoryData){
        return dataSerializers.repository(controller.store, repositoryData);
      })
    });
  }
});
