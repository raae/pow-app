import React from "react"
import {
  Container,
  makeStyles,
  Typography,
  Card,
  CardContent,
} from "@material-ui/core"

const useStyles = makeStyles(theme => ({
  card: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(4),
  },
}))

const EntryList = ({ entries = [] }) => {
  const classes = useStyles()

  return (
    <Container>
      {entries
        .sort((a, b) => (b.date > a.date ? 1 : -1))
        .map(entry => (
          <Card key={entry.date} elevation={0} className={classes.card}>
            <CardContent>
              <Typography
                variant="overline"
                component="p"
                color="textSecondary"
              >
                {entry.date}
              </Typography>
              <Typography variant="body1" component="p">
                {entry.note}
              </Typography>
            </CardContent>
          </Card>
        ))}
    </Container>
  )
}

export default EntryList
