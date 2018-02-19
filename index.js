const glob = require('glob')

const { before, after } = require('./src/middleware')

const App = {
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

  beforeRequest: before,
  afterResponse: after
}

// auto-require triggers, etc
const types = ['triggers', 'searches', 'creates', 'resources']
types.forEach(t => {
  const g = glob.GlobSync(`src/${t}/*.js`)
  const mods = g.found.map(m => require('./' + m))
  const res = {}

  mods.forEach(m => {
    res[m.key] = m
  })

  App[t] = res
})

// Finally, export the app.
module.exports = App
