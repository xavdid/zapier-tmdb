const zapier = require('zapier-platform-core')

// Use this to make test calls into your app:
const App = require('../../index')
const appTester = zapier.createAppTester(App)
zapier.tools.env.inject('.env')

describe('search', () => {
  it('should run search.movie', () => {
    const bundle = {
      inputData: { id: '284054' },
      authData: { api_key: process.env.TMDB_API_KEY }
    }

    return appTester(App.creates.movie.operation.perform, bundle).then(
      result => {
        expect(result.id).toBeTruthy()
        expect(result.release_date).toEqual('2018-02-16') // the US release date, default is the international one
        expect(result.poster_url).toBeTruthy()
        expect(result.poster_url.slice(8).includes('//')).toBeFalsy()
      }
    )
  })

  it('should run search.movie for those without release dates', () => {
    // this could break in the future
    const bundle = {
      inputData: { id: '587682' },
      authData: { api_key: process.env.TMDB_API_KEY }
    }

    return appTester(App.creates.movie.operation.perform, bundle).then(
      result => {
        expect(result.id).toBeTruthy()
        expect(result.release_date).toEqual('2019-03-12')
        expect(result.poster_url).toBeTruthy()
        expect(result.poster_url.slice(8).includes('//')).toBeFalsy()
      }
    )
  })
})
