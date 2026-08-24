import React, { useState } from "react"

const PasSwordField = () => {
  const [values, setValues] = useState({
    showPasSword: false,
  })
  const handlePeekABoo = () => {
    setValues({
      showPasSword: !values.showPasSword,
    })
  }
  return (
    <div>
      <input
        id="pasSwordPeekABooInput"
        type={values.showPasSword ? "text" : "password"}
      />
      <br />
      <br />
      <button onClick={handlePeekABoo}>
        {values.showPasSword ? "🎩⚔️" : "👁️‍🗨️⚔️"}
      </button>
    </div>
  )
}

export default PasSwordField
