import { useCallback } from "react"
import { useDispatch } from "react-redux"

import { useUser } from "../user/useUser"

import { purchaseSubscription } from "./slice"

export const useSubscription = () => {
  const dispatch = useDispatch()

  const UPDATABLE_STATUSES = ["incomplete", "active", "past_due"]
  const { user, isLoading } = useUser()

  const handlePurchaseSubscription = useCallback(
    (args) => {
      return dispatch(purchaseSubscription(args))
    },
    [dispatch]
  )

  return {
    isLoading,
    isSubscribed: user?.subscriptionStatus === "active",
    isSubscriptionUpdatable: UPDATABLE_STATUSES.includes(
      user?.subscriptionStatus
    ),
    cancelSubscriptionAt: user?.cancelSubscriptionAt,
    subscriptionPlanId: user?.subscriptionPlanId,
    purchaseSubscription: handlePurchaseSubscription,
  }
}
