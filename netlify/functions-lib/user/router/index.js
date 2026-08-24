const Joi = require("joi")
const router = require("express").Router()

const contextManager = require("../middleware/contextManager")
const validateJoiRequestSchema = require("../middleware/validateJoiRequestSchema")

const userCreated = require("./userCreated")
const userSubscribed = require("./userSubscribed")

const schema = Joi.object({
  context: Joi.string()
    .valid("development", "deploy-preview", "production")
    .required(),
})

router.use(validateJoiRequestSchema("query", schema))

router.use(
  contextManager({
    keys: [
      "STRIPE_SECRET_KEY",
      "STRIPE_WEBHOOK_SUBSCRIBED_SECRET",
      "USERBASE_ADMIN_API_ACCESS_TOKEN",
      "CONVERTKIT_API_SECRET",
      "CONVERTKIT_FORM_ID",
    ],
    contextPath: "query.context",
  })
)

router.use("/created", userCreated)
router.use("/subscribed", userSubscribed)

module.exports = router
