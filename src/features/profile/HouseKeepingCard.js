import React, { useState } from "react"
import { useSelector } from "react-redux"
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
import { selectEntries } from "../entries"
import Papa from "papaparse"
import { orderBy } from "lodash"

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
  const [isPending, setIsPending] = useState(false)
  const entries = useSelector(selectEntries)

  const disabled = isPending || entries.length === 1

  let exportAllEntriesText = `Export all my entries`

  const exportAllEntries = async (event) => {
    setIsPending(true)
    event.preventDefault()

    const convertToCsv = Papa.unparse(entries)
    openSaveFileDialog(convertToCsv, "pow-export.csv", ".csv")

    setIsPending(false)
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

const openSaveFileDialog = (data, filename, mimetype) => {
  // copied from https://github.com/mholt/PapaParse/issues/175#issuecomment-514922286
  if (!data) return

  var blob =
    data.constructor !== Blob
      ? new Blob([data], { type: mimetype || "application/octet-stream" })
      : data

  if (navigator.msSaveBlob) {
    navigator.msSaveBlob(blob, filename)
    return
  }

  var lnk = document.createElement("a"),
    url = window.URL,
    objectURL

  if (mimetype) {
    lnk.type = mimetype
  }

  lnk.download = filename || "untitled"
  lnk.href = objectURL = url.createObjectURL(blob)
  lnk.dispatchEvent(new MouseEvent("click"))
  setTimeout(url.revokeObjectURL.bind(url, objectURL))
}
