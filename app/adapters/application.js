import DS from 'ember-data';
// import Ember from 'ember'
import { pluralize } from 'ember-inflector'

export default DS.JSONAPIAdapter.extend({
  suffix: '.json',
  buildURL: function(modelName, id, snapshot, requestType, query) {
    if(id) {
      let pluralModel = pluralize(modelName)
      return `/sa/${pluralModel}/${id}.json`
    } else {
      let prefix = this._super(modelName, id, snapshot, requestType, query)
      let suffix = this.get('suffix')
      let combined =  '/sa' + prefix + suffix
      return combined
    }
  }
});
