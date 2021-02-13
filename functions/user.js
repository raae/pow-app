const serverless = require("serverless-http")
const app = require("./user/index.js")("/.netlify/functions/user")

module.exports.handler = serverless(app)
