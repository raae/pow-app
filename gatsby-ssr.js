import { withTheme } from "./src/theme"
import { withRoot } from "./src/rootElement"

export const wrapPageElement = ({ element }) => {
  return withTheme({ element })
}

export const wrapRootElement = ({ element }) => {
  return withRoot({ element })
}
