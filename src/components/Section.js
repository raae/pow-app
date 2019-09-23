import React from "react"
import { Container, makeStyles } from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(10),
    paddingBottom: theme.spacing(7),
    "&:nth-child(even)": {
      background: theme.palette.background.paper,
    },
    "& p img": {
      maxWidth: "100%",
      maxHeight: "100%",
    },
  },
  container: {
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
  },
  hero: {
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(5),
    "& > * > *": {
      paddingTop: theme.spacing(5),
      paddingBottom: theme.spacing(2),
    },
    "& img": {
      marginBottom: -theme.spacing(8.5),
      border: `4px solid ${theme.palette.secondary.main}`,
      borderRadius: theme.shape.borderRadius / 2,
      maxHeight: "30rem",
    },
    "& h1": {
      ...theme.typography.h1,
      fontFamily: `'Seymour One', ${theme.typography.h1.fontFamily}`,
      color: theme.palette.primary.main,
      fontWeight: theme.typography.fontWeightBold,
      fontSize: "5rem",
      marginBottom: 0,
    },
    "& h2": {
      ...theme.typography.h2,
      fontSize: "3rem",
      marginTop: theme.spacing(2),
      maxWidth: "30rem",
      lineHeight: 1.1,
    },
    "& > div > div": {
      display: "inline-block",
    },
    "& a:last-child": {
      display: "block",
      paddingLeft: theme.spacing(2),
      marginTop: theme.spacing(1),
    },
    "& p": {
      margin: 0,
    },
  },
  text: {
    "& h1": {
      ...theme.typography.h5,
      marginTop: theme.spacing(0),
      marginBottom: theme.spacing(2),
      fontWeight: theme.typography.fontWeightMedium,
    },
    "& p": {
      ...theme.typography.body1,
      fontSize: "1.2rem",
      lineHeight: 1.7,
      marginTop: "0.5rem",
      marginBottom: "0.5rem",
    },
    "& p + small": {
      display: "block",
      marginTop: "-0.5rem",
      textAlign: "center",
    },
    "& img": {
      border: `4px solid ${theme.palette.secondary.main}`,
      borderRadius: theme.shape.borderRadius / 2,
    },
  },
  list: {
    "& h1": {
      ...theme.typography.h5,
      marginTop: theme.spacing(0),
      marginBottom: theme.spacing(0),
      fontWeight: theme.typography.fontWeightMedium,
    },
    "& p": {
      ...theme.typography.body1,
      fontSize: "1.2rem",
      marginTop: theme.spacing(0.5),
      marginBottom: theme.spacing(0),
    },
    "& p + p": {
      marginTop: theme.spacing(1),
    },
  },
}))

const Section = ({ variant = "text", maxWidth = "md", children, ...props }) => {
  const classes = useStyles()
  return (
    <article className={`${classes.root} ${classes[variant]}`}>
      <Container maxWidth={maxWidth} className={classes.container}>
        {children}
      </Container>
    </article>
  )
}

export default Section
