import { useUser } from "./useUser"

export const useSubscription = () => {
  const UPDATABLE_STATUSES = ["incomplete", "active", "past_due"]
  const { user, isLoading } = useUser()

  return {
    isLoading,
    isSubscribed: user?.subscriptionStatus === "active",
    isSubscriptionUpdatable: UPDATABLE_STATUSES.includes(
      user?.subscriptionStatus
    ),
    cancelSubscriptionAt: user?.cancelSubscriptionAt,
    subscriptionPlanId: user?.subscriptionPlanId,
  }
}
