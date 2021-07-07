const createError = require("http-errors")

module.exports = () => {
  return async ({ body, context }, response, next) => {
    if (body.serverlessSecret === context.SERVERLESS_SECRET) {
      next()
    } else {
      next(new createError.Unauthorized("Incorrect POW! Serverless Secret"))
    }
  }
}
