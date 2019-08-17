import React, { useState, useEffect } from "react"
import { Link } from "gatsby"

import AppTemplate from "../templates/app"
import useAuth from "./../hooks/useAuth"
import Log from "./../components/Log"

const AppPage = () => {
  const { isPending, putJson, getJson } = useAuth()
  const [entries, setEntries] = useState([])
  const [isProcessing, setIsProcessing] = useState(false)

  const postEntry = async entry => {
    setIsProcessing(true)
    await putJson([entry, ...entries])
    const loadedEntries = await getJson()
    setEntries(loadedEntries)
    setIsProcessing(false)
  }

  useEffect(() => {
    const initData = async () => {
      setIsProcessing(true)
      const loadedEntries = await getJson()
      if (loadedEntries) {
        setEntries(loadedEntries)
        setIsProcessing(false)
      }
    }

    initData()
  }, [])

  const navItems = [
    {
      label: "Profile",
      disabled: isPending,
      variant: "outlined",
      component: Link,
      to: "/profile",
    },
  ]

  return (
    <AppTemplate navItems={navItems}>
      <Log
        postEntry={postEntry}
        entries={entries}
        isProcessing={isProcessing}
      ></Log>
    </AppTemplate>
  )
}

export default AppPage
