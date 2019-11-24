import slice from "./slice"

export * from "./slice"
export { default as epics } from "./epics"
export const { updateMenstruationTag } = slice.actions
export default slice
