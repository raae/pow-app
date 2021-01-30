const createError = require("http-errors")

module.exports = () => {
  return (error, request, response, next) => {
    if (!createError.isHttpError(error)) {
      error = createError.InternalServerError(error.message)
    }

    const { statusCode, expose, message } = error

    response.status(statusCode).json({
      error: {
        statusCode,
        ...(expose && { message }),
      },
    })
  }
}
