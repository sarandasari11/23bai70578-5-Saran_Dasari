import { useContext, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Container,
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Grid,
  Alert
} from '@mui/material'
import { Delete, Remove, Add } from '@mui/icons-material'
import { AppContext } from '../context/AppContext'
import { clearCart, removeItem, updateQty } from '../redux/cartSlice'
import TopNav from '../components/TopNav'
import './CartPage.css'

export default function CartPage() {
  const dispatch = useDispatch()
  const cart = useSelector((state) => state.cart.items)
  const { theme } = useContext(AppContext)

  // useMemo Hook - Optimize derived calculations
  const cartSummary = useMemo(() => {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    const avgPrice = cart.length > 0 ? (totalPrice / cart.length).toFixed(2) : 0
    const uniqueItems = cart.length

    return {
      totalItems,
      totalPrice: totalPrice.toFixed(2),
      avgPrice,
      uniqueItems
    }
  }, [cart])

  const handleRemoveItem = (id) => {
    dispatch(removeItem(id))
  }

  const handleUpdateQuantity = (id, quantity) => {
    if (quantity >= 0) {
      dispatch(updateQty({ id, quantity }))
    }
  }

  const handleClearCart = () => {
    dispatch(clearCart())
  }

  return (
    <Box className={`cart-page ${theme === 'dark' ? 'dark-theme' : ''}`}>
      <TopNav title="Nova Cart Studio" />

      {/* Main Content */}
      <Box className="cart-content">
        <Typography variant="h4" className="cart-header">
          Your Cart
        </Typography>
        <Typography className="cart-subheader">
          Smart checkout experience with real-time quantity controls and dynamic totals.
        </Typography>

        {/* Empty Cart Message */}
        {cart.length === 0 ? (
          <Alert severity="info" className="empty-cart-alert">
            Your cart is empty. Add some items to get started!
          </Alert>
        ) : (
          <>
            {/* Cart Summary */}
            <Grid container spacing={2} className="cart-summary-grid">
              <Grid item xs={12} sm={6} md={3}>
                <Card className="summary-card summary-card-items">
                  <CardContent>
                    <Typography className="summary-label">
                      Total Items
                    </Typography>
                    <Typography className="summary-value">
                      {cartSummary.totalItems}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Card className="summary-card summary-card-unique">
                  <CardContent>
                    <Typography className="summary-label">
                      Unique Items
                    </Typography>
                    <Typography className="summary-value">
                      {cartSummary.uniqueItems}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Card className="summary-card summary-card-avg">
                  <CardContent>
                    <Typography className="summary-label">
                      Average Price
                    </Typography>
                    <Typography className="summary-value">
                      ${cartSummary.avgPrice}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Card className="summary-card summary-card-total">
                  <CardContent>
                    <Typography className="summary-label">
                      Total Price
                    </Typography>
                    <Typography className="summary-value">
                      ${cartSummary.totalPrice}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            {/* Cart Table */}
            <TableContainer component={Paper} className="cart-table-wrapper">
              <Table className="cart-table">
                <TableHead>
                  <TableRow>
                    <TableCell>Product</TableCell>
                    <TableCell align="right">Price</TableCell>
                    <TableCell align="center">Quantity</TableCell>
                    <TableCell align="right">Subtotal</TableCell>
                    <TableCell align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cart.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="product-name">{item.name}</TableCell>
                      <TableCell align="right" className="product-price">${item.price}</TableCell>
                      <TableCell align="center">
                        <Box className="quantity-control">
                          <IconButton
                            size="small"
                            className="quantity-btn"
                            onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                          >
                            <Remove fontSize="small" />
                          </IconButton>
                          <Typography className="quantity-value">
                            {item.quantity}
                          </Typography>
                          <IconButton
                            size="small"
                            className="quantity-btn"
                            onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                          >
                            <Add fontSize="small" />
                          </IconButton>
                        </Box>
                      </TableCell>
                      <TableCell align="right" className="subtotal">
                        ${(item.price * item.quantity).toFixed(2)}
                      </TableCell>
                      <TableCell align="center">
                        <IconButton
                          size="small"
                          className="delete-btn"
                          onClick={() => handleRemoveItem(item.id)}
                        >
                          <Delete fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            {/* Action Buttons */}
            <Box className="cart-actions">
              <Button
                className="action-button clear-cart-btn"
                onClick={handleClearCart}
              >
                Clear Cart
              </Button>
              <Button
                className="action-button checkout-btn"
              >
                Checkout (${cartSummary.totalPrice})
              </Button>
            </Box>
          </>
        )}
      </Box>

      {/* Footer */}
      <Box className="cart-footer">
        <Container>
          <Typography className="footer-text">
            © 2026 Material UI Sample App. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </Box>
  )
}
