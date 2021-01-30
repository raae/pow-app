const createError = require("http-errors")

module.exports = () => {
  return {
    onError: (handler) => {
      const error = handler.error

      if (!createError.isHttpError(error)) {
        error = createError.InternalServerError(error.message)
      }

      const { statusCode, expose, message } = error

      console.warn("httpErrorHandler:", error.message)

      const body = {
        error: {
          statusCode,
          ...(expose && { message }),
        },
      }

      handler.response = {
        statusCode,
        body: JSON.stringify(body),
      }
    },
  }
}
