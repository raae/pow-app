const Joi = require("joi")
const router = require("express").Router()
const asyncHandler = require("express-async-handler")

const constructStripeBody = require("../middleware/constructStripeBody")
const validateJoiRequestSchema = require("../middleware/validateJoiRequestSchema")

const upsertUser = require("../controllers/upsertUser")

const schema = Joi.object({
  // Data from Stripe
  metadata: Joi.object({
    __userbase_user_id: Joi.string().required(),
  }).required(),
})

const webhookSecretName = "STRIPE_WEBHOOK_SUBSCRIBED_SECRET"

router.use(constructStripeBody({ webhookSecretName }))
router.use(validateJoiRequestSchema("body", schema))

router.post(
  "/",
  asyncHandler(async ({ body, context }, response) => {
    const userbaseUserId = body.metadata["__userbase_user_id"]
    const result = await upsertUser(userbaseUserId, context)
    response.json(result)
  })
)

module.exports = router
