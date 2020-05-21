import React, { useState } from "react"
import { loadStripe } from "@stripe/stripe-js"
import Stripe from "stripe"
import userbase from "userbase-js"

const UserForm2 = () => {
  const handleTimeshipSignUp = (event) => {
    // P.L.A.N. Ruby's Rescue Mission
    // PREVENT & LISTEN
    // AWAIT & NAVIGATE
    // 1. PREVENT Princess Lizabeth from defaultly submitting to Queen Mary 1.'s house arrest
    event.preventDefault()

    // 2. LISTEN for the pasSword in Ruby's input.
    // The pasSword is Ruby's ___ _____

    const username = event.target.elements.usernameInput.value
    const password = event.target.elements.pasSwordInput.value

    userbase
      .signUp({ username, password, rememberMe: "none" })
      .then((user) => showTimeShipTodos(user.username))
      .catch((error) => {
        console.warn("User update failed", error.message)

        return { error }
      })
  }

  function showTimeShipTodos(user) {
    const successUrl = "http://localhost:8008/success"
    const cancelUrl = "http://localhost:8008/cancel"

    userbase.purchaseSubscription({ successUrl, cancelUrl })
    return

    // document.getElementById('auth-view').style.display = 'none'
    // document.getElementById('todo-view').style.display = 'block'
    // document.getElementById('username').innerHTML = username
  }

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
export default UserForm2
