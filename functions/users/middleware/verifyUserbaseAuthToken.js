const createError = require("http-errors")

const Userbase = require("../utils/userbase")

module.exports = () => {
  return {
    before: async ({ event }) => {
      const { body, context } = event
      const userbase = Userbase(context.USERBASE_ADMIN_API_ACCESS_TOKEN)

      try {
        await userbase.verifyUserbaseAuthToken(body)
      } catch (error) {
        const { message } = error.response?.data || error.request?.data || error
        throw new createError.Unauthorized("Userbase: " + message)
      }
    },
  }
}
