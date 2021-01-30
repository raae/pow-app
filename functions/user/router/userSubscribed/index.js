const Joi = require("joi")
const userCreatedRouter = require("express").Router()

const constructStripeBody = require("../../middleware/constructStripeBody")
const validateJoiRequestSchema = require("../../middleware/validateJoiRequestSchema")

const userSubscribed = require("./userSubscribed")

const schema = Joi.object({
  userbaseUserId: Joi.string().required(),
})

userCreatedRouter.use(
  constructStripeBody({ secretKey: "STRIPE_WEBHOOK_SUBSCRIBED_SECRET" })
)
userCreatedRouter.use(validateJoiRequestSchema("body", schema))

userCreatedRouter.post("/", async (request, response) => {
  response.json(await userSubscribed(request))
})

module.exports = userCreatedRouter
