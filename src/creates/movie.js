const constants = require('../constants')

module.exports = {
  key: 'movie',
  noun: 'Movie',

  display: {
    label: 'Get Movie Details',
    description: 'Populates Movie Details.',
    important: true
  },

  operation: {
    inputFields: [
      {
        key: 'id',
        required: true,
        helpText: 'Find the Movie with this id'
      },
      {
        key: 'region',
        helpText:
          "What region should we fetch the release date for? Should be a [two letter country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2). Defaults to `US` if blank or supplied region isn't found"
      }
    ],
    perform: (z, bundle) => {
      return z
        .request({
          url: `${constants.ROOT_URL}/movie/${bundle.inputData.id}`,
          params: { append_to_response: 'release_dates' }
        })
        .then(response => {
          let movieInfo = response.json

          const region = bundle.inputData.region || 'US'
          const regionReleases =
            movieInfo.release_dates.results.find(
              d => d.iso_3166_1 === region
            ) || []

          const release = regionReleases.release_dates.find(r => r.type === 3)

          if (release) {
            movieInfo.release_date = release.release_date.slice(0, 10)
          }

          return {
            id: movieInfo.id,
            title: movieInfo.title,
            poster_url: `${constants.IMAGE_ROOT}${movieInfo.poster_path}`,
            release_date: movieInfo.release_date
          }
        })
    },

    sample: {
      id: 284054,
      title: 'Black Panther',
      poster_url: `${constants.IMAGE_ROOT}/bLBUCtMQGJclH36clliPLmljMys.jpg`,
      release_date: '2018-02-16'
    }

    // outputFields: [{ key: 'id', label: 'ID' }, { key: 'name', label: 'Name' }]
  }
}
