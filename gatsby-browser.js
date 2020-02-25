import { withTheme } from "./src/theme"
import { withAuthProvider } from "./src/auth"

export const wrapPageElement = ({ element }) => {
  return withTheme({ element })
}

export const wrapRootElement = ({ element }) => {
  return withAuthProvider({ element })
}

export const shouldUpdateScroll = ({ routerProps: { location } }) => {
  return location.pathname !== "/app"
}
