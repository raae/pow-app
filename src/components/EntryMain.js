import React from "react"
import classnames from "classnames"
import { isToday } from "date-fns"
import { IconButton, Paper, Chip, makeStyles } from "@material-ui/core"
import AddIcon from "@material-ui/icons/Add"
import { underline } from "ansi-colors"

const useStyles = makeStyles((theme) => ({
  root: {
    zIndex: 100,
    padding: theme.spacing(2),
  },
  today: {
    borderColor: theme.palette.primary.light,
    borderWidth: 2,
    borderStyle: "solid",
  },
  tags: {
    margin: theme.spacing(1),
    marginBottom: theme.spacing(-0.5),
    "& [role='button'], & button": {
      marginRight: theme.spacing(1),
      marginBottom: theme.spacing(1.25),
    },
    "& > span": {
      display: "inline-block",
    },
  },
  help: {
    textDecoration: underline,
  },
}))

const Tag = ({ selected, confidence, label }) => {
  if (selected) {
    return <Chip clickable color="primary" label={label}></Chip>
  } else {
    return (
      <Chip
        clickable
        variant="outlined"
        label={label}
        style={{ opacity: confidence }}
      ></Chip>
    )
  }
}

const Tags = ({ tags }) => {
  const classes = useStyles()
  const lastTag = tags.pop()
  return (
    <div className={classes.tags}>
      {tags.map((tag) => {
        return <Tag key={tag.label} {...tag}></Tag>
      })}
      <span>
        <Tag key={lastTag.label} {...lastTag}></Tag>
        <IconButton size="small" aria-label="Add tag">
          <AddIcon></AddIcon>
        </IconButton>
      </span>
    </div>
  )
}

const NoTags = () => {
  const classes = useStyles()
  return (
    <div className={classes.tags}>
      <IconButton size="small" aria-label="Add tag">
        <AddIcon></AddIcon>
      </IconButton>
    </div>
  )
}

const EntryMain = ({ tags, date }) => {
  const classes = useStyles()
  const today = isToday(new Date(date))
  console.log("is today", today)
  return (
    <Paper
      elevation={today ? 3 : 1}
      className={classnames(classes.root, { [classes.today]: today })}
    >
      {!tags.length ? <NoTags></NoTags> : <Tags tags={tags}></Tags>}
    </Paper>
  )
}

export default EntryMain
