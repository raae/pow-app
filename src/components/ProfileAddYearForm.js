import React from "react"

class ProfileAddYearForm extends React.Component {
  render() {
    return <form className="year-edit" onSubmit={this.createYear}></form>
  }
}

export default ProfileAddYearForm

// class AddYearForm extends React.Component {
//   yearRef = React.createRef();
//   emailRef = React.createRef();
//   createYear = event => {
//     // 1 stop
//     event.preventDefault();
//     const fish = {
//       year: this.yearRef.current.value,
//       email: this.emailRef.current.value
//     };
//     this.props.addFish(fish);
//     // refresh
//     event.currentTarget.reset();
//   };
//   render() {
//     return (
//       <form className="year-edit" onSubmit={this.createYear}>
//         <input
//           ref={this.emailRef}
//           name="email"
//           type="text"
//           placeholder="🦄😺@usepow.app"
//         />
//         <input ref={this.yearRef} name="year" type="text" placeholder="1554" />
//         <button type="submit">Go To Year</button>
//       </form>
//     );
//   }
// }

// 9:10 onSubmit={this.createYear}
// 12:0     console.log(fish);
// 13:13 Q: We have this fish, the fish needs to get into state
// How do We get the fish into state?
// Where does State live
// How do the data live at a higher level?
// You can't pass data up, but you can always pass data down
//
// 19:00 this.props.addFish(fish);
// 9:10
// 9:10
// 9:10
// 9:10
// 9:10
// 9:10
