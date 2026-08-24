export const trackGoal = (goalId) => {
  try {
    window.fathom.trackGoal(goalId, 0)
    if (!import.meta.env.PROD) {
      console.log("Track fathom goal", goalId)
    }
  } catch (error) {
    console.warn("No fathom, cannot track goal", goalId)
  }
}

// Replaces @raae/gatsby-plugin-fathom: injects the tracker when a site id is
// configured, and stays out of the way (no script, trackGoal warns) when not.
export const initFathom = () => {
  const site = import.meta.env.FATHOM_SITE
  if (!site) return

  const script = document.createElement("script")
  script.src = "https://cdn.usefathom.com/script.js"
  script.dataset.site = site
  script.dataset.includedDomains =
    import.meta.env.FATHOM_INCLUDED_DOMAINS || "my.usepow.app"
  script.defer = true
  document.head.appendChild(script)
}
