import { withRoot, withPage } from "./src/wrappers"

export const wrapPageElement = ({ element }) => {
  return withPage({ element })
}

export const wrapRootElement = ({ element }) => {
  return withRoot({ element, isSSR: false })
}
