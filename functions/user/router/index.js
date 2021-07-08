const Joi = require("joi")
const router = require("express").Router()

const contextManager = require("../middleware/contextManager")
const validateJoiRequestSchema = require("../middleware/validateJoiRequestSchema")

const userCreated = require("./userCreated")
const userSubscribed = require("./userSubscribed")
const userUpdated = require("./userUpdated")

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
      "USERLIST_PUSH_KEY",
      "SERVERLESS_SECRET",
    ],
    contextPath: "query.context",
  })
)

// POST /created
// Called from the front end when a user signs up
router.use("/created", userCreated)

// POST /subscribed
// Called from Stripe on successful subscription
router.use("/subscribed", userSubscribed)

// POST /updated
// Called by clean up script to make sure all users
// are processed (and when testing)
router.use("/updated", userUpdated)

module.exports = router
