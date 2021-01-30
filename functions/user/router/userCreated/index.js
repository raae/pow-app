const Joi = require("joi")
const userCreatedRouter = require("express").Router()

const verifyUserbaseAuthToken = require("../../middleware/verifyUserbaseAuthToken")
const validateJoiRequestSchema = require("../../middleware/validateJoiRequestSchema")

const userCreated = require("./userCreated")

const schema = Joi.object({
  userbaseUserId: Joi.string().required(),
  userbaseAuthToken: Joi.string().required(),
})

userCreatedRouter.use(validateJoiRequestSchema("body", schema))
userCreatedRouter.use(verifyUserbaseAuthToken())

userCreatedRouter.post("/", async (request, response) => {
  response.json(await userCreated(request))
})

module.exports = userCreatedRouter
