import withStorage from "./src/store/withStorage"
import withTheme from "./src/theme/withTheme"

export const wrapPageElement = ({ element }) => {
  return withTheme({ element: withStorage({ element }) })
}

// export const wrapRootElement = ({ element }) => {
//   return withTheme({ element })
// }

export const shouldUpdateScroll = ({ routerProps: { location } }) => {
  return location.pathname !== "/app"
}
