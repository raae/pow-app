module.exports = () => {
  return {
    before: ({ event }) => {
      event.body = event.body ? JSON.parse(event.body) : {}
    },
    after: ({ response }) => {
      response.body = JSON.stringify(response.body)
    },
    onError: ({ response }) => {
      response.body = JSON.stringify(response.body)
    },
  }
}
