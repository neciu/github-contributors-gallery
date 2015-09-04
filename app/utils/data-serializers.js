import Ember from 'ember';
import upsert from './upsert';

export default {
  contributor: function (store, rawData) {
    return upsert(store, 'contributor', {
      id: rawData.id,
      login: rawData.login,
      avatarUrl: rawData.avatar_url


      //login": "antingshen",
      //"id": 2498332,
      //"avatar_url": "https://avatars.githubusercontent.com/u/2498332?v=3",
      //"gravatar_id": "",
      //"url": "https://api.github.com/users/antingshen",
      //"html_url": "https://github.com/antingshen",
      //"followers_url": "https://api.github.com/users/antingshen/followers",
      //"following_url": "https://api.github.com/users/antingshen/following{/other_user}",
      //"gists_url": "https://api.github.com/users/antingshen/gists{/gist_id}",
      //"starred_url": "https://api.github.com/users/antingshen/starred{/owner}{/repo}",
      //"subscriptions_url": "https://api.github.com/users/antingshen/subscriptions",
      //"organizations_url": "https://api.github.com/users/antingshen/orgs",
      //"repos_url": "https://api.github.com/users/antingshen/repos",
      //"events_url": "https://api.github.com/users/antingshen/events{/privacy}",
      //"received_events_url": "https://api.github.com/users/antingshen/received_events",
      //"type": "User",
      //"site_admin": false
    });
  },

  repository: function (store, rawData) {
    return upsert(store, 'contributor', {
      id: rawData.id,
      name: rawData.name,
      fullName: rawData.full_name
    });
  }
}
