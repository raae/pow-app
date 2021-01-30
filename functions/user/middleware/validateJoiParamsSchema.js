const Joi = require("joi")

const validateJoiEventSchema = require("./validateJoiEventSchema")

module.exports = (schema) => {
  return validateJoiEventSchema({
    queryStringParameters: schema,
  })
}
