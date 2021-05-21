import React from "react"
import { PaymentForm } from "../../payment"

const NoPayment = () => {
  return (
    <>
      <p>
        Seems you have not yet subscribed to our service, please fill in the
        details below so you can start taking charge of your menstrual cycle.
      </p>
      <PaymentForm standalone={false} />
    </>
  )
}

export default NoPayment
