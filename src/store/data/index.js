import slice from "./slice"

export * from "./slice"
export { default as epics } from "./epics"
export const { fetch: fetchData, save: saveData } = slice.actions
export default slice
