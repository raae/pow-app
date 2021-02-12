const format = require("date-fns/format")

const Userbase = require("../services/userbase")
const ConvertKit = require("../services/convertkit")

module.exports = async ({ userbaseUserId, subscriptionDate }) => {
  const {
    USERBASE_ADMIN_API_ACCESS_TOKEN,
    CONVERTKIT_API_SECRET,
    CONVERTKIT_FORM_ID,
  } = context

  const userbase = Userbase(USERBASE_ADMIN_API_ACCESS_TOKEN)
  const convertKit = ConvertKit(CONVERTKIT_API_SECRET)

  try {
    const userbaseUser = await userbase.getUserbaseUser({ userbaseUserId })

    const convertKitArgs = {
      email: userbaseUser.email,
      fields: {
        userbase_id: userbaseUser.userId,
        user_created: format(new Date(userbaseUser.creationDate), "yyyy-MM-dd"),
        ...(subscriptionDate && {
          user_subscribed: format(subscriptionDate, "yyyy-MM-dd"),
        }),
      },
    }

    if (!userbaseUser?.protectedProfile?.convertKitId) {
      var convertKitSubscriber = await convertKit.addConvertKitSubscriber({
        formId: CONVERTKIT_FORM_ID,
        ...convertKitArgs,
      })

      var message = "ConvertKit Subscriber added"

      await userbase.updateUserbaseProtectedProfile({
        userbaseUserId,
        protectedProfile: { convertKitId: `${convertKitSubscriber.id}` },
      })
    } else {
      var convertKitSubscriber = await convertKit.updateConvertKitSubscriber({
        subscriberId: convertKitSubscriberId,
        ...convertKitArgs,
      })

      var message = "ConvertKit Subscriber updated"
    }

    return {
      message,
      userbaseUserId: userbaseUser.userId,
      convertKitSubscriberId: convertKitSubscriber.id,
    }
  } catch (error) {
    const { message } = error.response?.data || error.request?.data || error
    throw new createError.InternalServerError("Router/userCreated: " + message)
  }
}
