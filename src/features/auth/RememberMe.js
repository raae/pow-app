import React from "react"
import PropTypes from "prop-types"
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  Typography,
  makeStyles,
} from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
  root: {
    marginLeft: theme.spacing(2),
    "& label + label": {
      marginTop: theme.spacing(-1.5),
    },
  },
}))

const RememberMeInput = ({ value, onChange }) => {
  const classes = useStyles()

  return (
    <RadioGroup
      aria-label="Remember me choices"
      name="rememberMe"
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className={classes.root}
    >
      <FormControlLabel
        value="local"
        control={<Radio size="small" />}
        label={
          <Typography variant="body2">Remember me on this device</Typography>
        }
      />
      <FormControlLabel
        value="session"
        control={<Radio size="small" />}
        label={
          <Typography variant="body2">
            Remember me until I close the browser
          </Typography>
        }
      />
      <FormControlLabel
        value="none"
        control={<Radio size="small" />}
        label={
          <Typography variant="body2">Do not remember me at all</Typography>
        }
      />
    </RadioGroup>
  )
}

RememberMeInput.propTypes = {
  value: PropTypes.oneOf("local, session, none").isRequired,
  onChange: PropTypes.func.isRequired,
}

export default RememberMeInput
