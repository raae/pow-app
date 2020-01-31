import slice from "./slice"

export * from "./slice"
export { default as epics } from "./epics"
export const {
  purchase: purchaseSubscription,
  validate: validateSubscription,
} = slice.actions
export default slice
