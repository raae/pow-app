const axios = require("axios")

const { USERBASE_ADMIN_API_ACCESS_TOKEN } = process.env

const verifyUserbaseAuthToken = async ({ userbaseAuthToken }) => {
  const { data } = await axios.get(
    "https://v1.userbase.com/v1/admin/auth-tokens/" + userbaseAuthToken,
    {
      headers: {
        Authorization: `Bearer ${USERBASE_ADMIN_API_ACCESS_TOKEN}`,
      },
    }
  )
  return data
}

const getUserbaseUser = async ({ userbaseId }) => {
  const { data } = await axios.get(
    "https://v1.userbase.com/v1/admin/users/" + userbaseId,
    {
      headers: {
        Authorization: `Bearer ${USERBASE_ADMIN_API_ACCESS_TOKEN}`,
      },
    }
  )

  console.log("Userbase auth token verified", {
    userbaseId: data.userId,
  })

  return data
}

const updateUserbaseProtectedProfile = async ({
  userbaseId,
  protectedProfile,
}) => {
  // Fetch this again to make sure we have the latest
  const user = await getUserbaseUser({ userbaseId })

  // Updating the user has no response
  await axios.post(
    "https://v1.userbase.com/v1/admin/users/" + userbaseId,
    {
      protectedProfile: {
        ...user.protectedProfile,
        ...protectedProfile,
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
    protectedProfile,
  })

  return { userbaseId }
}

exports.verifyUserbaseAuthToken = verifyUserbaseAuthToken
exports.getUserbaseUser = getUserbaseUser
exports.updateUserbaseProtectedProfile = updateUserbaseProtectedProfile
