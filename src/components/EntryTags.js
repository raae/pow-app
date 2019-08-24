import React from "react"
import { IconButton, Paper, Chip, makeStyles } from "@material-ui/core"
import AddIcon from "@material-ui/icons/Add"

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    "& > *": {
      margin: theme.spacing(0.5),
    },
  },
}))

const Tag = ({ selected, confidence, label }) => {
  if (selected) {
    return <Chip color="primary" label={label}></Chip>
  } else {
    return (
      <Chip
        variant="outlined"
        label={label}
        style={{ opacity: confidence }}
      ></Chip>
    )
  }
}

const EntryTags = ({ tags }) => {
  const classes = useStyles()

  return (
    <Paper className={classes.root}>
      {tags.map((tag) => {
        return <Tag key={tag.label} {...tag}></Tag>
      })}
      <IconButton size="small">
        <AddIcon></AddIcon>
      </IconButton>
    </Paper>
  )
}

export default EntryTags
