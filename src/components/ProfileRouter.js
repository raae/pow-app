import React from "react"
import { Router } from "@reach/router"
//import { BrowserRouter, Route, Switch } from "react-router-dom"
import ProfileEditPage from "./ProfileEditPage"
import ProfileYearPicker from "../components/ProfileYearPicker"
// import ProfileNotFound from "../ProfileNotFound"
// <ProfileNotFound path="/what?"
const ProfileRouter = () => (
  <Router basepath="/profile">
    <ProfileEditPage path="/edit" />
    <ProfileYearPicker path="/gotoyear" />
  </Router>
)
export default ProfileRouter

// <BrowserRouter>
// <Switch>
//   <Route exact path="/" component={ProfileIndexPage} />
// </Switch>
// </BrowserRouter>
