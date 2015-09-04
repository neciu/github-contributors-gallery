import Ember from 'ember';

var GITHUB_API_ROOT = 'https://api.github.com/';
var GITHUB_ORGANIZATION_NAME = 'angular';

export default {
  contributors: function () {
    return GITHUB_API_ROOT + 'orgs/' + GITHUB_ORGANIZATION_NAME + '/members';
  },
  contributor: function (login) {
    return GITHUB_API_ROOT + 'users/' + login;
  },
  contributorsRepositories: function (login) {
    return GITHUB_API_ROOT + 'users/' + login + '/repos';
  }
}
