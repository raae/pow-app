const Joi = require("joi")
const createError = require("http-errors")

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
