import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter } from "react-router-dom"

import { Root, Page } from "./wrappers"
import App from "./App"
import { initFathom } from "./features/tracking"

initFathom()

ReactDOM.render(
  <Root>
    <BrowserRouter>
      <Page>
        <App />
      </Page>
    </BrowserRouter>
  </Root>,
  document.getElementById("root")
)
