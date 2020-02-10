import React from "react"

import { TextField, InputAdornment } from "@material-ui/core"

import BrandLayout from "../../components/BrandLayout"
import BrandCopy from "../../components/BrandCopy"

import Navigation from "./navigation"

const TagRoute = ({ defaults, settings, state, handleChange, prev, next }) => {
  return (
    <BrandLayout footer={null}>
      <BrandCopy>
        <h1>Your main hashtag</h1>
        <p>A hashtag is also used to track the days you menstruate.</p>
        <ul>
          <li>You can stick with the default: #period</li>
          <li>Or input whatever works for you.</li>
        </ul>
        <TextField
          label="Your menstruation hashtag"
          variant="outlined"
          value={state.tag}
          onChange={handleChange("tag")}
          placeholder={defaults.tag}
          InputProps={{
            startAdornment: <InputAdornment position="start">#</InputAdornment>,
          }}
        />
        <p>
          On days you menstruate add your hashtag (#{settings.tag}) to entries:{" "}
        </p>
        <ul>
          <li>Feeling #tired and its got my #{settings.tag}.</li>
          <li>#{settings.tag}</li>
          <li>#{settings.tag} #cramps #tired</li>
        </ul>
        <Navigation prev={prev} next={next} />
      </BrandCopy>
    </BrandLayout>
  )
}

export default TagRoute
