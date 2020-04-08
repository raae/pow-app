import React from "react"

import { makeStyles } from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
  root: {
    fontSize: "1.25rem",
    fontWeight: theme.typography.fontWeightRegular,
    lineHeight: 1.5,

    "& > *": {
      marginTop: "1rem",
      marginBottom: "1rem",
    },
    "& > h1": {
      fontSize: "3.5rem",
      fontWeight: theme.typography.fontWeightBolder,
      marginTop: "5rem",
      marginBottom: "2rem",
      letterSpacing: "-0.02em",
      lineHeight: 1.125,
    },
    "& > h2": {
      fontSize: "2.5rem",
      fontWeight: theme.typography.fontWeightBolder,
      marginTop: "3rem",
      marginBottom: "1.5rem",
      letterSpacing: "-0.02em",
      lineHeight: 1.125,
    },
    "& > h3": {
      fontSize: "1.75rem",
      fontWeight: theme.typography.fontWeightBold,
      marginTop: "2.5rem",
      marginBottom: "1rem",
      lineHeight: 1.125,
    },
    "& > h4": {
      fontSize: "1.5rem",
      fontWeight: theme.typography.fontWeightMedium,
      marginTop: "2.5rem",
      marginBottom: "1rem",
      lineHeight: 1.125,
    },
    "& > h5": {
      fontSize: "1.25rem",
      fontWeight: theme.typography.fontWeightMedium,
      marginTop: "2.5rem",
      marginBottom: "1rem",
      lineHeight: 1.125,
    },
    "& > h6": {
      fontSize: "1rem",
      fontWeight: theme.typography.fontWeightRegular,
      textTransform: "uppercase",
      marginTop: "2.5rem",
      marginBottom: "1rem",
      lineHeight: 1.125,
    },
    "& > ul": {
      paddingLeft: "1.5em",
      listStyleType: "circle",
      "@media only screen and (max-width: 40rem)": {
        paddingLeft: "1.225em",
      },

      "& li": {
        margin: "1rem 0",
        lineHeight: 1.25,
      },
    },
    "& > blockquote": {
      fontWeight: theme.typography.fontWeightMedium,
      margin: "2rem 0",
      marginLeft: "0rem",
      paddingLeft: "1.5rem",
      borderLeft: `4px solid ${theme.palette.secondary.main}`,
    },
    "& > p > img": {
      width: "100%",
      maxWidth: "23rem",
      display: "block",
      marginTop: "1.5em",
      border: `4px solid ${theme.palette.secondary.main}`,
      "& + em": {
        fontSize: "0.8em",
        marginBottom: "1.5em",
      },
    },
    "& > .MuiButtonBase-root": {
      "& + .MuiButtonBase-root": {
        marginLeft: "1rem",
      },
    },
  },
}))

const BrandCopy = ({ children }) => {
  const classes = useStyles()
  return <div className={classes.root}>{children}</div>
}

export default BrandCopy
