const Joi = require("joi")
const createError = require("http-errors")
const {
  getUserbaseUser,
  updateUserbaseProtectedProfile,
  verifyUserbaseAuthToken,
} = require("./utils/userbase")
const { addConvertKitSubscriber } = require("./utils/convertkit")

const validateHttpMethod = ({ httpMethod }) => {
  if (httpMethod !== "POST") {
    throw new createError.BadRequest("Only POST requests allowed")
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
    validateHttpMethod(event)
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
    const body = {
      error: {
        statusCode,
        message: expose && message,
      },
    }

    console.warn(message)

    return {
      statusCode,
      body: JSON.stringify(body),
    }
  }
}
