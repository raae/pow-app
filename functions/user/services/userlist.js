const axios = require("axios")

module.exports = (pushKey) => {
  const userlistApi = axios.create({
    baseURL: "https://push.userlist.com",
    headers: {
      Authorization: `Push ${pushKey}`,
    },
  })

  const log = (...args) => {
    console.log("Userlist:", ...args)
  }

  const upsertUserlistSubscriber = async ({
    identifier,
    email,
    signed_up_at,
    properties,
  }) => {
    await userlistApi.post(`users`, {
      identifier,
      email,
      signed_up_at,
      properties,
    })

    log("Subscriber updated", identifier)
  }

  return {
    upsertUserlistSubscriber,
  }
}
