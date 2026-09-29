import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'

type AccessibilityContextValue = {
  contrast: boolean
  fontZoom: number
  setContrast: (value: boolean) => void
  setFontZoom: (value: number) => void
}

type SavedPreferences = Pick<AccessibilityContextValue, 'contrast' | 'fontZoom'>

const storageKey = 'lsc_accessibility_preferences'
const AccessibilityContext = createContext<AccessibilityContextValue | null>(null)

export function AccessibilityProvider({ children }: { children: ReactNode }) {
  const [contrast, setContrast] = useState(false)
  const [fontZoom, setFontZoom] = useState(100)
  const [preferencesReady, setPreferencesReady] = useState(false)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(storageKey)
      if (stored) {
        const preferences = JSON.parse(stored) as Partial<SavedPreferences>
        if (typeof preferences.contrast === 'boolean') setContrast(preferences.contrast)
        if (typeof preferences.fontZoom === 'number') setFontZoom(Math.min(150, Math.max(80, preferences.fontZoom)))
      }
    } catch {
      localStorage.removeItem(storageKey)
    }
    setPreferencesReady(true)
  }, [])

  useEffect(() => {
    if (preferencesReady) {
      localStorage.setItem(storageKey, JSON.stringify({ contrast, fontZoom }))
    }
  }, [contrast, fontZoom, preferencesReady])

  const value = useMemo(() => ({ contrast, fontZoom, setContrast, setFontZoom }), [contrast, fontZoom])

  return <AccessibilityContext.Provider value={value}>{children}</AccessibilityContext.Provider>
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext)
  if (!context) throw new Error('useAccessibility debe usarse dentro de AccessibilityProvider.')
  return context
}
