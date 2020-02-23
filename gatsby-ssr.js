import { withStore } from "./src/store"
import { withTheme } from "./src/theme"
import { withAuthProvider } from "./src/auth"

export const wrapPageElement = ({ element }) => {
  return withTheme({ element })
}

export const wrapRootElement = ({ element }) => {
  return withStore({ element: withAuthProvider({ element }) })
}
