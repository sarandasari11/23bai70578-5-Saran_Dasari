import { useState, useContext, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Container,
  Box,
  Button,
  Card,
  CardContent,
  CardActions,
  Typography,
  Grid,
  Paper,
  Rating,
  Stack,
  TextField,
  MenuItem,
  InputAdornment,
  Chip
} from '@mui/material'
import { Search, ThumbUp, Favorite, ShoppingCart, Code, Palette, Speed, Cloud, Lock, Layers, Email, Phone, LocationOn, Send, CheckCircle, Person, Subject } from '@mui/icons-material'
import { AppContext } from '../context/AppContext'
import { addItem } from '../redux/cartSlice'
import TopNav from '../components/TopNav'
import './HomePage.css'

const PRODUCT_ITEMS = [
  { id: 1, name: 'React Book', price: 29.99 },
  { id: 2, name: 'JavaScript Course', price: 49.99 },
  { id: 3, name: 'Material UI Kit', price: 39.99 },
  { id: 4, name: 'Web Dev Guide', price: 34.99 },
  { id: 5, name: 'Advanced CSS Course', price: 59.99 }
]

export default function HomePage() {
  const dispatch = useDispatch()
  const cart = useSelector((state) => state.cart.items)
  const { theme, user } = useContext(AppContext)
  const [liked, setLiked] = useState(false)
  const [rating, setRating] = useState(3)
  const [searchTerm, setSearchTerm] = useState('')
  const [priceBand, setPriceBand] = useState('all')
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    subject: '',
    category: '',
    message: '',
    priority: 'normal',
    subscribe: false
  })
  const [submitted, setSubmitted] = useState(false)

  const filteredProducts = useMemo(() => {
    const query = searchTerm.trim().toLowerCase()

    return PRODUCT_ITEMS.filter((item) => {
      const matchesQuery = item.name.toLowerCase().includes(query)

      if (priceBand === 'budget') {
        return matchesQuery && item.price < 35
      }
      if (priceBand === 'standard') {
        return matchesQuery && item.price >= 35 && item.price < 50
      }
      if (priceBand === 'premium') {
        return matchesQuery && item.price >= 50
      }

      return matchesQuery
    })
  }, [priceBand, searchTerm])

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  const handleAddToCart = (item) => {
    dispatch(addItem(item))
  }

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    setSubmitted(true)
    setTimeout(() => {
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        subject: '',
        category: '',
        message: '',
        priority: 'normal',
        subscribe: false
      })
      setSubmitted(false)
    }, 3000)
  }

  return (
    <Box className={`home-page ${theme === 'dark' ? 'dark-theme' : ''}`}>
      <TopNav title="Material UI Store 23BAI70578" />

      {/* Main Content */}
      <Box className="home-content">
        {/* Hero Section */}
        <Box className="home-hero">
          <Typography variant="h3" className="hero-main-title">
            Welcome to Material UI Store
          </Typography>
          <Typography variant="h6" className="hero-subtitle">
            Discover premium learning resources and tools for development
          </Typography>
          <Box className="hero-info" sx={{ mt: 1 }}>
            <b>User:</b> {user.isLoggedIn ? `${user.name} (${user.email})` : 'Guest'}
          </Box>
          <Box className="hero-info">
            <b>New Features:</b> Redux Toolkit cart management, global theme/user context, memoized search + analytics, and a new interactive Reports page with visual insights.
          </Box>
          <Box className="catalog-controls panel-surface">
            <TextField
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              label="Search products"
              size="small"
              className="catalog-input"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search fontSize="small" />
                  </InputAdornment>
                )
              }}
            />
            <TextField
              select
              size="small"
              label="Price segment"
              value={priceBand}
              onChange={(event) => setPriceBand(event.target.value)}
              className="catalog-input"
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="budget">Budget</MenuItem>
              <MenuItem value="standard">Standard</MenuItem>
              <MenuItem value="premium">Premium</MenuItem>
            </TextField>
            <Chip label={`${filteredProducts.length} Products`} color="primary" variant="outlined" />
            <Chip label={`${cartCount} In Cart`} color="secondary" variant="outlined" />
          </Box>
        </Box>

        {/* Products Grid */}
        <Grid container spacing={3} className="products-grid">
          {filteredProducts.map((item) => (
            <Grid item xs={12} sm={6} md={3} key={item.id} sx={{ animation: 'slideInUp 0.6s ease-out' }}>
              <Card className="product-card">
                <CardContent className="product-content">
                  <Typography variant="h5" className="product-title">
                    {item.name}
                  </Typography>
                  <Typography variant="body2" className="product-description">
                    High-quality learning resource for development.
                  </Typography>
                  <div className="product-badges">
                    <span className="badge badge-premium">Premium</span>
                    <span className="badge badge-popular">Popular</span>
                  </div>
                  <Typography variant="h6" className="product-price">
                    ${item.price}
                  </Typography>
                  <div className="product-rating">
                    <Rating value={rating} readOnly size="small" />
                  </div>
                </CardContent>
                <CardActions className="product-actions">
                  <Button 
                    variant="contained"
                    className="product-btn add-to-cart-btn"
                    onClick={() => handleAddToCart(item)}
                  >
                    Add to Cart
                  </Button>
                  <Button 
                    variant="outlined"
                    className="product-btn learn-more-btn"
                  >
                    Learn More
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid> 

        {/* Experiment 5 Features Section */}
        <Paper className="features-section">
          <Typography variant="h5" className="section-title" sx={{ mb: 2, borderBottom: 'none' }}>
            ✨ Experiment 5 Features
          </Typography>
          <Stack spacing={2} className="features-list">
            <Box className="feature-item">
              <Cloud className="feature-icon" />
              <Typography className="feature-text"><strong>useContext Global Provider</strong> - App is wrapped with `AppContext` and manages shared theme + user profile state across pages.</Typography>
            </Box>
            <Box className="feature-item">
              <Layers className="feature-icon" />
              <Typography className="feature-text"><strong>Redux Toolkit (Replaced useReducer)</strong> - Configured `configureStore` with `createSlice` cart reducers: `addItem`, `removeItem`, `updateQty`, `clearCart`.</Typography>
            </Box>
            <Box className="feature-item">
              <Speed className="feature-icon" />
              <Typography className="feature-text"><strong>useMemo Performance Optimization</strong> - Memoized product filtering/search, cart totals, and Reports analytics so derived values recompute only on dependency changes.</Typography>
            </Box>
            <Box className="feature-item">
              <Lock className="feature-icon" />
              <Typography className="feature-text"><strong>New Experiment 5 Reports Page</strong> - Demonstrates Redux state usage, Context theme/user data, and `useMemo`-based interactive analysis/visualizations.</Typography>
            </Box>
            <Box className="feature-item">
              <Code className="feature-icon" />
              <Typography className="feature-text"><strong>React Router Multi-Page App</strong> - Working Navbar links with 4 routes: Home, Login, Cart, and new Experiment 5 page Reports.</Typography>
            </Box>
            <Box className="feature-item">
              <ShoppingCart className="feature-icon" />
              <Typography className="feature-text"><strong>Redux in UI (Selector + Dispatch)</strong> - Cart actions are dispatched from pages/components and state is read with `useSelector` in Home, Cart, Reports, and TopNav.</Typography>
            </Box>
            <Box className="feature-item">
              <Palette className="feature-icon" />
              <Typography className="feature-text"><strong>Theme + Profile Experience</strong> - Light/dark mode toggle and mock user profile are applied globally through Context in multiple components.</Typography>
            </Box>
            <Box className="feature-item">
              <Palette className="feature-icon" />
              <Typography className="feature-text"><strong>Consistent Responsive UI</strong> - Unified advanced theme system, reusable navigation, modern spacing/typography, and mobile + desktop responsive design.</Typography>
            </Box>
          </Stack>
        </Paper>

        {/* Advanced Contact Form Section - MOVED DOWN */}
        <Paper className="contact-section advanced-contact">
          <Typography variant="h5" className="section-title">
            📧 Get in Touch - Contact Form
          </Typography>
          <Typography variant="body2" sx={{ color: '#757575', mb: 3 }}>
            We'd love to hear from you! Fill out the form below and we'll get back to you as soon as possible.
          </Typography>

          {submitted ? (
            <Box sx={{ textAlign: 'center', py: 3 }}>
              <CheckCircle sx={{ fontSize: '3rem', color: '#4CAF50', mb: 2 }} />
              <Typography variant="h6" sx={{ color: '#4CAF50', fontWeight: 'bold' }}>
                Thank you for your message!
              </Typography>
              <Typography variant="body2" sx={{ color: '#757575', mt: 1 }}>
                We'll get back to you within 24 hours.
              </Typography>
            </Box>
          ) : (
            <form onSubmit={handleFormSubmit} className="advanced-form">
              <Grid container className="contact-grid">
                {/* Full Name */}
                <Grid size={{ xs: 12, sm: 6 }}>
                  <div className="form-group-advanced">
                    <label className="form-label-advanced">
                      <Person sx={{ mr: 1, fontSize: '1.2rem' }} />
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      className="form-input-advanced"
                      placeholder="John Doe"
                      value={formData.fullName}
                      onChange={handleFormChange}
                      required
                    />
                  </div>
                </Grid>

                {/* Email */}
                <Grid size={{ xs: 12, sm: 6 }}>
                  <div className="form-group-advanced">
                    <label className="form-label-advanced">
                      <Email sx={{ mr: 1, fontSize: '1.2rem' }} />
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      className="form-input-advanced"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={handleFormChange}
                      required
                    />
                  </div>
                </Grid>

                {/* Phone */}
                <Grid size={{ xs: 12, sm: 6 }}>
                  <div className="form-group-advanced">
                    <label className="form-label-advanced">
                      <Phone sx={{ mr: 1, fontSize: '1.2rem' }} />
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      className="form-input-advanced"
                      placeholder="+1 (555) 123-4567"
                      value={formData.phone}
                      onChange={handleFormChange}
                    />
                  </div>
                </Grid>

                {/* Subject */}
                <Grid size={{ xs: 12, sm: 6 }}>
                  <div className="form-group-advanced">
                    <label className="form-label-advanced">
                      <Subject sx={{ mr: 1, fontSize: '1.2rem' }} />
                      Subject
                    </label>
                    <input
                      type="text"
                      name="subject"
                      className="form-input-advanced"
                      placeholder="What is this about?"
                      value={formData.subject}
                      onChange={handleFormChange}
                      required
                    />
                  </div>
                </Grid>

                {/* Category Dropdown */}
                <Grid size={{ xs: 12, sm: 6 }}>
                  <div className="form-group-advanced">
                    <label className="form-label-advanced">Category</label>
                    <select
                      name="category"
                      className="form-select-advanced"
                      value={formData.category}
                      onChange={handleFormChange}
                      required
                    >
                      <option value="">Select a category...</option>
                      <option value="general">General Inquiry</option>
                      <option value="support">Support</option>
                      <option value="feedback">Feedback</option>
                      <option value="partnership">Partnership</option>
                      <option value="bug">Bug Report</option>
                    </select>
                  </div>
                </Grid>

                {/* Priority */}
                <Grid size={{ xs: 12, sm: 6 }}>
                  <div className="form-group-advanced">
                    <label className="form-label-advanced">Priority</label>
                    <select
                      name="priority"
                      className="form-select-advanced"
                      value={formData.priority}
                      onChange={handleFormChange}
                    >
                      <option value="low">Low</option>
                      <option value="normal">Normal</option>
                      <option value="high">High</option>
                      <option value="urgent">Urgent</option>
                    </select>
                  </div>
                </Grid>

                {/* Message - Full Width */}
                <Grid size={12}>
                  <div className="form-group-advanced">
                    <label className="form-label-advanced">Message</label>
                    <textarea
                      name="message"
                      className="form-textarea-advanced"
                      placeholder="Tell us more about your inquiry..."
                      value={formData.message}
                      onChange={handleFormChange}
                      rows={5}
                      required
                    />
                  </div>
                </Grid>

                {/* Rating */}
                <Grid size={{ xs: 12, sm: 6 }}>
                  <div className="form-group-advanced">
                    <label className="form-label-advanced">Rate Your Experience</label>
                    <Rating
                      value={rating}
                      onChange={(event, newValue) => setRating(newValue)}
                      size="large"
                    />
                  </div>
                </Grid>

                {/* Subscribe Checkbox */}
                <Grid size={{ xs: 12, sm: 6 }}>
                  <div className="checkbox-group-advanced">
                    <label className="checkbox-label-advanced">
                      <input
                        type="checkbox"
                        name="subscribe"
                        checked={formData.subscribe}
                        onChange={handleFormChange}
                        className="checkbox-input-advanced"
                      />
                      <span>Subscribe to our newsletter</span>
                    </label>
                  </div>
                </Grid>

                {/* Action Buttons */}
                <Grid size={12}>
                  <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                    <Button
                      type="submit"
                      className="submit-button-advanced"
                      startIcon={<Send />}
                    >
                      Send Message
                    </Button>
                    <Button
                      type="button"
                      className="like-button-form"
                      onClick={() => setLiked(!liked)}
                      startIcon={<Favorite sx={{ color: liked ? '#f44336' : 'inherit' }} />}
                    >
                      {liked ? 'You Liked Us!' : 'Like Us'}
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </form>
          )}
        </Paper>
      </Box>

      {/* Footer */}
      <Box className="home-footer">
        <Container>
          <Typography className="footer-text">
            © 2026 Material UI Sample App. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </Box>
  )
}
