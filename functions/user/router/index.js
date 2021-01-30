const Joi = require("joi")
const router = require("express").Router()

const contextManager = require("../middleware/contextManager")
const validateJoiRequestSchema = require("../middleware/validateJoiRequestSchema")

const userCreated = require("./userCreated")

const schema = Joi.object({
  context: Joi.string()
    .valid("development", "deploy-preview", "production")
    .required(),
})

router.use(validateJoiRequestSchema("query", schema))

router.use(
  contextManager({
    keys: [
      "USERBASE_ADMIN_API_ACCESS_TOKEN",
      "CONVERTKIT_API_SECRET",
      "CONVERTKIT_FORM_ID",
    ],
    contextPath: "query.context",
  })
)

router.use("/created", userCreated)

module.exports = router
