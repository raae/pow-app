import React from "react"
import { navigate } from "gatsby"

import { useDataState } from "../database"

import SEO from "../components/Seo"
import Loading from "../components/Loading"

import BrandLayout from "../components/BrandLayout"
import { CycleProvider } from "../cycle"
import { useAuthState } from "../auth"
import { useEffect } from "react"

const HomeRoute = () => {
  const { user, isPending: authIsPending } = useAuthState()
  const { isPending: dataIsPending, entries, settings } = useDataState()

  useEffect(() => {
    if (!user && !authIsPending) {
      navigate("/login")
    } else if (user) {
      const { protectedProfile } = user
      if (!protectedProfile || !protectedProfile.stripeCustomerId) {
        navigate("/payment?stripe=failed")
      }
    }
  }, [user, authIsPending])

  if (authIsPending || dataIsPending) {
    return <Loading />
  }

  return (
    <CycleProvider entries={entries} settings={settings}>
      <BrandLayout variant="app">
        <SEO title="Log" />
        <>Day </>
      </BrandLayout>
    </CycleProvider>
  )
}

export default HomeRoute
