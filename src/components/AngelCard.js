//   component that takes props that replace the text in my example.
import React, { useState, useEffect } from "react"
import { makeStyles } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"

const useStyles = makeStyles({
  card: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  list: {
    paddingLeft: "1.5em",
  },
})
const AngelCard = (props) => {
  const classes = useStyles()
  const bull = <span className={classes.bullet}>•</span>

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          POW!
        </Typography>
        <Typography variant="h5" component="h2">
          {props.weddingAnniversary}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {props.priceText} {bull} {props.spotsText} left
        </Typography>
        <Typography className={classes.list} variant="body2" component="ul">
          {props.description.map((item) => (
            <li>{item}</li>
          ))}{" "}
        </Typography>
      </CardContent>
      <CardActions>
        <Button variant="contained" color="primary" onClick={props.onClick}>
          {props.buttonText}{" "}
        </Button>
      </CardActions>
    </Card>
  )
}
export default AngelCard
