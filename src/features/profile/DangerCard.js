import React, { useEffect, useState } from "react"
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
import { useSettings } from "../settings"

const useStyles = makeStyles((theme) => ({
  avatar: {
    backgroundColor: theme.palette.primary.main,
  },
}))

const DangerCard = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [isPending, setIsPending] = useState(false)
  const [isDisabledByKey, setIsDisabledKey] = useState({
    entries: true,
    tags: true,
  })

  const { deleteAllMensesTags, mensesTags } = useSettings()
  const entries = useSelector(selectAllEntries)

  useEffect(() => {
    setIsDisabledKey({
      entries: entries.length === 0 || isPending,
      tags: entries.length > 0 || mensesTags.length === 0 || isPending,
    })
  }, [entries, mensesTags, isPending])
  const trackGoal = (FATHOM_EXPORT) => {}
  const handleDeleteAllEntries = async () => {
    const CONFIRMATION_STRING = "DELETE"

    setIsPending(true)
    //here
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

  const handleDeleteAllMensesTags = async (event) => {
    setIsPending(true)

    const { error } = await deleteAllMensesTags()

    if (error) {
      alert(`Oopsie (${error.message}), please try again.`)
    } else {
      alert(`Success, all your period tags were deleted.`)
    }

    setIsPending(false)
  }

  const labels = {
    entries: "Delete all my entries",
    tags: "Delete my chosen period tag(s)",
  }

  if (entries.length === 0) {
    labels.entries = "No entries to delete"
  } else if (isPending.entries) {
    labels.entries = "Deleting entries"
  }

  if (mensesTags.length === 0) {
    labels.tags = "No period tags to delete"
  } else if (isPending.tags) {
    labels.tags = "Deleting tags"
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
            disabled={isDisabledByKey.entries}
            variant="outlined"
            color="primary"
            onClick={handleDeleteAllEntries}
          >
            {labels.entries}
          </Button>
          {entries.length === 0 && (
            <Button
              disabled={isDisabledByKey.tags}
              variant="outlined"
              color="primary"
              onClick={handleDeleteAllMensesTags}
            >
              {labels.tags}
            </Button>
          )}
        </CardContentSection>
      </CardContent>
    </Card>
  )
}

DangerCard.propTypes = {}

export default DangerCard
