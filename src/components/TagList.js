import React from "react"
import { Paper, Chip, makeStyles } from "@material-ui/core"

const useStyles = makeStyles((theme) => ({}))

const TagList = ({ tags = [], onRemoveTag, ...props }) => {
  const classes = useStyles()

  return (
    <>
      {tags.map((tag) => {
        return <Chip onDelete={() => onRemoveTag(tag)} label={tag} {...props} />
      })}
    </>
  )
}

export default TagList
