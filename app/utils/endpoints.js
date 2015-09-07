import Ember from 'ember';

var GITHUB_API_ROOT = 'https://api.github.com/';
var GITHUB_ORGANIZATION_NAME = 'angular';

export default {
  allRepositories: function() {
    return GITHUB_API_ROOT + 'users/' + GITHUB_ORGANIZATION_NAME + '/repos';
  },
  repositoryStatistics: function(ownerLogin, name) {
    return GITHUB_API_ROOT + 'repos/' + ownerLogin + '/' + name + '/stats/contributors';
  },
  contributors: function () {
    return GITHUB_API_ROOT + 'orgs/' + GITHUB_ORGANIZATION_NAME + '/members';
  },
  contributor: function (login) {
    return GITHUB_API_ROOT + 'users/' + login;
  },
  contributorsRepositories: function (login) {
    return GITHUB_API_ROOT + 'users/' + login + '/repos?type=all';
  },
  repository: function (ownerLogin, name) {
    return GITHUB_API_ROOT + 'repos/' + ownerLogin + '/' + name;
  },
  repositoryContributors: function (ownerLogin, name) {
    return GITHUB_API_ROOT + 'repos/' + ownerLogin + '/' + name + '/contributors';
  }
}
