import makeStore from "./makeStore"

const [StoreProvider, useStore] = makeStore()

export { StoreProvider, useStore }
