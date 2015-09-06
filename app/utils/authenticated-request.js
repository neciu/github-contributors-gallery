import Ember from 'ember';

export default function (url, method) {
  return Ember.$.ajax({
    url: url,
    type: method,
    beforeSend: function (xhr) {
      xhr.setRequestHeader('Authorization', 'Token ' + localStorage.getItem('accessToken'));
    }
  });
}
