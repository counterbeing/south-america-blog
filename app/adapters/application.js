import DS from 'ember-data';

export default DS.JSONAPIAdapter.extend({
  suffix: '.json',
  
  pathForType: function(type) {
    return this._super(type) + this.get('suffix');
  }
});
