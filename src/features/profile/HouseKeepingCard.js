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
} from "@material-ui/core"
import { ImportExport as CardIcon } from "@material-ui/icons"

import { Link } from "../navigation"
import { selectEntries } from "../entries"
import Papa from "papaparse"
import { orderBy } from "lodash"

const HouseKeepingCard = () => {
  const [isPending, setIsPending] = useState(false)
  const entries = useSelector(selectEntries)

  const disabled = isPending || entries.length === 0

  let exportAllEntriesText = `Export all my entries`
  if (entries.length === 0) {
    exportAllEntriesText = `No entries to export`
  }

  const exportAllEntries = async (event) => {
    setIsPending(true)
    event.preventDefault()

    const convertToCsv = Papa.unparse(transformAndSortEntries(entries))
    openSaveFileDialog(convertToCsv, "pow-export.csv", ".csv")

    setIsPending(false)
  }

  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar>
            <CardIcon />
          </Avatar>
        }
        title="Import / Export"
      />

      <CardContent>
        <Box mb={2}>
          <Typography variant="body1" component="h2">
            Import
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Would you like to import data from another app? If so let us know by
            getting in touch on{" "}
            <Link
              target="_blank"
              href={`mailto:support@usepow.app?subject=Import&body=${MAILTO_BODY}`}
            >
              support@usepow.app
            </Link>
            .
          </Typography>
        </Box>

        <Box mb={2} mt={4}>
          <Typography variant="body1" component="h2">
            Export
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Export your POW! data as a .csv file with the columns: date, note
            and tags.
          </Typography>
        </Box>

        <Button
          disabled={disabled}
          variant="outlined"
          color="secondary"
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

const MAILTO_BODY = `
%0D%0AWe would love to offer imports, but to do so we need your help!
%0D%0A%0D%0AIt would be great if you could tell us more about the import you need.
%0D%0A%0D%0AWhat app would you like to import from?
%0D%0AWould you be willing to provide us with an example file?
`

const transformAndSortEntries = (entries) => {
  const transformed = entries.map(({ entryId, note, tags }) => {
    return {
      date: entryId,
      note,
      tags,
    }
  })

  return orderBy(transformed, "date", "desc")
}

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
