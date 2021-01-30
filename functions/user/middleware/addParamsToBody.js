module.exports = () => {
  return {
    before: ({ event }) => {
      event.body = {
        ...event.body,
        ...event.queryStringParameters,
      }
    },
  }
}
