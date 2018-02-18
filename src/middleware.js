module.exports = {
  before: [
    // add api key to requests
    (request, z, bundle) => {
      request.params.api_key = bundle.authData.api_key
      return request
    }
  ],
  after: [
    // must be 200
    (response, z, bundle) => {
      if (response.status !== 200) {
        throw new Error(`Unexpected status code ${response.status}`)
      }
      return response
    },
    // auto parse json
    (response, z, bundle) => {
      response.json = z.JSON.parse(response.content)
      return response
    }
  ]
}
