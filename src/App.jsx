import { useContext, useMemo } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { CssBaseline, ThemeProvider } from '@mui/material'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import CartPage from './pages/CartPage'
import ReportsPage from './pages/ReportsPage'
import { AppContext, AppProvider } from './context/AppContext'
import { getAppTheme } from './theme/muiTheme'
import './App.css'
import './DarkTheme.css'

function AppShell() {
  const { theme } = useContext(AppContext)
  const muiTheme = useMemo(() => getAppTheme(theme), [theme])

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/reports" element={<ReportsPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

function App() {
  return (
    <AppProvider>
      <AppShell />
    </AppProvider>
  )
}

export default App
