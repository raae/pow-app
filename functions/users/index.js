const Joi = require("joi")
const createError = require("http-errors")
const {
  getUserbaseUser,
  updateUserbaseProtectedProfile,
  verifyUserbaseAuthToken,
} = require("./utils/userbase")
const { addConvertKitSubscriber } = require("./utils/convertkit")

const validateHttpMethod = ({ httpMethod }, validHttpMethods) => {
  if (!validHttpMethods.includes(httpMethod)) {
    throw new createError.BadRequest(
      `Only ${validHttpMethods} requests allowed`
    )
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
  } = schema.validate(JSON.parse(body))

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

exports.handler = async (event) => {
  try {
    validateHttpMethod(event, ["POST"])
    const { userbaseAuthToken, userbaseId } = validateSchema(event)

    await validateUserbaseAuthToken({ userbaseAuthToken, userbaseId })

    const result = await handleUserCreated({ userbaseId })

    return {
      statusCode: 200,
      body: JSON.stringify(result),
    }
  } catch (error) {
    if (!createError.isHttpError(error)) {
      error = createError.InternalServerError(error.message)
    }

    const { statusCode, expose, message } = error

    console.warn(message)

    const body = {
      error: {
        statusCode,
        ...(expose && { message }),
      },
    }

    return {
      statusCode,
      body: JSON.stringify(body),
    }
  }
}
