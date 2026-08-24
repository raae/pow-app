const createError = require("http-errors")

module.exports = (property, schema) => {
  return (request, response, next) => {
    const { error } = schema.validate(request[property], {
      allowUnknown: true,
    })
    if (error) {
      next(new createError.BadRequest(error.message))
    } else {
      next()
    }
  }
}
