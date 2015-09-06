import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function () {
  this.route('not-authenticated');
  this.route('authenticating');
  this.route('authenticated');
  this.route('contributor', function () {
    this.route('index', {path: ':login/'});
  });
  this.route('repository', function () {
    this.route('index', {path: ':login/:name/'});
  });
});

export default Router;
