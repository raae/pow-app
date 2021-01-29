const createError = require("http-errors")
const { get } = require("lodash")

const getEnvVariables = (variables, { keys, context = "" }) => {
  const contextSuffix = `${context}`.toUpperCase().replace(/-/g, "_")

  return keys.reduce((acc, key) => {
    let envKey = `${key}_${contextSuffix}`
    acc[key] = variables[envKey] || variables[key]
    return acc
  }, {})
}

module.exports = ({ keys, contextPath }) => {
  return {
    before: (handler) => {
      const context = get(handler, contextPath)

      if (!context) {
        throw new createError.BadRequest(`Context required at ${contextPath}`)
      }

      const secrets = getEnvVariables(process.env, {
        keys,
        context: get(handler, contextPath),
      })

      handler.event.context = {
        ...secrets,
      }
    },
  }
}
