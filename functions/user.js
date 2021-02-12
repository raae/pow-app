const serverless = require("serverless-http")
const app = require("./user/index.js")

module.exports.handler = serverless(app)
