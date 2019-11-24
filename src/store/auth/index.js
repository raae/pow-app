import slice from "./slice"

export * from "./slice"
export { default as epics } from "./epics"
export const { signIn, signOut } = slice.actions
export default slice
