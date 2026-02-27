import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import '../LoginPage.css'
import { Box, Container, Paper, Typography, TextField, Button, Avatar, Link, AppBar, Toolbar, IconButton } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { Brightness4, Brightness7, ArrowBack } from '@mui/icons-material'
import { AppContext } from '../context/AppContext'

export default function LoginPage() {
  const navigate = useNavigate()
  const { theme, loginUser, toggleTheme } = useContext(AppContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    loginUser(email)
    console.log('Logging in', { email })
    navigate('/')
  }

  return (
    <Box className={`login-root ${theme === 'dark' ? 'dark-theme' : ''}`}>
      <AppBar position="absolute" sx={{ bgcolor: 'transparent', boxShadow: 'none', top: 16, left: 16, right: 'auto' }}>
        <Toolbar sx={{ padding: 0, display: 'flex', gap: 1 }}>
          <Button
            onClick={() => navigate('/')}
            className="login-back-button"
            startIcon={<ArrowBack />}
            sx={{
              color: 'white',
              bgcolor: theme === 'light' ? 'rgba(25, 118, 210, 0.8)' : 'rgba(255,255,255,0.2)',
              px: 1.5,
              py: 0.5,
              borderRadius: 1,
              textTransform: 'none',
              fontSize: '0.9rem',
              fontWeight: 500,
              border: '1px solid rgba(255,255,255,0.3)',
              '&:hover': {
                bgcolor: theme === 'light' ? 'rgba(25, 118, 210, 1)' : 'rgba(255,255,255,0.3)',
                transform: 'translateX(-3px)',
                transition: 'all 0.3s ease'
              }
            }}
          >
            Back
          </Button>
          <Button
            onClick={toggleTheme}
            sx={{
              color: 'white',
              bgcolor: '#7B68EE',
              px: 1.5,
              py: 0.5,
              borderRadius: 1,
              textTransform: 'none',
              fontSize: '0.9rem',
              fontWeight: 500,
              border: '1px solid rgba(255,255,255,0.3)',
              display: 'flex',
              gap: 0.5,
              '&:hover': {
                bgcolor: 'rgba(123, 104, 238, 0.85)',
                transition: 'all 0.3s ease'
              }
            }}
            startIcon={theme === 'light' ? <Brightness4 /> : <Brightness7 />}
          >
            {theme === 'light' ? 'Dark' : 'Lite'}
          </Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth={false}>
        <Box className="login-split">
          <Box className="login-left">
            <div className="logo">
              <LockOutlinedIcon sx={{ color: 'white' }} />
            </div>
            <Typography className="hero-title" variant="h3">Welcome Back</Typography>
            <Typography className="hero-subtitle" variant="subtitle1">
              Sign in to continue to your dashboard and access exclusive features.
            </Typography>
          </Box>

          <Box className="login-right">
            <Paper className="login-form-container login-paper" elevation={4}>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 1 }}>
                <Avatar sx={{ m: 1, bgcolor: '#1976d2' }}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5" sx={{ mb: 2 }}>Sign in</Typography>
                <Typography component="h1" variant="h5" sx={{ mb: 2 }}>Enter Any ID & Password</Typography>
              </Box>

              <form onSubmit={handleSubmit}>
                <TextField
                  label="Email Address"
                  type="email"
                  margin="normal"
                  fullWidth
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />

                <TextField
                  label="Password"
                  type="password"
                  margin="normal"
                  fullWidth
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2, mb: 2 }}>
                  <Link href="#" variant="body2">Forgot password?</Link>
                </Box>
                
                <Button type="submit" variant="contained" fullWidth sx={{ mb: 1 }}>Sign In</Button>
                <Button variant="outlined" fullWidth onClick={() => navigate('/')}>Cancel</Button>
              </form>
            </Paper>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}
