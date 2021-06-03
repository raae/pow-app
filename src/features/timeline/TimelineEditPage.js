import React, { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { navigate } from "gatsby"

import { Typography, makeStyles, Paper } from "@material-ui/core"

import { formatDate, makeDate } from "../utils/days"

import { AppLayout, AppEditToolbar, AppPage } from "../app/"
import { selectEntryNote, upsertEntry, EntryNoteField } from "../entries"

const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    flexDirection: "column-reverse",
    padding: theme.spacing(3),
    minHeight: "10rem",
    maxHeight: "17rem",
    height: "80vh",

    "& > div": {
      height: "100%",
      "& > div": {
        height: "100%",
        "& > textarea": {
          height: "100% !important",
        },
      },
    },
  },
}))

const CycleEditPage = ({ entryId, path }) => {
  const classes = useStyles()
  const date = makeDate(entryId)
  const redirectTo = path.includes("/calendar")
    ? `/timeline/calendar/${entryId}`
    : `/timeline/${entryId}`
  const dispatch = useDispatch()
  const entryNote = useSelector((state) => selectEntryNote(state, { entryId }))
  const [note, setNote] = useState(entryNote)

  const handleNoteChange = (event) => {
    setNote(event.target.value)
  }

  const handleReset = (event) => {
    event.preventDefault()
    setNote(entryNote)
    navigate(redirectTo)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    dispatch(upsertEntry({ date, note }))
    navigate(redirectTo)
  }

  return (
    <AppLayout>
      <form
        noValidate
        onReset={handleReset}
        onSubmit={handleSubmit}
        className={classes.form}
      >
        <AppPage>
          <Paper className={classes.paper}>
            <EntryNoteField
              label={entryNote ? "Edit entry" : "Add an entry"}
              onNoteChange={handleNoteChange}
              note={note}
              margin="none"
              variant="standard"
              color="secondary"
            />
          </Paper>
        </AppPage>

        <AppEditToolbar>
          <Typography variant="h6" className={classes.title}>
            {formatDate(date, "MMMM do")}
          </Typography>
        </AppEditToolbar>
      </form>
    </AppLayout>
  )
}

export default CycleEditPage
