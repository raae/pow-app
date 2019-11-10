// Help me make the best possible privacy-first menstrual tracker by becoming a POW! Angel

// As you might know, I am working towards an official pow launch on March 8th (also known as International Women's Day).

// Some of you have said to me, "Benedicte, I did not realize you were such a prude! Why do you mind so much that people might find out when you are next menstruating? "

// Let me start by informing you that these apps do way more than logging the days you menstruate. They ask you to record if you are feeling excited, tired, anxious, horny, the quality and quantity of your sex life and if you remembered to use protection. And even more!

// For me, the journey started with a personal want for a more straightforward tool. The level of detail made me less inclined to use the apps; it also felt creepy, a little invasive.

// It turned out my intuition (and maybe yours) was right.

// In February, the Wall Street Journal came out with a report that popular health apps, period trackers among them, were leaking data to Facebook Analytics.

// Then in September, BuzzFeed broke the news that several tracker apps were basing their business on selling their users' cycle data. No wonder they want you to be so specific.

// Then again, just now, in November, an Australian journalist told the world about her experience with her Internet life turning into a nightmare of smiling mothers and babies after forgetting to log her cycle. Her app had concluded she must be pregnant and let third parties in on this «secret» she herself did not know.

// You might still think, «You prude, I still don't mind if someone gets access to this data about me.»

// And that is ok; you do you!

// But please keep in mind some menstruaters live in countries without worker's protection or reproductive rights at the level you probably enjoy.

// Or you might be thinking, "Whoa, this is just creepy and wrong!"

// With this crowdfunding, I am inviting you to join the movement for less intrusive and more private apps.

// I hope to come up with a business model that takes into account the menstruators that, for various reasons, cannot pay. They might not have access to a credit card; they might not want their partner or family to know by way of credit card statements, or they might not have the money for it.

// As a POW! Angel, you get to kickstart this by buying lifetime access for yourself and/or other people who self identify as not being able to pay.

// I plan to develop both the business and the app in the open. By doing so, I hope to demonstrate that people are willing to pay for privacy and educate the community around POW! about why privacy is important and how to go about it.

// However, the first order of business is to get POW! ready for an official launch March 8th, and with your help:

//     I can spend more time on POW!
//     Get external help where needed.

// POW! Bronze Angel
// 500 NOK - 15 spots

//     Lifetime access to POW! for one person.

// POW! Silver Angel
// 2000 NOK - 10 spots

//     Lifetime access to POW! for five people.
//     VIP Treatment at the launch party you and guest.

// POW! Gold Angel
// 5000 NOK - 5 spots

//     Lifetime access to POW! for ten people.
//     VIP Treatment at the launch party you and guest.

// POW! Diamond Angel
// 35.000 NOK - 3 spots

//     Lifetime access to POW! for ten people.
//     VIP Treatment at the launch party you and guest.
//     A 30-minute talk on privacy in apps to be delivered after March 8th anywhere in Scandinavia or as a video conference.

// You have until December X to become a POW! Angel, and if you do know that I thank you from the bottom of my heart.
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
