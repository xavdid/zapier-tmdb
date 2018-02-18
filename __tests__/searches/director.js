const zapier = require('zapier-platform-core')

// Use this to make test calls into your app:
const App = require('../../index')
const appTester = zapier.createAppTester(App)
zapier.tools.env.inject('.env')

it('should run search.director', () => {
  const bundle = {
    inputData: { id: '332210', single: true },
    authData: { api_key: process.env.TMDB_API_KEY }
  }

  return appTester(App.searches.director.operation.perform, bundle).then(
    results => {
      expect(results.length).toEqual(2)
      const result = results[0]

      expect(result.profile_url).toBeTruthy()
    }
  )
})

it('should run search.director', () => {
  const bundle = {
    inputData: { id: '332210' },
    authData: { api_key: process.env.TMDB_API_KEY }
  }

  return appTester(App.searches.director.operation.perform, bundle).then(
    results => {
      results = JSON.parse(results)
      expect(results.length).toEqual(2)
      const result = results[0]

      expect(result.profile_url).toBeTruthy()
    }
  )
})
