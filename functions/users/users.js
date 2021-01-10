// We get userbase id
// Then fetch the user
// Add the email and userbase id to convert kit
// Return the convert kit id
const axios = require("axios")
const Joi = require("joi")
const format = require("date-fns/format")

const {
  CONVERTKIT_FORM_ID,
  CONVERTKIT_API_SECRET,
  USERBASE_ADMIN_API_ACCESS_TOKEN,
} = process.env

const getUserbaseUser = async ({ userbaseId }) => {
  const { data } = await axios.get(
    "https://v1.userbase.com/v1/admin/users/" + userbaseId,
    {
      headers: {
        Authorization: `Bearer ${USERBASE_ADMIN_API_ACCESS_TOKEN}`,
      },
    }
  )
  return data
}

const updateUserbaseProtectedProfile = async ({ userbaseId, convertKitId }) => {
  // Fetch this again to make sure we have the latest
  const user = await getUserbaseUser({ userbaseId })

  // Updating the user has no response
  await axios.post(
    "https://v1.userbase.com/v1/admin/users/" + userbaseId,
    {
      protectedProfile: {
        ...user.protectedProfile,
        convertKitId: `${convertKitId}`,
      },
    },
    {
      headers: {
        Authorization: `Bearer ${USERBASE_ADMIN_API_ACCESS_TOKEN}`,
      },
    }
  )

  console.log("Userbase Protected Profile updated", {
    userbaseId,
    convertKitId,
  })

  return { userbaseId }
}

const addConvertKitSubscriber = async ({ email, userbaseId, creationDate }) => {
  console.log(creationDate)
  const { data } = await axios.post(
    `https://api.convertkit.com/v3/forms/${CONVERTKIT_FORM_ID}/subscribe`,
    {
      api_secret: CONVERTKIT_API_SECRET,
      email,
      fields: {
        userbase_id: userbaseId,
        user_created: format(new Date(creationDate), "yyyy-MM-dd"),
      },
    }
  )

  const convertKitId = data?.subscription?.subscriber?.id

  console.log("ConvertKit Subscriber added", {
    convertKitId,
  })
  return data.subscription.subscriber
}

const created = async ({ userbaseId }) => {
  try {
    const { email, creationDate } = await getUserbaseUser({ userbaseId })
    const { id: convertKitId } = await addConvertKitSubscriber({
      email,
      userbaseId,
      creationDate,
    })

    await updateUserbaseProtectedProfile({
      convertKitId,
      userbaseId,
    })
    return {
      data: {
        convertKitId,
        userbaseId,
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

exports.handler = async (event) => {
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
