import React from "react"
import { Container } from "@material-ui/core"
import Entry from "./Entry"

const EntryList = ({ entries }) => {
  return (
    <Container>
      {entries.map((entry) => {
        console.log(entry)
        return <Entry key={entry.date} entry={entry}></Entry>
      })}
    </Container>
  )
}

export default EntryList
