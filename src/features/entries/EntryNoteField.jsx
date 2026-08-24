import React, { useState, useEffect } from "react"

import { TextField } from "@material-ui/core"

import { useSettings } from "../settings"

const EntryNoteField = ({ onNoteChange, note, label, ...props }) => {
  const { mainMensesTag } = useSettings()

  const [placeholder, setPlaceholder] = useState()

  useEffect(() => {
    const placeholders = [
      `My #${mainMensesTag || "period"} just started.`,
      `#energetic`,
      `So so #tired`,
      `Feeling #sexy!`,
      `I am #sad and #angry.`,
      `#${mainMensesTag || "period"} #heavyflow`,
      `Today I am #happy#happy#happy :D`,
      `#PMS maybe`,
      `Such a #great day and so much happened. There was #this and #that and the other #thing.`,
    ]

    let index = Math.floor(Math.random() * placeholders.length)

    const tick = () => {
      setPlaceholder(placeholders[index])
      if (index === placeholders.length - 1) {
        index = 0
      } else {
        index++
      }
    }

    const interval = setInterval(tick, 3500)
    tick()

    return () => {
      clearInterval(interval)
    }
  }, [mainMensesTag])

  return (
    <TextField
      multiline
      fullWidth
      {...props}
      placeholder={placeholder}
      label={label}
      value={note}
      onChange={onNoteChange}
      helperText="Use hashtags for things you would like to keep a close eye on."
    />
  )
}

export default EntryNoteField
