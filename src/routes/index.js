import React, { useEffect } from "react"
import { navigate } from "gatsby"
import { Router } from "@reach/router"

import { useAuthState } from "../auth"
import { DataProvider } from "../database"

import Loading from "../components/Loading"

import Home from "./Home"
import Settings from "./Settings"

const NotFound = () => {
  navigate("/app")
  return null
}

const Index = () => {
  const { user, isPending } = useAuthState()

  useEffect(() => {
    if (!user && !isPending) {
      navigate("/login")
    }
  }, [user, isPending])

  if (user) {
    return (
      <DataProvider user={user}>
        <Router basepath="/app">
          <Home path="/" />
          <Settings path="/settings" />
          <NotFound default />
        </Router>
      </DataProvider>
    )
  } else {
    return <Loading />
  }
}

export default Index
