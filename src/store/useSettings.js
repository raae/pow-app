import { useStore } from "./store"
import { MENSTRUATION_SETTINGS_KEY } from "./constants"

const useSettings = () => {
  const [{ settings }, setState] = useStore()

  const updateSettings = (key, settings) => {
    setState((state) => ({
      ...state,
      settings: {
        ...state.settings,
        [key]: {
          ...settings,
          timestamp: Date.now(),
        },
      },
    }))
  }

  const overrideAllSettings = (newSettings) => {
    setState((state) => ({
      ...state,
      settings: newSettings,
    }))
  }

  const getSettings = (key) => {
    if (!settings.hasOwnProperty(key)) {
      console.warn(`No ${key} on settings slice of state`)
    }
    return settings[key]
  }

  const setMenstruationSettings = (settings) => {
    return updateSettings(MENSTRUATION_SETTINGS_KEY, settings)
  }

  return [
    {
      settings,
      menstruationSettings: getSettings(MENSTRUATION_SETTINGS_KEY),
    },
    {
      setMenstruationSettings,
      overrideAllSettings,
    },
  ]
}

export default useSettings
