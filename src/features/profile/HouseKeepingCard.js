import React, { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import {
  Avatar,
  Button,
  Card,
  CardHeader,
  CardContent,
  Typography,
  Box,
  makeStyles,
} from "@material-ui/core"
import { ErrorOutline as DangerIcon } from "@material-ui/icons"
import { selectEntries, emptyEntries } from "../entries"
import Papa from "papaparse"

const useStyles = makeStyles((theme) => ({
  avatar: {
    backgroundColor: theme.palette.primary.main,
  },
  listItem: {
    display: "flex",
    flexWrap: "wrap",
  },
}))

const HouseKeepingCard = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [isPending, setIsPending] = useState(false)
  const entries = useSelector(selectEntries)

  const disabled = isPending || entries.length === 1

  let exportAllEntriesText = `Export all my entries`


  const exportAllEntries = async (event) => {
    event.preventDefault();
    alert(`You Exported Your POW! data 😺👍`)
    const convertToCsv = Papa.unparse(entries)
    console.log(convertToCsv)


  }

  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar className={classes.avatar}>
            <DangerIcon />
          </Avatar>
        }
        title="Export Zone"
      />

      <CardContent>
        <Box mb={2}>
          <Typography variant="body1" component="h2">
            Do you feel the need to Export your POW! data?
          </Typography>
          <Typography variant="body2" color="textSecondary">
            It will be exported in plain text as a csv file.
          </Typography>
        </Box>

        <Button
          disabled={disabled}
          variant="outlined"
          color="primary"
          onClick={exportAllEntries}
        >
          {exportAllEntriesText}
        </Button>
      </CardContent>
    </Card>
  )
}

HouseKeepingCard.propTypes = {}

export default HouseKeepingCard
