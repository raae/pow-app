import React from "react"
import { IconButton, Paper, Chip, makeStyles } from "@material-ui/core"
import AddIcon from "@material-ui/icons/Add"
import { underline } from "ansi-colors"

const useStyles = makeStyles((theme) => ({
  root: {
    zIndex: 100,
    padding: theme.spacing(2),
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

const EntryMain = ({ tags }) => {
  const classes = useStyles()

  return (
    <Paper className={classes.root}>
      {!tags.length ? <NoTags></NoTags> : <Tags tags={tags}></Tags>}
    </Paper>
  )
}

export default EntryMain
