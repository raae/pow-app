import slice from "./slice"

export * from "./slice"
export { default as epics } from "./epics"
export const {
  createCustomer,
  purchase: purchaseSubscription,
  validate: validateSubscription,
} = slice.actions
export default slice
