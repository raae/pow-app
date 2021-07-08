const Joi = require("joi")
const express = require("express")
const router = express.Router()
const asyncHandler = require("express-async-handler")

const verifyServerlessSecret = require("../middleware/verifyServerlessSecret")
const validateJoiRequestSchema = require("../middleware/validateJoiRequestSchema")

const upsertUser = require("../controllers/upsertUser")

const schema = Joi.object({
  userbaseUserId: Joi.string().required(),
  serverlessSecret: Joi.string().required(),
})

router.use(express.json())
router.use(validateJoiRequestSchema("body", schema))
router.use(verifyServerlessSecret())

router.post(
  "/",
  asyncHandler(async ({ body, context }, response) => {
    const result = await upsertUser(body.userbaseUserId, context)
    response.json(result)
  })
)

module.exports = router
