import React from "react"
import { navigate } from "gatsby"

import {
  AppBar,
  Button,
  Toolbar,
  IconButton,
  Typography,
  makeStyles,
} from "@material-ui/core"
import ArrowBackIcon from "@material-ui/icons/ArrowBack"

import UserForm from "./UserForm"

// const useStyles = ...
const useStyles = makeStyles((theme) => ({
  offset: theme.mixins.toolbar,
  content: {
    maxWidth: "50rem",
    margin: "0 auto",
    alignContent: "stretch",
  },
  appBar: {
    top: 0,
  },
  toolbar: {
    width: "100%",
    maxWidth: "55rem",
    margin: "0 auto",
  },

  title: {
    flexGrow: 1,
  },
  form: {
    padding: theme.spacing(3, 2),
    maxWidth: "32rem",
    minHeight: "10rem",
    height: "80vh",
    maxHeight: "25rem",

    "& > div": {
      height: "90%",
      "& > div": {
        height: "100%",
        "& > textarea": {
          height: "100% !important",
        },
      },
    },
  },
}))

const ProfileEmailEditForm = () => {
  return <p>A New ProfileEmailEditForm</p>
}

const ProfileEditPage = ({ variant }) => {
  const classes = useStyles()

  const handleDone = () => {
    // event.preventDefault()

    navigate(`/profile/`)
    console.log("handleDone")
  }

  return (
    <div className={classes.content}>
      <div className={classes.offset} />
      <ProfileEmailEditForm>Yo!</ProfileEmailEditForm>
      <UserForm variant="update" onDone={handleDone} className={classes.form}>
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar className={classes.toolbar}>
            <IconButton
              type="reset"
              edge="start"
              color="inherit"
              aria-label="menu"
            >
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              ProfileEditPage
            </Typography>
            <Button
              type="submit"
              edge="end"
              variant="contained"
              color="primary"
            >
              Update
            </Button>
          </Toolbar>
        </AppBar>
      </UserForm>
    </div>
  )
}

export default ProfileEditPage

// import React from "react"

// class YearPicker extends React.Component {
//   iPickedAYear = React.createRef()
//   //   changeMyEmail = event => {
//   goToYear = (event) => {
//     //console.log("changeMyEmail");
//     //     // 1. stop
//     event.preventDefault()
//     //     // 2. get the year from form
//     //const email=
//     const pickedYear = this.iPickedAYear.current.value
//     //     // 3. Change the year in userbase = timeShip API
//     this.props.history.push(`/year/${pickedYear}`)
//   }

//   render() {
//     return (
//       <form onSubmit={this.goToYear}>
//         <h2>YearPicker</h2>

//         <input
//           ref={this.iPickedAYear}
//           type="text"
//           id="email"
//           required
//           placeholder="1554"
//         />
//         <button type="submit">Update Year -></button>
//       </form>
//     )
//   }
// }

// export default YearPicker
