import Ember from 'ember';

export default Ember.Controller.extend({
  contributors: Ember.Set.create(),

  contributorsChanged: function() {
    this.set('filteredContributors', this.get('contributors').toArray());
  }.observes('contributors.[]'),

  numberOfFollowersFilterAmountInput: undefined,
  numberOfFollowersFilterAmount: undefined,
  numberOfPublicRepositoriesFilterAmountInput: undefined,
  numberOfPublicRepositoriesFilterAmount: undefined,
  numberOfPublicGistsAmountInput: undefined,
  numberOfPublicGistsAmount: undefined,
  numberOfContributionsAmountInput: undefined,
  numberOfContributionsAmount: undefined,

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

  numberOfContributionsAmountInputChanged: function () {
    this.validateInput('numberOfContributionsAmountInput', 'numberOfContributionsAmount');
  }.observes('numberOfContributionsAmountInput'),

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
    function contributionsCondition(contributor) {
      if (controller.get('numberOfContributionsAmount')) {
        return controller.get('numberOfContributionsAmount') <= contributor.get('numberOfContributions');
      } else {
        return true;
      }
    }

    var filteredContributors = this.get('contributors').filter(function (contributor) {
      return followersCondition(contributor) && repositoriesCondition(contributor) && gistsCondition(contributor) && contributionsCondition(contributor);
    });

    this.set('filteredContributors', filteredContributors);

  }.observes('numberOfFollowersFilterAmount', 'numberOfPublicRepositoriesFilterAmount', 'numberOfPublicGistsAmount', 'numberOfContributionsAmount')
});
