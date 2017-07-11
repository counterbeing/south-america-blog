import DS from 'ember-data';
const { String: { pluralize } } = Ember;


export default DS.JSONAPIAdapter.extend({
  suffix: '.json',

  // pathForType: function(type) {
  //   debugger
  //   return this._super(type) + this.get('suffix');
  // }
  buildURL: function(modelName, id, snapshot, requestType, query) {
    if(id) {
      let pluralModel = pluralize(modelName)
      return `/${pluralModel}/${id}.json`
    } else {
      return this._super(modelName, id, snapshot, requestType, query) +
        this.get('suffix')
    }
  }
});
