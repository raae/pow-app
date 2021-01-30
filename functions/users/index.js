const middy = require("@middy/core")
const Joi = require("joi")

const bodyTransformer = require("./middleware/bodyTransformer")
const validateHttpMethod = require("./middleware/validateHttpMethod")
const validateJoiBodySchema = require("./middleware/validateJoiBodySchema")
const addParamsToBody = require("./middleware/addParamsToBody")
const secretsManager = require("./middleware/secretsManager")
const verifyUserbaseAuthToken = require("./middleware/verifyUserbaseAuthToken")
const httpErrorHandler = require("./middleware/httpErrorHandler")

const userCreatedHandler = require("./handlers/userCreated")

const handler = middy(userCreatedHandler)
  .use(validateHttpMethod("POST"))
  .use(httpErrorHandler())
  .use(bodyTransformer())
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

module.exports = { handler }
