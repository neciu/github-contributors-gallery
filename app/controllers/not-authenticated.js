import Ember from 'ember';
import environment from '../config/environment';

export default Ember.Controller.extend({
  githubAuthenticationUrl: 'https://github.com/login/oauth/authorize?client_id=' +
  environment.githubApplicationClientId
});
