const axios = require("axios")

module.exports = (apiSecret) => {
  const convertKitApi = axios.create({
    baseURL: "https://api.convertkit.com/v3",
  })

  const log = (...args) => {
    console.log("ConvertKit:", ...args)
  }

  const upsertConvertKitSubscriber = async ({ email, formId, fields }) => {
    const { data } = await convertKitApi.post(`forms/${formId}/subscribe`, {
      api_secret: apiSecret,
      email,
      fields,
    })

    const subscriber = data?.subscription?.subscriber

    log("ConvertKit Subscriber added/updated", subscriber)

    return subscriber
  }

  return {
    upsertConvertKitSubscriber,
  }
}
