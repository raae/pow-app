import React from "react"
import { StoreProvider } from "./store.js"

const withStorage = ({ element, isSSR }) => {
  return <StoreProvider initialValue={{ isSSR }}>{element}</StoreProvider>
}

export default withStorage
