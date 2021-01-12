const axios = require("axios")
const format = require("date-fns/format")

const { CONVERTKIT_FORM_ID, CONVERTKIT_API_SECRET } = process.env

const addConvertKitSubscriber = async ({ email, userbaseId, creationDate }) => {
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

exports.addConvertKitSubscriber = addConvertKitSubscriber
