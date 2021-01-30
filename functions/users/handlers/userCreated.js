const format = require("date-fns/format")
const createError = require("http-errors")

const Userbase = require("../utils/userbase")
const ConvertKit = require("../utils/convertkit")

module.exports = async ({ body, context }) => {
  const userbase = Userbase(context.USERBASE_ADMIN_API_ACCESS_TOKEN)
  const convertKit = ConvertKit(context.CONVERTKIT_API_SECRET)

  try {
    const userbaseUser = await userbase.getUserbaseUser(body)
    const convertKitSubscriber = await convertKit.upsertConvertKitSubscriber({
      formId: context.CONVERTKIT_FORM_ID,
      email: userbaseUser.email,
      fields: {
        userbase_id: userbaseUser.userId,
        user_created: format(new Date(userbaseUser.creationDate), "yyyy-MM-dd"),
      },
    })
    const userbaseUserId = userbaseUser.userId
    const convertKitSubscriberId = `${convertKitSubscriber.id}`

    await userbase.updateUserbaseProtectedProfile({
      userbaseUserId,
      protectedProfile: { convertKitId: `${convertKitSubscriberId}` },
    })

    return {
      statusCode: 200,
      body: {
        userbaseUserId,
        convertKitSubscriberId,
      },
    }
  } catch (error) {
    const { message } = error.response?.data || error.request?.data || error
    throw new createError.InternalServerError(message)
  }
}
