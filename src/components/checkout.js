import React from "react"
const buttonStyles = {
  fontSize: "16px",
  textAlign: "center",
  color: "#fff",
  outline: "none",
  padding: "12px 60px",
  boxShadow: "2px 5px 10px rgba(0,0,0,.1)",
  backgroundColor: "rgb(255,0,0)",
  borderRadius: "6px",
  letterSpacing: "1.5px",
}
const Checkout = class extends React.Component {
  // Initialise Stripe.js with your publishable key.
  // You can find your key in the Dashboard:
  // https://dashboard.stripe.com/account/apikeys
  componentDidMount() {
    this.stripe = window.Stripe("pk_test_XiirziufElakjoOpyuyCrPfo")
  }
  async redirectToCheckout(event) {
    event.preventDefault()
    const { error } = await this.stripe.redirectToCheckout({
      items: [
        { sku: "sku_Fvit7rtTpQFLdF", quantity: 1, name: "GOLD" },
        { sku: "sku_G7M4RU5r64wP4L", quantity: 1, name: "SILVER" },
        { sku: "sku_G7M4igcIzjEhU2", quantity: 1, name: "BRONZE" },
      ],
      successUrl: `https://www.usepow.app/`,
      cancelUrl: `http://localhost:8000/`,
    })
    if (error) {
      console.warn("Error:", error)
    }
  }
  render() {
    return (
      <button
        style={buttonStyles}
        onClick={(event) => this.redirectToCheckout(event)}
      >
        Invest in POW! {this.props.price} {this.props.name}
      </button>
    )
  }
}
export default Checkout

// backgroundColor: "rgb(229,57,53)",
