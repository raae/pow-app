import withStorage from "./src/store/withStorage"

export const wrapPageElement = ({ element }) => {
  return withStorage({ element })
}

export const shouldUpdateScroll = ({ routerProps: { location } }) => {
  return location.pathname !== "/app"
}
