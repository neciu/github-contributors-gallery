import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function () {
  this.route('contributor', function () {
    this.route('index', {path: ':login'});
  });
});

export default Router;
