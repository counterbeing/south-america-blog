module.exports = {
  publicPath:
    process.env.NODE_ENV === 'production' ? process.env.PUBLIC_PATH : '/',
  publicDomain: process.env.PUBLIC_DOMAIN,
}
