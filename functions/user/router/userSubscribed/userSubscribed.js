const format = require("date-fns/format")
const createError = require("http-errors")

const Userbase = require("../../utils/userbase")
const ConvertKit = require("../../utils/convertkit")

module.exports = async ({ body, context }) => {
  const userbase = Userbase(context.USERBASE_ADMIN_API_ACCESS_TOKEN)
  const convertKit = ConvertKit(context.CONVERTKIT_API_SECRET)

  try {
    const userbaseUserId = body.client_reference_id
    const userbaseUser = await userbase.getUserbaseUser({
      userbaseUserId,
    })

    let convertKitSubscriberId = userbaseUser?.protectedProfile?.convertKitId
    let message = ""

    if (!convertKitSubscriberId) {
      var convertKitSubscriber = await convertKit.addConvertKitSubscriber({
        formId: context.CONVERTKIT_FORM_ID,
        email: userbaseUser.email,
        fields: {
          userbase_id: userbaseUser.userId,
          user_created: format(
            new Date(userbaseUser.creationDate),
            "yyyy-MM-dd"
          ),
          user_subscribed: format(new Date(), "yyyy-MM-dd"),
        },
      })

      message = "ConvertKit Subscriber added"
      convertKitSubscriberId = convertKitSubscriber.id

      await userbase.updateUserbaseProtectedProfile({
        userbaseUserId,
        protectedProfile: { convertKitId: `${convertKitSubscriberId}` },
      })
    } else {
      const convertKitSubscriber = await convertKit.updateConvertKitSubscriber({
        subscriberId: convertKitSubscriberId,
        email: userbaseUser.email,
        fields: {
          userbase_id: userbaseUser.userId,
          user_subscribed: format(new Date(), "yyyy-MM-dd"),
        },
      })

      message = "ConvertKit Subscriber updated"
      convertKitSubscriberId = convertKitSubscriber.id
    }

    return {
      message,
      userbaseUserId,
      convertKitSubscriberId,
    }
  } catch (error) {
    const { message } = error.response?.data || error.request?.data || error
    throw new createError.InternalServerError(
      "Router/userSubscribed: " + message
    )
  }
}
