import React from "react"

import {
  TextField,
  Checkbox,
  FormGroup,
  FormControlLabel,
  makeStyles,
} from "@material-ui/core"

import Favorite from "@material-ui/icons/Favorite"
import FavoriteBorder from "@material-ui/icons/FavoriteBorder"

import BrandLayout from "../../components/BrandLayout"
import BrandCopy from "../../components/BrandCopy"

import Navigation from "./navigation"

const useStyles = makeStyles((theme) => ({
  choices: {
    marginTop: 0,
    marginLeft: theme.spacing(2),
  },
}))

const TagRoute = ({ defaults, state, handleChange, prev, next }) => {
  const classes = useStyles()
  return (
    <BrandLayout footer={null}>
      <BrandCopy>
        <h1>Stay in the loop?</h1>
        <TextField
          label="Your email address"
          variant="outlined"
          type="email"
          value={state.email}
          onChange={handleChange("email")}
          placeholder={defaults.email}
        />
        <FormGroup className={classes.choices}>
          <small>Send me:</small>
          <FormControlLabel
            control={
              <Checkbox
                disabled={!state.email}
                checked={state.updates}
                onChange={handleChange("updates")}
                value="updates"
              />
            }
            label="Product updates"
          />
          <FormControlLabel
            control={
              <Checkbox
                disabled={!state.email}
                checked={state.newsletter}
                icon={<FavoriteBorder />}
                checkedIcon={<Favorite />}
                onChange={handleChange("newsletter")}
                value="newsletter"
              />
            }
            label="The POW! newsletter"
          />
        </FormGroup>
        <Navigation prev={prev} next={next} />
      </BrandCopy>
    </BrandLayout>
  )
}

export default TagRoute
