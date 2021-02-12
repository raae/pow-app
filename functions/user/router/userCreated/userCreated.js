const format = require("date-fns/format")
const upsertUser = require("../upsertUser")

module.exports = async ({ body, context }) => {
  return upsertUser({ userbaseUserId: body.userbaseUserId }, context)
}
