import React from "react"
import { Container } from "@material-ui/core"
import Entry from "./Entry"

const EntryList = ({ entries = [] }) => {
  return (
    <Container>
      {entries
        .sort((a, b) => (b.date > a.date ? 1 : -1))
        .map((entry) => {
          return <Entry key={entry.date} entry={entry}></Entry>
        })}
    </Container>
  )
}

export default EntryList
