import { useContext } from 'react'
import { IconButton } from '@mui/material'
import { Brightness4, Brightness7 } from '@mui/icons-material'
import { AppContext } from '../context/AppContext'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useContext(AppContext)

  return (
    <IconButton
      onClick={toggleTheme}
      sx={{ color: 'white' }}
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? <Brightness4 /> : <Brightness7 />}
    </IconButton>
  )
}
