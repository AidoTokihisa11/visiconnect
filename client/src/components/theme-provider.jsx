import React, { createContext, useContext, useEffect, useState } from "react"
 
const initialState = {
  theme: "system",
  setTheme: () => null,
}
 
const ThemeProviderContext = createContext(initialState)
 
export function ThemeProvider({
  children,
  defaultTheme = "light", // Forced default to light
  storageKey = "vite-ui-theme",
  ...props
}) {
  // FORCE LIGHT MODE: Ignore storage and system preference for now
  const [theme, setTheme] = useState("light")
 
  useEffect(() => {
    const root = window.document.documentElement
 
    root.classList.remove("light", "dark")
    root.classList.add("light") // Always add light class
    
    // Original logic commented out for now
    /*
    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light"
 
      root.classList.add(systemTheme)
      return
    }
 
    root.classList.add(theme)
    */
  }, [theme])
 
  const value = {
    theme,
    setTheme: (theme) => {
      // localStorage.setItem(storageKey, theme)
      // setTheme(theme)
      console.log("Dark mode is currently disabled")
    },
  }
 
  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}
 
export const useTheme = () => {
  const context = useContext(ThemeProviderContext)
 
  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider")
 
  return context
}