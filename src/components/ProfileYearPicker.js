//import sausage meat
import React from "react"

// make your  sausage or whatever your trying to make
class ProfileYearPicker extends React.Component {
  iPickedAYear = React.createRef()
  // a property set to an arrow function
  // property goToYear is bound to the instance
  goToYear = (event) => {
    // 1. stop
    event.preventDefault()
    // 2. get the year from form
    console.log(this.iPickedAYear.current.value)
    //    const email=
    const pickedYear = this.iPickedAYear.current.value
    // 3. Change the year in userbase = timeShip API
    this.props.navigate(`/year/${pickedYear}`)
    console.log(this.props.navigate)

    console.log("picker")
  }
  render() {
    return (
      <form className="year-picker" onSubmit={this.goToYear}>
        <input
          type="text"
          ref={this.iPickedAYear}
          required
          placeholder="1554"
        />
        <button type="submit">Go To Year</button>
      </form>
    )
  }
}
// in order to surface it to other files in your application
export default ProfileYearPicker
