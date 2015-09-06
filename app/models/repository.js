export default DS.Model.extend({
  name: DS.attr('string'),
  fullName: DS.attr('string'),
  ownerLogin: DS.attr('string')
});
