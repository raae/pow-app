const createError = require("http-errors")

module.exports = () => {
  return {
    onError: (handler) => {
      let error = handler.error

      if (!createError.isHttpError(error)) {
        error = createError.InternalServerError(error.message)
      }

      const { statusCode, expose, message } = error

      console.warn("httpErrorHandler:", error.message)

      handler.response = {
        statusCode,
        body: {
          error: {
            statusCode,
            ...(expose && { message }),
          },
        },
      }
    },
  }
}
