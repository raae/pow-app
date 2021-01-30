const middy = require("@middy/core")
const jsonBodyParser = require("@middy/http-json-body-parser")
const Joi = require("joi")

const validateHttpMethod = require("./middleware/validateHttpMethod")
const validateJoiBodySchema = require("./middleware/validateJoiBodySchema")
const addParamsToBody = require("./middleware/addParamsToBody")
const secretsManager = require("./middleware/secretsManager")
const verifyUserbaseAuthToken = require("./middleware/verifyUserbaseAuthToken")
const httpErrorHandler = require("./middleware/httpErrorHandler")

const handleUserCreated = require("./handlers/userCreated")

const userCreatedHandler = async ({ body, context }) => {
  const result = await handleUserCreated(body, context)
  return {
    statusCode: 200,
    body: JSON.stringify(result),
  }
}

const handler = middy(userCreatedHandler)
  .use(validateHttpMethod("POST"))
  .use(jsonBodyParser())
  .use(addParamsToBody())
  .use(
    validateJoiBodySchema({
      userbaseUserId: Joi.string().required(),
      userbaseAuthToken: Joi.string().required(),
      context: Joi.string()
        .valid("development", "deploy-preview", "production")
        .required(),
    })
  )
  .use(
    secretsManager({
      keys: [
        "USERBASE_ADMIN_API_ACCESS_TOKEN",
        "CONVERTKIT_API_SECRET",
        "CONVERTKIT_FORM_ID",
      ],
      contextPath: "event.body.context",
    })
  )
  .use(verifyUserbaseAuthToken())
  .use(httpErrorHandler())

module.exports = { handler }
