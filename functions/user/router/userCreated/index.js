const Joi = require("joi")
const validator = require("express-joi-validation").createValidator({})
const userCreatedRouter = require("express").Router()

const verifyUserbaseAuthToken = require("../../middleware/verifyUserbaseAuthToken")
const userCreated = require("./userCreated")

const schema = Joi.object({
  userbaseUserId: Joi.string().required(),
  userbaseAuthToken: Joi.string().required(),
}).required()

userCreatedRouter.use(validator.body(schema))
userCreatedRouter.use(verifyUserbaseAuthToken())

userCreatedRouter.post("/", async (request, response) => {
  const result = await userCreated(request)
  response.json(result)
})

module.exports = userCreatedRouter
