const Joi = require("joi")
const express = require("express")
const router = express.Router()
const asyncHandler = require("express-async-handler")

const verifyUserbaseAuthToken = require("../middleware/verifyUserbaseAuthToken")
const validateJoiRequestSchema = require("../middleware/validateJoiRequestSchema")

const upsertUser = require("../services/upsertUser")

const schema = Joi.object({
  userbaseUserId: Joi.string().required(),
  userbaseAuthToken: Joi.string().required(),
})

router.use(express.json())
router.use(validateJoiRequestSchema("body", schema))
router.use(verifyUserbaseAuthToken())

router.post(
  "/",
  asyncHandler(async ({ body, context }, response) => {
    const result = await upsertUser(
      {
        userbaseUserId: body.userbaseUserId,
      },
      context
    )

    response.json(result)
  })
)

module.exports = router
