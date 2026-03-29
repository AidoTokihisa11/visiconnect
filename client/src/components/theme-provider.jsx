import React, { createContext, useContext, useEffect } from "react"
 
const initialState = {
  theme: "system",
  setTheme: () => null,
}
 
const ThemeProviderContext = createContext(initialState)
 
export function ThemeProvider({
  children,
  defaultTheme = "light",
  storageKey = "vite-ui-theme",
  ...props
}) {
  const theme = "light"
 
  useEffect(() => {
    const root = window.document.documentElement
 
    root.classList.remove("light", "dark")
    root.classList.add("light")
  }, [theme])
 
  const value = {
    theme,
    setTheme: () => {},
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