import { useContext, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Box,
  Typography,
  Button,
  Container,
  Grid,
  Card,
  CardContent,
  Paper,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Slider,
  LinearProgress,
  Chip,
  FormControl,
  Select,
  MenuItem,
  InputLabel
} from '@mui/material'
import { Add, Remove, Insights, ShowChart, PieChart } from '@mui/icons-material'
import { AppContext } from '../context/AppContext'
import { updateQty } from '../redux/cartSlice'
import TopNav from '../components/TopNav'
import './ReportsPage.css'

export default function ReportsPage() {
  const dispatch = useDispatch()
  const cartItems = useSelector((state) => state.cart.items)
  const { theme, user } = useContext(AppContext)
  const [analysisMode, setAnalysisMode] = useState('value')
  const [highValueThreshold, setHighValueThreshold] = useState(40)
  const [sortBy, setSortBy] = useState('subtotal')

  const reportData = useMemo(() => {
    const enrichedItems = cartItems.map((item) => ({
      ...item,
      subtotal: item.price * item.quantity
    }))

    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)
    const totalValue = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const avgUnitValue = totalItems > 0 ? totalValue / totalItems : 0
    const highValueCount = cartItems.filter((item) => item.price >= highValueThreshold).length
    const lowStockCount = cartItems.filter((item) => item.quantity === 1).length
    const uniqueItems = cartItems.length

    const distribution = [
      {
        label: 'Budget',
        color: 'var(--primary)',
        value: enrichedItems
          .filter((item) => item.price < 35)
          .reduce((sum, item) => sum + (analysisMode === 'value' ? item.subtotal : item.quantity), 0)
      },
      {
        label: 'Standard',
        color: 'var(--secondary)',
        value: enrichedItems
          .filter((item) => item.price >= 35 && item.price < 50)
          .reduce((sum, item) => sum + (analysisMode === 'value' ? item.subtotal : item.quantity), 0)
      },
      {
        label: 'Premium',
        color: 'var(--accent)',
        value: enrichedItems
          .filter((item) => item.price >= 50)
          .reduce((sum, item) => sum + (analysisMode === 'value' ? item.subtotal : item.quantity), 0)
      }
    ]

    const distributionTotal = distribution.reduce((sum, bucket) => sum + bucket.value, 0)
    const distributionWithPercent = distribution.map((bucket) => ({
      ...bucket,
      percent: distributionTotal > 0 ? (bucket.value / distributionTotal) * 100 : 0
    }))

    const sortedItems = [...enrichedItems].sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name)
      }
      if (sortBy === 'quantity') {
        return b.quantity - a.quantity
      }
      return b.subtotal - a.subtotal
    })

    const topItem = [...enrichedItems].sort((a, b) => b.subtotal - a.subtotal)[0]
    const runningMax = Math.max(...enrichedItems.map((item) => item.subtotal), 1)
    const trendPoints = enrichedItems.map((item, index) => {
      const x = enrichedItems.length === 1 ? 150 : (index / (enrichedItems.length - 1)) * 300
      const y = 100 - (item.subtotal / runningMax) * 80
      return `${x},${y}`
    })
    const trendLine = trendPoints.join(' ')

    const stockHealth = uniqueItems > 0 ? Math.max(0, 100 - (lowStockCount / uniqueItems) * 100) : 100

    return {
      totalItems,
      totalValue,
      avgUnitValue,
      highValueCount,
      lowStockCount,
      uniqueItems,
      distribution: distributionWithPercent,
      sortedItems,
      topItem,
      trendLine,
      stockHealth
    }
  }, [analysisMode, cartItems, highValueThreshold, sortBy])

  const donutBackground = useMemo(() => {
    const [budget, standard, premium] = reportData.distribution
    const budgetStop = budget?.percent || 0
    const standardStop = budgetStop + (standard?.percent || 0)
    const premiumStop = standardStop + (premium?.percent || 0)

    return `conic-gradient(
      var(--primary) 0% ${budgetStop}%,
      var(--secondary) ${budgetStop}% ${standardStop}%,
      var(--accent) ${standardStop}% ${premiumStop}%,
      rgba(0,0,0,0.1) ${premiumStop}% 100%
    )`
  }, [reportData.distribution])

  const handleIncrease = (item) => {
    dispatch(updateQty({ id: item.id, quantity: item.quantity + 1 }))
  }

  const handleDecrease = (item) => {
    dispatch(updateQty({ id: item.id, quantity: Math.max(0, item.quantity - 1) }))
  }

  return (
    <Box className={`reports-page ${theme === 'dark' ? 'dark-theme' : ''}`}>
      <TopNav title="Material UI Store 23BAI70578" />

      <Container className="reports-content">
        <Paper className="reports-user-card reports-hero-card">
          <Box className="reports-hero-row">
            <Box>
              <Typography variant="h5">Welcome, {user.isLoggedIn ? user.name : 'Guest User'}</Typography>
              <Typography variant="body2">Email: {user.email}</Typography>
            </Box>
            <Box className="reports-chip-row">
              <Chip icon={<Insights />} label={`Theme: ${theme.toUpperCase()}`} className="reports-chip" />
              <Chip icon={<ShowChart />} label={`SKU: ${reportData.uniqueItems}`} className="reports-chip" />
              <Chip icon={<PieChart />} label={`Mode: ${analysisMode}`} className="reports-chip" />
            </Box>
          </Box>
        </Paper>

        <Paper className="reports-controls-panel">
          <Box className="controls-left">
            <Typography className="control-title">Analysis Mode</Typography>
            <Box className="mode-switcher">
              <Button
                size="small"
                className={`mode-btn ${analysisMode === 'value' ? 'active' : ''}`}
                onClick={() => setAnalysisMode('value')}
              >
                Value
              </Button>
              <Button
                size="small"
                className={`mode-btn ${analysisMode === 'quantity' ? 'active' : ''}`}
                onClick={() => setAnalysisMode('quantity')}
              >
                Quantity
              </Button>
            </Box>
          </Box>
          <Box className="controls-center">
            <Typography className="control-title">High-Value Threshold (${highValueThreshold})</Typography>
            <Slider
              min={20}
              max={70}
              step={5}
              value={highValueThreshold}
              onChange={(_, value) => setHighValueThreshold(value)}
              valueLabelDisplay="auto"
            />
          </Box>
          <Box className="controls-right">
            <FormControl size="small" fullWidth>
              <InputLabel id="sort-by-label">Sort Items</InputLabel>
              <Select
                labelId="sort-by-label"
                value={sortBy}
                label="Sort Items"
                onChange={(event) => setSortBy(event.target.value)}
              >
                <MenuItem value="subtotal">Highest Value</MenuItem>
                <MenuItem value="quantity">Highest Quantity</MenuItem>
                <MenuItem value="name">Product Name</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Paper>

        <Grid container spacing={2} className="reports-summary-grid">
          <Grid item xs={12} sm={6} md={3}>
            <Card className="reports-metric-card">
              <CardContent>
                <Typography className="metric-label">Total Units</Typography>
                <Typography className="metric-value">{reportData.totalItems}</Typography>
                <Typography className="metric-subtext">Across {reportData.uniqueItems} products</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card className="reports-metric-card">
              <CardContent>
                <Typography className="metric-label">Cart Value</Typography>
                <Typography className="metric-value">${reportData.totalValue.toFixed(2)}</Typography>
                <Typography className="metric-subtext">Avg unit: ${reportData.avgUnitValue.toFixed(2)}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card className="reports-metric-card">
              <CardContent>
                <Typography className="metric-label">High Value Products</Typography>
                <Typography className="metric-value">{reportData.highValueCount}</Typography>
                <Typography className="metric-subtext">Price ≥ ${highValueThreshold}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card className="reports-metric-card">
              <CardContent>
                <Typography className="metric-label">Stock Health</Typography>
                <Typography className="metric-value">{reportData.stockHealth.toFixed(0)}%</Typography>
                <LinearProgress
                  variant="determinate"
                  value={reportData.stockHealth}
                  className="health-progress"
                />
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Grid container spacing={2} className="reports-viz-grid">
          <Grid item xs={12} md={5}>
            <Paper className="reports-viz-card">
              <Typography variant="h6" className="panel-title">Category Distribution</Typography>
              <Box className="donut-wrapper">
                <Box className="donut-chart" sx={{ background: donutBackground }}>
                  <Box className="donut-center">
                    <Typography className="donut-main">{analysisMode === 'value' ? '$' : ''}{analysisMode === 'value' ? reportData.totalValue.toFixed(0) : reportData.totalItems}</Typography>
                    <Typography className="donut-sub">Total</Typography>
                  </Box>
                </Box>
              </Box>
              <Box className="legend-list">
                {reportData.distribution.map((bucket) => (
                  <Box key={bucket.label} className="legend-row">
                    <Box className="legend-dot" sx={{ backgroundColor: bucket.color }} />
                    <Typography className="legend-label">{bucket.label}</Typography>
                    <Typography className="legend-value">{bucket.percent.toFixed(1)}%</Typography>
                  </Box>
                ))}
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} md={7}>
            <Paper className="reports-viz-card">
              <Typography variant="h6" className="panel-title">Product Value Trend</Typography>
              {reportData.sortedItems.length > 1 ? (
                <svg viewBox="0 0 300 100" className="trend-svg" preserveAspectRatio="none">
                  <polyline points={reportData.trendLine} fill="none" stroke="var(--primary)" strokeWidth="3" />
                </svg>
              ) : (
                <Box className="trend-empty">Add more than one item to visualize trend.</Box>
              )}
              <Typography className="trend-insight">
                Top performer: {reportData.topItem ? `${reportData.topItem.name} ($${reportData.topItem.subtotal.toFixed(2)})` : 'N/A'}
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        <Paper className="reports-list-panel">
          <Typography variant="h6" className="panel-title">Inventory Controls</Typography>
          <List>
            {reportData.sortedItems.length === 0 ? (
              <ListItem>
                <ListItemText primary="No products in cart yet. Add items from Home page." />
              </ListItem>
            ) : (
              reportData.sortedItems.map((item) => (
                <ListItem key={item.id} className="report-item-row">
                  <ListItemText
                    primary={item.name}
                    secondary={`$${item.price} × ${item.quantity} = $${item.subtotal.toFixed(2)}`}
                  />
                  <IconButton onClick={() => handleDecrease(item)} size="small">
                    <Remove />
                  </IconButton>
                  <Typography className="item-qty">{item.quantity}</Typography>
                  <IconButton onClick={() => handleIncrease(item)} size="small">
                    <Add />
                  </IconButton>
                </ListItem>
              ))
            )}
          </List>
        </Paper>
      </Container>
    </Box>
  )
}
