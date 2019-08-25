import React, { useState } from "react"
import classnames from "classnames"
import { isToday } from "date-fns"
import {
  IconButton,
  Paper,
  Chip,
  TextField,
  InputAdornment,
  makeStyles,
} from "@material-ui/core"

import AddTag from "./AddTag"

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
    "& > [role='button'], & > button": {
      marginRight: theme.spacing(1),
      marginBottom: theme.spacing(1.25),
    },
    "& > span": {
      display: "inline-block",
    },
  },
}))

const Tag = ({ selected, confidence, label, toggleTagSelection }) => {
  return selected ? (
    <Chip
      clickable
      onClick={() => toggleTagSelection(label)}
      color="primary"
      label={label}
    />
  ) : (
    <Chip
      clickable
      onClick={() => toggleTagSelection(label)}
      variant="outlined"
      label={label}
      style={{ opacity: confidence }}
    />
  )
}

const NoTags = ({ children }) => {
  const classes = useStyles()
  return <div className={classes.tags}>{children}</div>
}

const Tags = ({ tags, predictions, onTagsSelectionChange, children }) => {
  const classes = useStyles()
  const choices = [...predictions]
  tags.forEach((label) => {
    const choice = predictions.find((pred) => pred.label === label)
    if (!choice) {
      choices.unshift({
        label,
      })
    }
  })

  const toggleTagSelection = (label) => {
    const tagIndex = tags.indexOf(label)
    if (tagIndex === -1) {
      onTagsSelectionChange([...tags, label])
    } else {
      onTagsSelectionChange([
        ...tags.slice(0, tagIndex),
        ...tags.slice(tagIndex + 1, tags.length),
      ])
    }
  }

  return (
    <div className={classes.tags}>
      {choices.map((prediction) => {
        return (
          <Tag
            key={prediction.label}
            selected={tags.includes(prediction.label)}
            toggleTagSelection={toggleTagSelection}
            {...prediction}
          ></Tag>
        )
      })}
      {children}
    </div>
  )
}

const EntryMain = ({ tags, predictions, date, onTagsChange }) => {
  const classes = useStyles()
  const today = isToday(new Date(date))
  const empty = tags.length === 0 && predictions.length === 0
  const onTagsSelectionChange = (tags) => {
    onTagsChange(tags)
  }

  const onAddTag = (label) => {
    onTagsChange([...tags, label])
  }

  return (
    <Paper
      elevation={today ? 3 : 1}
      className={classnames(classes.root, { [classes.today]: today })}
    >
      {empty ? (
        <NoTags>
          <AddTag onAddTag={onAddTag}></AddTag>
        </NoTags>
      ) : (
        <Tags
          tags={tags}
          predictions={predictions}
          onTagsSelectionChange={onTagsSelectionChange}
        >
          <AddTag onAddTag={onAddTag}></AddTag>
        </Tags>
      )}
    </Paper>
  )
}

export default EntryMain
