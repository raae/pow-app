export const STRIPE_KEY = process.env.GATSBY_STRIPE_KEY
export const BASE_URL =
  typeof window !== `undefined` ? window.location.origin : ""
