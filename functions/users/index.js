const middy = require("@middy/core")
const jsonBodyParser = require("@middy/http-json-body-parser")
const httpErrorHandler = require("@middy/http-error-handler")
const Joi = require("joi")
const format = require("date-fns/format")
const createError = require("http-errors")
const validateHttpMethod = require("./middleware/validateHttpMethod")
const validateJoiBodySchema = require("./middleware/validateJoiBodySchema")
const addParamsToBody = require("./middleware/addParamsToBody")
const secretsManager = require("./middleware/secretsManager")

const Userbase = require("./utils/userbase")
const ConvertKit = require("./utils/convertkit")

const verifyUserbaseAuthToken = () => {
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

const handleUserCreated = async (body, context) => {
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
      userbaseUserId,
      convertKitSubscriberId,
    }
  } catch (error) {
    const { message } = error.response?.data || error.request?.data || error
    throw new createError.InternalServerError(message)
  }
}

const userCreatedHandler = async ({ body, context }) => {
  const result = await handleUserCreated(body, context)
  return {
    statusCode: 200,
    body: JSON.stringify(result),
  }
}

const handler = middy(userCreatedHandler)
  .use(validateHttpMethod("POST"))
  .use(jsonBodyParser()) // parses the request body when it's a JSON and converts it to an object
  .use(addParamsToBody())
  .use(
    validateJoiBodySchema({
      userbaseUserId: Joi.string().required(),
      userbaseAuthToken: Joi.string().required(),
      context: Joi.string()
        .valid("development", "deploy-preview", "production")
        .required(),
    })
  )
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
  .use(httpErrorHandler()) // handles common http errors and returns proper responses

module.exports = { handler }
