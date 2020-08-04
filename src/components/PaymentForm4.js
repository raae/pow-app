import React from "react"
import { loadStripe } from "@stripe/stripe-js"
import userbase from "userbase-js"
import { useAuthState, useAuthActions } from "../auth"

const PaymentForm2 = () => {
  const { signIn, signUp, purchaseSubscription } = useAuthActions()

  function handlePayment2(event) {
    // P.L.A.N. Ruby's Rescue Mission
    // PREVENT & LISTEN
    // AWAIT & NAVIGATE
    // 1. PREVENT Princess Lizabeth from defaultly submitting to Queen Mary 1.'s house arrest
    event.preventDefault()

    // 2. LISTEN for the paybutton Ruby
    const successUrl = "http://localhost:8000/success"
    const cancelUrl = "http://localhost:8000/cancel"

    purchaseSubscription({ successUrl, cancelUrl })
    return

    // const username = event.target.elements.usernameInput.value
    // const password = event.target.elements.pasSwordInput.value

    // 3. AWAIT the Answer from Daniel V.'s Userbase library,

    // const pasSwordAnswer = await userbase
    //   .signUp({ username, password, rememberMe: "none" })
    //   .then((user) => showTimeShipTodos(user.username))
    //   .catch((event) => (event.target.elements.signupError.innerHTML = event))
    //document.getElementById('signup-error').innerHTML = event)

    // Ruby's pasSwordQuestion: "is this pasSword invalid?"
  }

  return (
    <div>
      <form onSubmit={handlePayment2}>
        <button type="submit">Pay</button>
      </form>
      <div id="signupError"></div>
    </div>
  )
}
export default PaymentForm2
