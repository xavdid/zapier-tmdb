const constants = require('../../constants')

module.exports = {
  key: 'movie',
  noun: 'Movie',

  display: {
    label: 'Get Movie Details',
    description: 'Finds a movie.'
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
      },
      {
        key: 'raw',
        helpText:
          'Return raw response instead of formatted, cleaned, and region-aware',
        type: 'boolean'
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
          if (bundle.inputData.raw) {
            return [movieInfo]
          }

          const region = bundle.inputData.region || 'US'
          const regionReleases =
            movieInfo.release_dates.results.find(
              d => d.iso_3166_1 === region
            ) || []
          // console.log(regionReleases)
          const release = regionReleases.release_dates.find(r => r.type === 3)

          if (release) {
            movieInfo.release_date = release.release_date.slice(0, 10)
          }

          return [
            {
              id: movieInfo.id,
              title: movieInfo.title,
              poster_url: `${constants.IMAGE_ROOT}/${movieInfo.poster_path}`,
              release_date: movieInfo.release_date
            }
          ]
        })
    }

    // sample: {
    //   id: 1,
    //   name: 'Test'
    // },

    // outputFields: [{ key: 'id', label: 'ID' }, { key: 'name', label: 'Name' }]
  }
}
