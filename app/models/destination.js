import Model from 'ember-data/model'
import attr from 'ember-data/attr'

export default Model.extend({
  latitude: attr(),
  longitude: attr(),
  date: attr(),
})
