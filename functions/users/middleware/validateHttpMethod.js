const Joi = require("joi")

const validateJoiEventSchema = require("./validateJoiEventSchema")

module.exports = (...validHttpMethods) => {
  return validateJoiEventSchema({
    httpMethod: Joi.string()
      .valid(...validHttpMethods)
      .required(),
  })
}
