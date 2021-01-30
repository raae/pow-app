const Joi = require("joi")
const express = require("express")
const router = express.Router()

const verifyUserbaseAuthToken = require("../../middleware/verifyUserbaseAuthToken")
const validateJoiRequestSchema = require("../../middleware/validateJoiRequestSchema")

const userCreated = require("./userCreated")

const schema = Joi.object({
  userbaseUserId: Joi.string().required(),
  userbaseAuthToken: Joi.string().required(),
})

router.use(express.json())
router.use(validateJoiRequestSchema("body", schema))
router.use(verifyUserbaseAuthToken())

router.post("/", async (request, response) => {
  response.json(await userCreated(request))
})

module.exports = router
