const express = require("express")
const helmet = require("helmet")
const morgan = require("morgan")
const Sentry = require("@sentry/node")
const Tracing = require("@sentry/tracing")

const httpErrorHandler = require("./middleware/httpErrorHandler")
const router = require("./router")

module.exports = (path) => {
  const app = express()

  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    integrations: [
      // enable HTTP calls tracing
      new Sentry.Integrations.Http({ tracing: true }),
      // enable Express.js middleware tracing
      new Tracing.Integrations.Express({ app }),
    ],

    // We recommend adjusting this value in production, or using tracesSampler
    // for finer control
    tracesSampleRate: 1.0,
  })

  // RequestHandler creates a separate execution context using domains, so that every
  // transaction/span/breadcrumb is attached to its own Hub instance
  app.use(Sentry.Handlers.requestHandler())
  // TracingHandler creates a trace for every incoming request
  app.use(Sentry.Handlers.tracingHandler())

  app.use(morgan("dev"))
  app.use(helmet())

  app.use(path, router)

  // The error handler must be before any other error middleware and after all controllers
  app.use(
    Sentry.Handlers.errorHandler({
      shouldHandleError(error) {
        // Capture all 404 and 500 errors
        if (error.status >= 400) {
          return true
        }
        return false
      },
    })
  )

  app.use(httpErrorHandler())

  return app
}
