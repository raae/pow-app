const axios = require("axios")

module.exports = (apiSecret) => {
  const convertKitApi = axios.create({
    baseURL: "https://api.convertkit.com/v3",
  })

  const log = (...args) => {
    console.log("ConvertKit:", ...args)
  }

  const addConvertKitSubscriber = async ({ email, formId, fields }) => {
    const { data } = await convertKitApi.post(`forms/${formId}/subscribe`, {
      api_secret: apiSecret,
      email,
      fields,
    })

    const subscriber = data?.subscription?.subscriber
    log("ConvertKit Subscriber added", subscriber)
    return subscriber
  }

  const updateConvertKitSubscriber = async ({
    email,
    subscriberId,
    fields,
  }) => {
    const { data } = await convertKitApi.put(`subscribers/${subscriberId}`, {
      api_secret: apiSecret,
      email_addess: email,
      fields,
    })

    const subscriber = data?.subscriber
    log("ConvertKit Subscriber updated", subscriber)
    return subscriber
  }

  return {
    addConvertKitSubscriber,
    updateConvertKitSubscriber,
  }
}
