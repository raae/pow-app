import slice from "./slice"

export * from "./slice"
export { default as epics } from "./epics"
export const { updateEntry } = slice.actions
export default slice
