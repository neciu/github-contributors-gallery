import Ember from 'ember';
import authenticatedRoute from '../mixins/authenticated-route';
import authenticatedRequest from '../utils/authenticated-request'
import endpoints from '../utils/endpoints'
import dataSerializers from '../utils/data-serializers'

export default Ember.Route.extend(authenticatedRoute, {
  //model: function () {
  //  authenticatedRequest(endpoints.allRepositories(), 'GET')
  //    .then(function (repositories) {
  //
  //    });
  //},

  setupController: function (controller, model) {
    if (this.controller.get('contributors').length) {
      return;
    }

    authenticatedRequest(endpoints.allRepositories(), 'GET')
      .then(function (rawRepositories) {
        var repositories = rawRepositories.map(function (repositoryData) {
          return dataSerializers.repository(controller.store, repositoryData);
        });
        repositories.forEach(function (repository) {
          authenticatedRequest(endpoints.repositoryStatistics(repository.get('ownerLogin'), repository.get('name')), 'GET')
            .then(function (response) {
              response.forEach(function (contribution) {
                var contributor = dataSerializers.contributor(controller.store, contribution.author);
                contributor.set('numberOfContributions', contributor.get('numberOfContributions') + contribution.total);
                controller.get('contributors').add(contributor);
                authenticatedRequest(endpoints.contributor(contributor.get('login')), 'GET')
                  .then(function (response) {
                    dataSerializers.contributor(controller.store, response);
                  });
              });
            })
        });
      });


    //var contributors = model.map(function (contributorData) {
    //  return dataSerializers.contributor(controller.store, contributorData)
    //});
    //controller.set('contributors', contributors);
    //
    //contributors.forEach(function (contributor) {
    //  authenticatedRequest(endpoints.contributor(contributor.get('login')), 'GET')
    //    .then(function (response) {
    //      dataSerializers.contributor(controller.store, response);
    //    });
    //});
  }
});
