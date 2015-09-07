import Ember from 'ember';

export default Ember.Controller.extend({
  contributors: Ember.Set.create(),
  numberOfFollowersFilterAmountInput: undefined,
  numberOfFollowersFilterAmount: undefined,
  numberOfPublicRepositoriesFilterAmountInput: undefined,
  numberOfPublicRepositoriesFilterAmount: undefined,
  numberOfPublicGistsAmountInput: undefined,
  numberOfPublicGistsAmount: undefined,

  validateInput: function(inputName, valueName) {
    var value = this.get(inputName);
    if(!isNaN(value) && parseInt(value) && parseInt(value) > 0) {
      this.set(valueName, value);
      this.set(inputName, value);
    } else {
      this.set(valueName, undefined);
      this.set(inputName, undefined);
    }
  },

  numberOfFollowersFilterAmountInputChanged: function () {
    this.validateInput('numberOfFollowersFilterAmountInput', 'numberOfFollowersFilterAmount');
  }.observes('numberOfFollowersFilterAmountInput'),

  numberOfPublicRepositoriesFilterAmountInputChanged: function () {
    this.validateInput('numberOfPublicRepositoriesFilterAmountInput', 'numberOfPublicRepositoriesFilterAmount');
  }.observes('numberOfPublicRepositoriesFilterAmountInput'),

  numberOfPublicGistsAmountInputChanged: function () {
    this.validateInput('numberOfPublicGistsAmountInput', 'numberOfPublicGistsAmount');
  }.observes('numberOfPublicGistsAmountInput'),

  filterCriteriaChanged: function () {
    var controller = this;
    function followersCondition(contributor) {
      if (controller.get('numberOfFollowersFilterAmount')) {
        return controller.get('numberOfFollowersFilterAmount') <= contributor.get('numberOfFollowers');
      } else {
        return true;
      }
    }
    function repositoriesCondition(contributor) {
      if (controller.get('numberOfPublicRepositoriesFilterAmount')) {
        return controller.get('numberOfPublicRepositoriesFilterAmount') <= contributor.get('numberOfPublicRepositories');
      } else {
        return true;
      }
    }
    function gistsCondition(contributor) {
      if (controller.get('numberOfPublicGistsAmount')) {
        return controller.get('numberOfPublicGistsAmount') <= contributor.get('numberOfPublicGists');
      } else {
        return true;
      }
    }

    var filteredContributors = this.get('contributors').filter(function (contributor) {
      return followersCondition(contributor) && repositoriesCondition(contributor) && gistsCondition(contributor);
    });

    this.set('filteredContributors', filteredContributors);

  }.observes('numberOfFollowersFilterAmount', 'numberOfPublicRepositoriesFilterAmount', 'numberOfPublicGistsAmount')
});
