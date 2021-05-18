import React, { useEffect, useState } from "react"
import Snackbar from "@material-ui/core/Snackbar"
import { Alert } from "@material-ui/lab"

export default function Toast({
  open: defaultOpen,
  children,
  severity = "error",
}) {
  const [open, setOpen] = useState(defaultOpen)
  const duration = 6000

  useEffect(() => {
    setOpen(defaultOpen)
  }, [defaultOpen])

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      open={open}
      autoHideDuration={duration}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity={severity}>
        {children}
      </Alert>
    </Snackbar>
  )
}
