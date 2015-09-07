export default DS.Model.extend({
  login: DS.attr('string'),
  avatarUrl: DS.attr('string'),
  numberOfPublicRepositories: DS.attr('number'),
  numberOfPublicGists: DS.attr('number'),
  numberOfFollowers: DS.attr('number'),
  numberOfContributions: DS.attr('number', {defaultValue: 0})
});
