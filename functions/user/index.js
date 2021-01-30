const serverless = require("serverless-http")
const express = require("express")
const helmet = require("helmet")
const router = require("./router")
const app = express()

app.use(helmet())
app.use(express.json())

app.use("/.netlify/functions/user", router)

module.exports.handler = serverless(app)
