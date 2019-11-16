import React from "react"
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  makeStyles,
} from "@material-ui/core"

import Logo from "../components/Logo"

const useStyles = makeStyles((theme) => ({
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  subtitle: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1.5),
  },
  list: {
    paddingLeft: "1.5em",
    "& li": {
      margin: "0.5em 0",
    },
  },
  actions: {
    padding: theme.spacing(2),
  },
}))

const AngelCard = (props) => {
  const classes = useStyles()
  const bull = <span className={classes.bullet}>•</span>

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="h6" component="h2">
          <Logo>POW!</Logo> {props.weddingAnniversary}
        </Typography>
        <Typography className={classes.subtitle} color="textSecondary">
          {props.priceText} {bull} {props.spotsText} left
        </Typography>
        <Typography className={classes.list} variant="body1" component="ul">
          {props.description.map((item) => (
            <li>{item}</li>
          ))}
        </Typography>
      </CardContent>
      <CardActions className={classes.actions}>
        <Button variant="contained" color="primary" onClick={props.onClick}>
          {props.buttonText}
        </Button>
      </CardActions>
    </Card>
  )
}
export default AngelCard
