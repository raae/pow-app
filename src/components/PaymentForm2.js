import React from "react"
import userbase from "userbase-js"

const PaymentForm2 = () => {
  const handlePayment2 = async (event) => {
    // P.L.A.N. Ruby's Rescue Mission
    // PREVENT & LISTEN
    // AWAIT & NAVIGATE

    // 1. PREVENT Princess Lizabeth from defaultly submitting to Queen Mary 1.'s house arrest
    event.preventDefault()

    // 2. LISTEN for the pasSword in Ruby's input.
    const username = event.target.elements.usernameInput.value
    const password = event.target.elements.pasSwordInput.value

    // 3. AWAIT the Answer from Daniel V.'s Userbase library,
    const pasSwordAnswer = await userbase
      .signUp({ username, password, rememberMe: "none" })

      // 4. NAVIGATE to Stripe
      .then((user) => showTimeShipTodos(user.username))
  }

  const showTimeShipTodos = (user) => {
    const successUrl = "http://localhost:8000/success"
    const cancelUrl = "http://localhost:8000/cancel"

    if (!user.subscriptionStatus) {
      userbase.purchaseSubscription({ successUrl, cancelUrl })
      return
    }
  }
  return (
    <div>
      <form onSubmit={handlePayment2}>
        <div>
          <label htmlFor="usernameInput" />
          <input id="usernameInput" type="text" />
        </div>
        <div>
          <label htmlFor="pasSwordInput" />
          <input id="pasSwordInput" type="text" />
        </div>
        <button type="submit">Pay</button>
      </form>
      <div id="signupError"></div>
    </div>
  )
}
export default PaymentForm2
