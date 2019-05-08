import EmberRouter from '@ember/routing/router'
import config from './config/environment'

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL,
})

Router.map(function() {
  this.route('destinations')
  this.route('destination', { path: '/destination/:destination_id' })
})

export default Router
