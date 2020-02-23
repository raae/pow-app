export const defaultState = {
  user: null,
  isPending: true,
  error: null,
}

export const reducer = (state, action) => {
  switch (action.type) {
    case "init":
    case "signUp":
    case "signIn":
    case "signOut":
      return {
        ...state,
        isPending: true,
      }
    case "initFulfilled":
    case "signUpFulfilled":
    case "signInFulfilled":
    case "signOutFulfilled":
      return {
        isPending: false,
        user: action.user,
        error: null,
      }
    case "initFailed":
    case "signUpFailed":
    case "signInFailed":
    case "signOutFailed":
      return {
        ...state,
        isPending: false,
        error: action.error,
      }

    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}
