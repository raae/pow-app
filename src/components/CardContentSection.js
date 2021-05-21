import React from "react"
import PropTypes from "prop-types"
import { Typography, makeStyles } from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
  root: {
    "&:not(:last-child)": {
      marginBottom: theme.spacing(3),
    },
  },
  children: {
    marginTop: theme.spacing(1),
    "& > button": {
      marginTop: theme.spacing(1),
    },
    "& > [role='button']": {
      marginTop: theme.spacing(1),
    },
    "& > * + *": {
      marginLeft: theme.spacing(1),
    },
  },
}))

export const CardContentSection = ({ title, subheader, children }) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      {title && (
        <Typography variant="body1" component="h3" gutterBottom={!!subheader}>
          {title}
        </Typography>
      )}
      {subheader && (
        <Typography variant="body2" color="textSecondary">
          {subheader}
        </Typography>
      )}
      {children && <div className={classes.children}>{children}</div>}
    </div>
  )
}

CardContentSection.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  subheader: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
}
