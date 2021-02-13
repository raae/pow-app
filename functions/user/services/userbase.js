const axios = require("axios")

module.exports = (accessToken) => {
  const userbaseApi = axios.create({
    baseURL: "https://v1.userbase.com/v1/admin",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  const log = (...args) => {
    console.log("Userbase:", ...args)
  }

  const verifyUserbaseAuthToken = async ({
    userbaseAuthToken,
    userbaseUserId,
  }) => {
    const { data } = await userbaseApi.get("auth-tokens/" + userbaseAuthToken)

    log("Auth token verified", {
      userbaseUserId: data.userId,
    })

    if (data.userId !== userbaseUserId) {
      throw Error("userbaseAuthToken / userbaseUserId mismatch")
    }

    return data
  }

  const getUserbaseUser = async ({ userbaseUserId }) => {
    const { data: user } = await userbaseApi.get("users/" + userbaseUserId)

    log("Fetched user", {
      userbaseUserId: user.userId,
    })

    return user
  }

  const updateUserbaseProtectedProfile = async ({
    userbaseUserId,
    protectedProfile,
  }) => {
    // Fetch this again to make sure we have the latest
    const user = await getUserbaseUser({ userbaseUserId })

    // Updating the user has no response
    await userbaseApi.post("users/" + userbaseUserId, {
      protectedProfile: {
        ...user.protectedProfile,
        ...protectedProfile,
      },
    })

    log("Protected Profile updated", {
      userbaseUserId,
      protectedProfile,
    })

    return user
  }

  return {
    verifyUserbaseAuthToken,
    getUserbaseUser,
    updateUserbaseProtectedProfile,
  }
}
