import React, { useState } from "react"
import { loadStripe } from "@stripe/stripe-js"
import userbase from "userbase-js"

const UserForm3 = () => {
  const handleTimeshipSignUp = async (event) => {
    // P.L.A.N. Ruby's Rescue Mission
    // PREVENT & LISTEN
    // AWAIT & NAVIGATE
    // 1. PREVENT Princess Lizabeth from defaultly submitting to Queen Mary 1.'s house arrest
    event.preventDefault()

    // 2. LISTEN for the pasSword in Ruby's input.
    // The pasSword is Ruby's ___ _____

    const username = event.target.elements.usernameInput.value
    const password = event.target.elements.pasSwordInput.value

    const pasSwordAnswer = await userbase
      .signUp({ username, password, rememberMe: "none" })
      .then((user) => showTimeShipTodos(user.username))
    //  .catch((event) => (event.target.elements.signupError.innerHTML = event))
    //document.getElementById('signup-error').innerHTML = event)
    // 3. AWAIT the Answer from Daniel V.'s Userbase library,

    const showTimeShipTodos = (user) => {
      const successUrl = "http://localhost:8000/success"
      const cancelUrl = "http://localhost:8000/cancel"
      // 4. NAVIGATE to Stripe if this user has no subscriptionStatus

      userbase
        .purchaseSubscription({ successUrl, cancelUrl })
        .then(() => {
          console.log("Pay incoming")

          return
        })
        .catch((error) => {
          console.warn("payment failed", error.message)

          return { error }
        })

      //      userbase.purchaseSubscription({ successUrl, cancelUrl })
      //    return

      // Ruby's pasSwordQuestion: "is this pasSword invalid?"
    }
  }
  // show app

  return (
    <form onSubmit={handleTimeshipSignUp}>
      <div>
        <label htmlFor="pasSwordInput">PasSword ⚔️:</label>
        <input id="pasSwordInput" type="text" />
      </div>
      <div>
        <label htmlFor="usernameInput">Username</label>
        <input id="usernameInput" type="text" />
      </div>
      <button type="submit">Submit</button>
    </form>
  )
}
export default UserForm3
