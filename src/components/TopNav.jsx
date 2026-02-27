import { useContext } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { AppBar, Toolbar, Box, Button, Badge, Chip, Typography } from '@mui/material'
import { Home, ShoppingCart, Assessment, Login, Brightness4, Brightness7 } from '@mui/icons-material'
import { AppContext } from '../context/AppContext'
import './TopNav.css'

const NAV_ITEMS = [
  { to: '/', label: 'Home', icon: <Home fontSize="small" /> },
  { to: '/cart', label: 'Cart', icon: <ShoppingCart fontSize="small" /> },
  { to: '/reports', label: 'Reports', icon: <Assessment fontSize="small" /> },
  { to: '/login', label: 'Login', icon: <Login fontSize="small" /> }
]

export default function TopNav({ title = 'Nova Commerce' }) {
  const navigate = useNavigate()
  const location = useLocation()
  const cartItems = useSelector((state) => state.cart.items)
  const { theme, user, toggleTheme } = useContext(AppContext)

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <AppBar position="sticky" className="topnav-appbar">
      <Toolbar className="topnav-toolbar">
        <Box className="topnav-brand" onClick={() => navigate('/')}>
          <Typography className="topnav-title">{title}</Typography>
          <Typography className="topnav-subtitle">Advanced React Experience</Typography>
        </Box>

        <Box className="topnav-links">
          {NAV_ITEMS.map((item) => {
            const active = location.pathname === item.to
            const button = (
              <Button
                key={item.to}
                className={`topnav-btn ${active ? 'active' : ''}`}
                onClick={() => navigate(item.to)}
                startIcon={item.icon}
              >
                {item.label}
              </Button>
            )

            if (item.to === '/cart') {
              return (
                <Badge key={item.to} badgeContent={cartCount} color="error" className="topnav-badge">
                  {button}
                </Badge>
              )
            }

            return button
          })}
        </Box>

        <Box className="topnav-actions">
          <Chip
            label={user.isLoggedIn ? user.name : 'Guest'}
            className="topnav-user-chip"
            size="small"
          />
          <Button
            className="topnav-theme-btn"
            onClick={toggleTheme}
            startIcon={theme === 'light' ? <Brightness4 /> : <Brightness7 />}
          >
            {theme === 'light' ? 'Dark' : 'Light'}
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  )
}
