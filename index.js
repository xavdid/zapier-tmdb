const MovieSearch = require('./src/searches/movie')
const DirectorSearch = require('./src/searches/director')

const { before, after } = require('./src/middleware')
// We can roll up all our behaviors in an App.
const App = {
  // This is just shorthand to reference the installed dependencies you have. Zapier will
  // need to know these before we can upload
  version: require('./package.json').version,
  platformVersion: require('zapier-platform-core').version,

  authentication: {
    type: 'custom',
    test: { url: 'https://api.themoviedb.org/3/movie/550' },
    fields: [
      {
        key: 'api_key',
        type: 'string',
        required: true,
        helpText:
          'Found on your [settings](https://www.themoviedb.org/settings/api) page.'
      }
    ]
  },

  // beforeRequest & afterResponse are optional hooks into the provided HTTP client
  beforeRequest: before,

  afterResponse: after,

  // If you want to define optional resources to simplify creation of triggers, searches, creates - do that here!
  resources: {},

  // If you want your trigger to show up, you better include it here!
  triggers: {},

  // If you want your searches to show up, you better include it here!
  searches: {
    [MovieSearch.key]: MovieSearch,
    [DirectorSearch.key]: DirectorSearch
  },

  // If you want your creates to show up, you better include it here!
  creates: {}
}

// Finally, export the app.
module.exports = App
