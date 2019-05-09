const path = require('path')
const SitemapPlugin = require('sitemap-webpack-plugin').default
const PrerenderSPAPlugin = require('prerender-spa-plugin')
const Renderer = PrerenderSPAPlugin.PuppeteerRenderer
const destinations = require('./src/data/destinations.json')
const paths = destinations.map(d => d.id)
const routes = paths.map(p => `/${p}`) //.slice(-60, -10)

module.exports = {
  publicPath: process.env.PUBLIC_PATH,
  configureWebpack: {
    plugins: [
      new SitemapPlugin(
        [process.env.PUBLIC_DOMAIN, process.env.PUBLIC_PATH].join(''),
        paths,
        {
          fileName: 'sitemap.xml',
          lastMod: true,
          changeFreq: 'yearly',
          priority: '0.5',
        }
      ),
      new PrerenderSPAPlugin({
        staticDir: path.join(__dirname, 'dist'),
        routes: routes,
        renderer: new Renderer({
          maxConcurrentRoutes: 10,
          // headless: false, // Display the browser window when rendering. Useful for debugging.
        }),
      }),
    ],
  },
}
