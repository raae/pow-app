import React, { useEffect } from "react"

import { navigate } from "gatsby"

import { Seo, Loading, AppLayout } from "../../features/app"
import { TIMELINE } from "../../features/navigation"
import { useOnboarding } from "../../features/onboarding"

const Incomplete = () => {
  const {
    mainMensesTag,
    hasInitialCycle,
    isSubscribed,
    isLoading,
    isCompleted,
  } = useOnboarding()

  useEffect(() => {
    if (!isLoading) {
      if (isCompleted) {
        navigate(TIMELINE.to)
      } else if (!mainMensesTag) {
        navigate("./tag")
      } else if (!hasInitialCycle) {
        navigate("./cycle")
      } else if (!isSubscribed) {
        // Add payment step
      }
    }
  }, [isLoading, isSubscribed, isCompleted, mainMensesTag, hasInitialCycle])

  if (isLoading) {
    return (
      <>
        <Seo title="Loading..." />
        <Loading fullScreen />
      </>
    )
  } else {
    return <AppLayout />
  }
}

export default Incomplete
