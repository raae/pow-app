import React, { createContext, useState, useEffect } from "react"

import analyze from "./analyze"

export const CycleSateContext = createContext()

const CycleProvider = ({ children, entries = {}, settings = {} }) => {
  const [cycle, setCycle] = useState({})

  useEffect(() => {
    setCycle(analyze({ entries, settings }))
  }, [entries, settings])

  return (
    <CycleSateContext.Provider value={cycle}>
      {children}
    </CycleSateContext.Provider>
  )
}

export default CycleProvider
