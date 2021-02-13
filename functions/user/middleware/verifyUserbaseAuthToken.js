const createError = require("http-errors")

const Userbase = require("../services/userbase")

module.exports = () => {
  return async ({ body, context }, response, next) => {
    const userbase = Userbase(context.USERBASE_ADMIN_API_ACCESS_TOKEN)

    try {
      await userbase.verifyUserbaseAuthToken(body)
      next()
    } catch (error) {
      const { message } = error.response?.data || error.request?.data || error
      next(new createError.Unauthorized("Userbase: " + message))
    }
  }
}
