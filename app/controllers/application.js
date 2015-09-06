import Ember from 'ember';

export default Ember.Controller.extend({
  accessToken: null,

  accessTokenChanged: function () {
    console.info('ACCESS TOKEN CHANGED: ' + this.get('accessToken'));
    localStorage.setItem('accessToken', this.get('accessToken'));
  }.observes('accessToken'),

  loadAccessTokenFromLocalStorage: function () {
    this.set('accessToken', localStorage.getItem('accessToken'));
  }.on('init'),

  isUserSignedIn: function () {
    return !!this.get('accessToken');
  }
});
