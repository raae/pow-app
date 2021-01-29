const middy = require("@middy/core")
const jsonBodyParser = require("@middy/http-json-body-parser")
const httpErrorHandler = require("@middy/http-error-handler")
const Joi = require("joi")
const createError = require("http-errors")
const {
  getUserbaseUser,
  updateUserbaseProtectedProfile,
  verifyUserbaseAuthToken,
} = require("./utils/userbase")
const { addConvertKitSubscriber } = require("./utils/convertkit")

const validateHttpMethod = (validHttpMethods = []) => {
  // might set default options in config
  return {
    before: ({ event }, next) => {
      if (!validHttpMethods.includes(event.httpMethod)) {
        throw new createError.BadRequest(
          `Only ${validHttpMethods} requests allowed`
        )
      }
    },
  }
}

const validateSchema = ({ body }) => {
  const schema = Joi.object({
    userbaseId: Joi.string().required(),
    userbaseAuthToken: Joi.string().required(),
  })

  const {
    value: { userbaseId, userbaseAuthToken },
    error: schemaError,
  } = schema.validate(body)

  if (schemaError) {
    throw new createError.BadRequest(schemaError.message)
  }

  return { userbaseId, userbaseAuthToken }
}

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
  const { userbaseAuthToken, userbaseId } = validateSchema(event)
  await validateUserbaseAuthToken({ userbaseAuthToken, userbaseId })
  const result = await handleUserCreated({ userbaseId })
  return {
    statusCode: 200,
    body: JSON.stringify(result),
  }
}

const handler = middy(usersHandler)
  .use(validateHttpMethod(["POST"]))
  .use(jsonBodyParser()) // parses the request body when it's a JSON and converts it to an object
  .use(httpErrorHandler()) // handles common http errors and returns proper responses

module.exports = { handler }
