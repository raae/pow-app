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

const useStyles = makeStyles((theme) => ({
  avatar: {
    backgroundColor: theme.palette.primary.main,
  },
  listItem: {
    display: "flex",
    flexWrap: "wrap",
  },
}))

const DangerCard = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [isPending, setIsPending] = useState(false)
  const entries = useSelector(selectEntries)

  const disabled = isPending || entries.length === 0

  let deleteAllEntriesText = `Delete all my entries`
  if (entries.length === 0) {
    deleteAllEntriesText = "No entries to delete"
  } else if (isPending) {
    deleteAllEntriesText = "Deleting entries"
  }

  const deleteAllEntries = async () => {
    const CONFIRMATION_STRING = "DELETE"

    setIsPending(true)

    const confirmation = prompt(
      `Please type ${CONFIRMATION_STRING} to confirm deletion of all your entries.`
    )

    if (confirmation !== CONFIRMATION_STRING) {
      if (confirmation !== null) {
        alert(
          `You typed "${confirmation}", not "${CONFIRMATION_STRING}", please try again.`
        )
      }
    } else {
      const { error } = await dispatch(emptyEntries())

      if (error) {
        alert(`Oopsie (${error.message}), please try again.`)
      } else {
        alert(`Success, all your entries were deleted.`)
      }
    }

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
        title="Danger Zone"
      />

      <CardContent>
        <Box mb={2}>
          <Typography variant="body1" component="h2">
            In need of a fresh start?
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Use with caution as your entries will be lost forever.
          </Typography>
        </Box>

        <Button
          disabled={disabled}
          variant="outlined"
          color="primary"
          onClick={deleteAllEntries}
        >
          {deleteAllEntriesText}
        </Button>
      </CardContent>
    </Card>
  )
}

export default DangerCard