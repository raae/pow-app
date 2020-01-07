import { withStore } from "./src/store"
import { withTheme } from "./src/theme"

export const wrapRootElement = ({ element }) => {
  return withTheme({ element: withStore({ element }) })
}

export const shouldUpdateScroll = ({ routerProps: { location } }) => {
  return location.pathname !== "/app"
}
