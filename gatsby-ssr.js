import withStorage from "./src/store/withStorage"

export const wrapPageElement = ({ element }) => {
  return withStorage({ element, isSSR: true })
}
