import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('destinations')
  this.route('destination', { path: '/destination/:destination_id' })
});

export default Router;
