const zapier = require('zapier-platform-core')

// Use this to make test calls into your app:
const App = require('../../index')
const appTester = zapier.createAppTester(App)
zapier.tools.env.inject('.env')

const validateDirector = d => {
  expect(d.id).toBeTruthy()
  expect(d.profile_url).toBeTruthy()
  expect(d.profile_url.slice(8).includes('//')).toBeFalsy()
}

it('should run creates.director in single mode', () => {
  const bundle = {
    inputData: { id: '332210', single: true },
    authData: { api_key: process.env.TMDB_API_KEY }
  }

  return appTester(App.creates.director.operation.perform, bundle).then(
    result => {
      validateDirector(result)
    }
  )
})

it('should run creates.director', () => {
  const bundle = {
    inputData: { id: '332210' },
    authData: { api_key: process.env.TMDB_API_KEY }
  }

  return appTester(App.creates.director.operation.perform, bundle).then(
    results => {
      results = JSON.parse(results.jsonStr)
      expect(results.length).toEqual(2)
      const result = results[0]

      validateDirector(result)
    }
  )
})
