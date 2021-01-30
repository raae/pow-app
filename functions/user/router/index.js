const Joi = require("joi")
const validator = require("express-joi-validation").createValidator({})
const router = require("express").Router()

const contextManager = require("../middleware/contextManager")

const userCreated = require("./userCreated")

router.use(
  validator.query(
    Joi.object({
      context: Joi.string()
        .valid("development", "deploy-preview", "production")
        .required(),
    })
  )
)

router.use(
  contextManager({
    keys: [
      "USERBASE_ADMIN_API_ACCESS_TOKEN",
      "CONVERTKIT_API_SECRET",
      "CONVERTKIT_FORM_ID",
    ],
    contextPath: "query.context",
  })
)

router.use("/created", userCreated)

module.exports = router
