import Ember from 'ember';

import Component from '@ember/component'
import { computed } from '@ember/object'
// import { inject } from '@ember/service'
// import { alias } from '@ember/object/computed';

export default Component.extend({
  locationManager: Ember.inject.service(),

  next: computed('locationManager.next', function() {
    // console.log('computing next in nav button ' + this.get('locationManager.next'))
    return this.get('locationManager.next')
  }),

  // next: Ember.computed.alias('locationManager.next'),
  previous: computed.alias('locationManager.previous'),
})
