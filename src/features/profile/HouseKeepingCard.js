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

const HouseKeepingCard = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [isPending, setIsPending] = useState(false)
  const entries = useSelector(selectEntries)

  const disabled = isPending || entries.length === 1

  let deleteAllEntriesText = `Export all my entries`
  // if (entries.length === 0) {
  //   deleteAllEntriesText = "No entries to export"
  // } else if (isPending) {
  //   deleteAllEntriesText = "Export entries"
  // }

  const exportAllEntries = async (event) => {
    event.preventDefault();
    alert(`Export`)

//     const CONFIRMATION_STRING = "EXPORT"

//     setIsPending(true)

//     const confirmation = prompt(
//       `Please type ${CONFIRMATION_STRING} to confirm export of all your entries.`
//     )

//     if (confirmation !== CONFIRMATION_STRING) {
//       if (confirmation !== null) {
//         alert(
//           `You typed "${confirmation}", not "${CONFIRMATION_STRING}", please try again.`
//         )
//       }
//     } else {
  // https://userbase.com/docs/sdk/get-databases/
      const { error } = await dispatch(getDatabases())

//       if (error) {
//         alert(`Oopsie (${error.message}), please try again.`)
//       } else {
//         alert(`Success, all your entries were exported.`)
//       }
//     }

//     setIsPending(false)
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
            Use with caution as your entries will be un-encrypted.
          </Typography>
        </Box>

        <Button
          disabled={disabled}
          variant="outlined"
          color="primary"
          onClick={exportAllEntries}
        >
          {deleteAllEntriesText}
        </Button>
      </CardContent>
    </Card>
  )
}

HouseKeepingCard.propTypes = {}

export default HouseKeepingCard
