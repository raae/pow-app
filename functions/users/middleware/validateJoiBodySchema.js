const validateJoiEventSchema = require("./validateJoiEventSchema")

module.exports = (schema) => {
  return validateJoiEventSchema({
    body: schema,
  })
}
