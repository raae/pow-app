const middy = require("@middy/core")

const bodyTransformer = require("./middleware/bodyTransformer")
const addParamsToBody = require("./middleware/addParamsToBody")
const httpErrorHandler = require("./middleware/httpErrorHandler")

const userCreatedHandler = require("./handlers/userCreated")

const router = (...arg) => {
  return userCreatedHandler(...arg)
}

module.exports = {
  handler: middy(router)
    .use(httpErrorHandler())
    .use(bodyTransformer())
    .use(addParamsToBody()),
}
