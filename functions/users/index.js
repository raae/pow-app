const Joi = require("joi")
const {
  getUserbaseUser,
  updateUserbaseProtectedProfile,
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
    console.error(error.response || error.request || error)
    return {
      error: { message: "Internal error" },
    }
  }
}

exports.handler = async (event, context) => {
  const schema = Joi.object({
    userbaseId: Joi.string().required(),
    authToken: Joi.string(),
  })

  const { value, error } = schema.validate(JSON.parse(event.body))

  if (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: error.message }),
    }
  }

  const result = await created(value)

  return {
    statusCode: result.error ? 500 : 200,
    body: JSON.stringify(result),
  }
}
