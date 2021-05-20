import React, { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import {
  Avatar,
  Button,
  Card,
  CardHeader,
  CardContent,
  makeStyles,
} from "@material-ui/core"
import { ErrorOutline as DangerIcon } from "@material-ui/icons"

import { CardContentSection } from "../../components"

import { selectAllEntries, deleteAllEntries } from "../entries"

const useStyles = makeStyles((theme) => ({
  avatar: {
    backgroundColor: theme.palette.primary.main,
  },
}))

const DangerCard = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [isPending, setIsPending] = useState(false)
  const entries = useSelector(selectAllEntries)

  const disabled = isPending || entries.length === 0

  let deleteAllEntriesText = `Delete all my entries`
  if (entries.length === 0) {
    deleteAllEntriesText = "No entries to delete"
  } else if (isPending) {
    deleteAllEntriesText = "Deleting entries"
  }

  const handleDeleteAllEntries = async () => {
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
      const { error } = await dispatch(deleteAllEntries())

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
        <CardContentSection
          title="In need of a fresh start?"
          subheader="Use with caution as your entries will be lost forever."
        >
          <Button
            disabled={disabled}
            variant="outlined"
            color="primary"
            onClick={handleDeleteAllEntries}
          >
            {deleteAllEntriesText}
          </Button>
        </CardContentSection>
      </CardContent>
    </Card>
  )
}

DangerCard.propTypes = {}

export default DangerCard
