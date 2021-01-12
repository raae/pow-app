const Joi = require("joi")
const {
  getUserbaseUser,
  updateUserbaseProtectedProfile,
  verifyUserbaseAuthToken,
} = require("./utils/userbase")
const { addConvertKitSubscriber } = require("./utils/convertkit")

const created = async ({ userbaseId }) => {
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
      data: {
        userbaseId,
        convertKitId,
        message: "User successfully added to ConvertKit",
      },
    }
  } catch (error) {
    console.warn(error.response || error.request || error)
    return {
      error: { message: "Internal error" },
    }
  }
}

exports.handler = async (event) => {
  const schema = Joi.object({
    userbaseId: Joi.string().required(),
    userbaseAuthToken: Joi.string().required(),
  })

  const {
    value: { userbaseId, userbaseAuthToken },
    error: schemaError,
  } = schema.validate(JSON.parse(event.body))

  if (schemaError) {
    console.warn("Schema Error: ", schemaError)
    return {
      statusCode: 400,
      body: JSON.stringify({ message: schemaError.message }),
    }
  }

  try {
    const { userId: validUserbaseId } = await verifyUserbaseAuthToken({
      userbaseAuthToken,
    })

    if (validUserbaseId !== userbaseId) {
      throw Error("Auth token does not match provided userbaseId")
    }
  } catch (authError) {
    console.warn("Auth Error:", authError.message)
    return {
      statusCode: 401,
      body: JSON.stringify({ message: "Unauthorized" }),
    }
  }

  const result = await created({ userbaseId })

  return {
    statusCode: result.error ? 500 : 200,
    body: JSON.stringify(result),
  }
}
