import produce from "immer"

export const defaultState = {
  user: null,
  isPending: true,
  error: null,
}

const reducer = (draft, action) => {
  switch (action.type) {
    case "init":
    case "signUp":
    case "signIn":
    case "signOut":
      draft.isPending = true
      return
    case "initFulfilled":
    case "signUpFulfilled":
    case "signInFulfilled":
    case "signOutFulfilled":
      draft.isPending = false
      draft.user = action.user
      draft.error = null
      return
    case "initFailed":
    case "signUpFailed":
    case "signInFailed":
    case "signOutFailed":
      draft.isPending = false
      draft.error = action.error
      return

    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

export default produce(reducer)
