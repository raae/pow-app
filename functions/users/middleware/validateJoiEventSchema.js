const createError = require("http-errors")

module.exports = (schema) => {
  return {
    before: ({ event }) => {
      const { error } = schema.validate(event, {
        allowUnknown: true,
      })
      if (error) {
        throw new createError.BadRequest(error.message)
      }
    },
  }
}
