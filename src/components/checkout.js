// import React, { useState, useEffect } from "react"
// import { Button } from "@material-ui/core"

// const STRIPE_KEY = "pk_test_XiirziufElakjoOpyuyCrPfo"

// // const BRONZE_SKU = "sku_G7M4igcIzjEhU2"
// // const SILVER_SKU = "sku_G7M4RU5r64wP4L"
// // const GOLD_SKU = "sku_Fvit7rtTpQFLdF"
// // const DIAMOND_SKU = "sku_G7"

// const cheButton = (props) => {
//   const [stripe, setStripe] = useState()

//   useEffect(() => {
//     setStripe(window.Stripe(STRIPE_KEY))
//   }, [])

//   const placeOrder = (sku) => {
//     stripe.redirectToCheckout({
//       items: [
//         {
//           sku,
//           quantity: 1,
//         },
//       ],
//       successUrl: "http://localhost:8000/success",
//       cancelUrl: "http://localhost:8000/cancel",
//     })
//   }
//   return (
//     <Button
//       onClick={() => placeOrder(props.skuPropProp)}
//       variant="contained"
//       color="primary"
//     >
//       {props.buttonTextPropProp}
//     </Button>
//   )
// }
// export default cheButton
