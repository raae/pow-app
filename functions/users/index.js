const middy = require("@middy/core")
const jsonBodyParser = require("@middy/http-json-body-parser")
const httpErrorHandler = require("@middy/http-error-handler")
const Joi = require("joi")
const createError = require("http-errors")
const validateHttpMethod = require("./middleware/validateHttpMethod")
const validateJoiParamsSchema = require("./middleware/validateJoiParamsSchema")
const validateJoiBodySchema = require("./middleware/validateJoiBodySchema")

const {
  getUserbaseUser,
  updateUserbaseProtectedProfile,
  verifyUserbaseAuthToken,
} = require("./utils/userbase")
const { addConvertKitSubscriber } = require("./utils/convertkit")

const validateUserbaseAuthToken = async ({ userbaseAuthToken, userbaseId }) => {
  try {
    const { userId: validUserbaseId } = await verifyUserbaseAuthToken({
      userbaseAuthToken,
    })

    if (validUserbaseId !== userbaseId) {
      throw Error("userbaseAuthToken / userbaseId mismatch")
    }
  } catch (error) {
    const { message } = error.response?.data || error.request?.data || error
    throw new createError.Unauthorized("Userbase: " + message)
  }
}

const handleUserCreated = async ({ userbaseId }) => {
  try {
    const { email, creationDate } = await getUserbaseUser({ userbaseId })
    const { id: convertKitId } = await addConvertKitSubscriber({
      email,
      userbaseId,
      creationDate,
    })

    await updateUserbaseProtectedProfile({
      userbaseId,
      protectedProfile: { convertKitId: `${convertKitId}` },
    })

    return {
      userbaseId,
      convertKitId,
    }
  } catch (error) {
    const { message } = error.response?.data || error.request?.data || error
    throw new createError.InternalServerError(message)
  }
}

const usersHandler = async (event) => {
  const { userbaseAuthToken, userbaseId } = event.body
  await validateUserbaseAuthToken({ userbaseAuthToken, userbaseId })
  const result = await handleUserCreated({ userbaseId })
  return {
    statusCode: 200,
    body: JSON.stringify(result),
  }
}

const handler = middy(usersHandler)
  .use(validateHttpMethod("POST"))
  .use(
    validateJoiParamsSchema({
      context: Joi.string()
        .valid("development", "preview_deploy", "production")
        .required(),
    })
  )
  .use(jsonBodyParser()) // parses the request body when it's a JSON and converts it to an object
  .use(
    validateJoiBodySchema({
      userbaseId: Joi.string().required(),
      userbaseAuthToken: Joi.string().required(),
    })
  )
  .use(httpErrorHandler()) // handles common http errors and returns proper responses

module.exports = { handler }
