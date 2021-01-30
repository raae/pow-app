const middy = require("@middy/core")
const Joi = require("joi")
const format = require("date-fns/format")
const createError = require("http-errors")

const Userbase = require("../utils/userbase")
const ConvertKit = require("../utils/convertkit")

const validateJoiEventSchema = require("../middleware/validateJoiEventSchema")
const verifyUserbaseAuthToken = require("../middleware/verifyUserbaseAuthToken")
const secretsManager = require("../middleware/secretsManager")

const handler = async ({ body, context }) => {
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

const schema = Joi.object({
  httpMethod: Joi.string().valid("POST").required(),
  body: Joi.object({
    userbaseUserId: Joi.string().required(),
    userbaseAuthToken: Joi.string().required(),
    context: Joi.string()
      .valid("development", "deploy-preview", "production")
      .required(),
  }).required(),
})

module.exports = middy(handler)
  .use(validateJoiEventSchema(schema))
  .use(
    secretsManager({
      keys: [
        "USERBASE_ADMIN_API_ACCESS_TOKEN",
        "CONVERTKIT_API_SECRET",
        "CONVERTKIT_FORM_ID",
      ],
      contextPath: "event.body.context",
    })
  )
  .use(verifyUserbaseAuthToken())
