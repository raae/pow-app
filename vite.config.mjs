import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

export default defineConfig({
  plugins: [react()],
  // The client env vars kept their historical GATSBY_ prefix so nothing needs
  // renaming in the Netlify UI (including the _PRODUCTION/_DEPLOY_PREVIEW
  // variants used by netlify-plugin-contextual-env). FATHOM_ is exposed for
  // the analytics site id — all of these are public values baked into the
  // bundle; never add a prefix that would expose a secret.
  envPrefix: ["GATSBY_", "FATHOM_"],
  // userbase-js's crypto chain (randombytes et al.) references the Node
  // `global` that webpack used to shim.
  define: {
    global: "globalThis",
  },
  test: {
    globals: true,
    environment: "node",
  },
})
