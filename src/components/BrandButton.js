import React from "react"

import { Button, makeStyles } from "@material-ui/core"
import { Link } from "gatsby"

const useStyles = makeStyles((theme) => ({
  label: {
    fontWeight: theme.typography.fontWeightBold,
  },
}))

const BrandButton = ({ ...props }) => {
  const classes = useStyles()
  return (
    <Button
      classes={{
        label: classes.label,
      }}
      variant="contained"
      color="primary"
      component={Link}
      to="/"
      {...props}
    >
      POW!
    </Button>
  )
}

export default BrandButton
