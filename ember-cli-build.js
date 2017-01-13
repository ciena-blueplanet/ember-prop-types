/* global require, module */
var EmberAddon = require('ember-cli/lib/broccoli/ember-addon')

module.exports = function (defaults) {
  var app = new EmberAddon(defaults, {
    'babel': {
      optional: ['es6.spec.symbols'],
      includePolyfill: true
    },
    'ember-cli-mocha': {
      useLintTree: false
    },
    'ember-prism': {
      components: [
        'handlebars',
        'javascript'
      ],
      theme: 'okaidia'
    }
  })

  if (app.env === 'test') {
    ;[
      'bower_components/sinon-chai/lib/sinon-chai.js'
    ].forEach((path) => {
      app.import(path, {type: 'test'})
    })
  }

  return app.toTree()
}
