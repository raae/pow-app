import { useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import { selectUserState, updateUser } from "./slice"

export const useUser = () => {
  const dispatch = useDispatch()
  const state = useSelector(selectUserState)

  const handleUpdateUser = useCallback(
    (payload) => {
      return dispatch(updateUser(payload))
    },
    [dispatch]
  )

  return {
    ...state,
    updateUser: handleUpdateUser,
  }
}

export const useSubscription = () => {
  const UPDATABLE_STATUSES = ["incomplete", "active", "past_due"]
  const { user } = useSelector(selectUserState)

  if (!user) {
    return {
      isSubscribed: false,
      isSubscriptionUpdatable: false,
      cancelSubscriptionAt: undefined,
      subscriptionPlanId: undefined,
    }
  } else {
    return {
      isSubscribed: user.subscriptionStatus === "active",
      isSubscriptionUpdatable: UPDATABLE_STATUSES.includes(
        user.subscriptionStatus
      ),
      cancelSubscriptionAt: user.cancelSubscriptionAt,
      subscriptionPlanId: user.subscriptionPlanId,
    }
  }
}
