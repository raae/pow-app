import { withTheme } from "./src/theme"
import { withAuthProvider } from "./src/auth"
import { USERBASE_APP_ID } from "./src/constants"

console.log({ USERBASE_APP_ID })

export const wrapPageElement = ({ element }) => {
  return withTheme({ element })
}

export const wrapRootElement = ({ element }) => {
  return withAuthProvider({ element, appId: USERBASE_APP_ID })
}

export const shouldUpdateScroll = ({ routerProps: { location } }) => {
  return location.pathname !== "/app"
}
