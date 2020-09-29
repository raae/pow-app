import { createSlice, createSelector } from "@reduxjs/toolkit"

const DRAWER_STATE = {
  OPEN: "[Drawer State] Open",
  CLOSED: "[Drawer State] Closed",
}

const defaultState = {
  drawerState: DRAWER_STATE.CLOSED,
}

const appSlice = createSlice({
  name: "app",
  initialState: defaultState,
  reducers: {
    openDrawer: (state) => {
      state.drawerState = DRAWER_STATE.OPEN
    },
    closeDrawer: (state) => {
      state.drawerState = DRAWER_STATE.CLOSED
    },
  },
})

const selectAppSlice = (state) => state[appSlice.name]

export const selectIsDrawerOpen = createSelector([selectAppSlice], (slice) => {
  return slice.drawerState === DRAWER_STATE.OPEN
})

export const name = appSlice.name
export const actions = appSlice.actions
export default appSlice.reducer
