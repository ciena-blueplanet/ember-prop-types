module.exports = function (environment) {
  var ENV = {
    APP: {},
    rootURL: '/',
    EmberENV: {
      FEATURES: {}
    },
    googleFonts: [
      'Roboto:300'
    ],
    environment: environment,
    locationType: 'auto',
    modulePrefix: 'dummy',

    'ember-prop-types': {
      spreadProperty: 'options',
      throwErrors: false,
      validateOnUpdate: true
    }
  }

  switch (environment) {
    case 'production':
      ENV.rootURL = '/ember-prop-types'
      break

    case 'test':
      // Testem prefers this...
      ENV.locationType = 'none'

      // keep test console output quieter
      ENV.APP.LOG_ACTIVE_GENERATION = false
      ENV.APP.LOG_VIEW_LOOKUPS = false

      ENV.APP.rootElement = '#ember-testing'
      break
  }

  return ENV
}
