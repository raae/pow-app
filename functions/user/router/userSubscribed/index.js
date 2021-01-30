const Joi = require("joi")
const router = require("express").Router()
const asyncHandler = require("express-async-handler")

const constructStripeBody = require("../../middleware/constructStripeBody")
const validateJoiRequestSchema = require("../../middleware/validateJoiRequestSchema")

const userSubscribed = require("./userSubscribed")

const schema = Joi.object({
  client_reference_id: Joi.string().required(),
})

router.use(
  constructStripeBody({ secretKey: "STRIPE_WEBHOOK_SUBSCRIBED_SECRET" })
)
router.use(validateJoiRequestSchema("body", schema))

router.post(
  "/",
  asyncHandler(async (request, response) => {
    const result = await userSubscribed(request)
    response.json(result)
  })
)

module.exports = router
