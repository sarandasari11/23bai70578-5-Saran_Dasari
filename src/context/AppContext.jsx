import { createContext, useCallback, useEffect, useMemo, useState } from 'react'

export const AppContext = createContext()

export const AppProvider = ({ children }) => {
  const [theme, setTheme] = useState('light')
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    isLoggedIn: false
  })

  const toggleTheme = useCallback(() => {
    setTheme((previousTheme) => (previousTheme === 'light' ? 'dark' : 'light'))
  }, [])

  const loginUser = useCallback((email) => {
    const fallbackName = email?.split('@')?.[0] || 'John Doe'
    setUser((previousUser) => ({
      ...previousUser,
      email: email || previousUser.email,
      name: fallbackName,
      isLoggedIn: true
    }))
  }, [])

  const logoutUser = useCallback(() => {
    setUser((previousUser) => ({
      ...previousUser,
      isLoggedIn: false
    }))
  }, [])

  const value = useMemo(
    () => ({
      theme,
      user,
      toggleTheme,
      loginUser,
      logoutUser
    }),
    [theme, user, toggleTheme, loginUser, logoutUser]
  )

  useEffect(() => {
    document.body.classList.toggle('dark-theme', theme === 'dark')
  }, [theme])

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
