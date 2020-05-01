import React from "react"
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Typography,
  makeStyles,
  Chip,
} from "@material-ui/core"
import { Link } from "../components/Link"
import { useCycleDayState } from "../cycle"
import { formatDate, entryIdFromDate, makeDate } from "../utils/days"
import { useDataState } from "../database"

const ListItemBackcast2 = ({ entryId }) => {
  const { entries } = useDataState()
  const entryNote = entries[entryId] ? entries[entryId].note : ""

  const { cycleDay, isMensturation, prediction } = useCycleDayState({
    date: makeDate(entryId),
    note: entryNote,
  })

  return (
    <>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            {" "}
            <span>DAY</span>
            <span>{cycleDay}</span>
          </Avatar>
        </ListItemAvatar>
      </ListItem>
      <p>
        Made with ❤ <br /> by{" "}
        <Link target="_blank" rel="noopener" href="https://twitter.com/raae">
          @raae
        </Link>{" "}
        of{" "}
        <Link target="_blank" rel="noopener" href="https://lillylabs.no">
          Lilly Labs
        </Link>
        .
        <br />
      </p>
    </>
  )
}

const ForeOrBackcast2 = ({ interval }) => {
  return (
    <>
      <List>
        {interval.map((date) => {
          const id = entryIdFromDate(date)
          return <ListItemBackcast2 key={id} entryId={id} />
        })}
      </List>
    </>
  )
}

export default ForeOrBackcast2
