const constants = require('../../constants')

module.exports = {
  key: 'director',
  noun: 'Director',

  display: {
    label: 'Get Director(s) for Movie',
    description: 'Finds the directors'
  },

  operation: {
    inputFields: [
      {
        key: 'id',
        required: true,
        helpText: 'Find the director(s) for the movie with this id'
      },
      {
        key: 'single',
        helpText:
          'If true, only returns the first result. Otherwise, returns a JSON array you need to split in a code step. Defaults to false.',
        type: 'boolean'
      }
    ],
    perform: (z, bundle) => {
      return z
        .request({
          url: `${constants.ROOT_URL}/movie/${bundle.inputData.id}/credits`
        })
        .then(response => {
          const credits = response.json
          const directors = credits.crew.filter(c => c.job === 'Director')

          directors.forEach(d => {
            d.profile_url = `${constants.IMAGE_ROOT}/${d.profile_path}`
          })

          if (bundle.inputData.single) {
            return directors
          } else {
            return JSON.stringify(directors)
          }
        })
    }
  }
}
