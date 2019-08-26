import withStorage from "./src/store/withStorage"
import withTheme from "./src/theme/withTheme"

export const wrapPageElement = ({ element }) => {
  return withStorage({ element, isSSR: true })
}

export const wrapRootElement = ({ element }) => {
  return withTheme({ element })
}
