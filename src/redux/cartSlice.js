import { createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: []
  },
  reducers: {
    addItem: (state, action) => {
      const existingItem = state.items.find((item) => item.id === action.payload.id)

      if (existingItem) {
        existingItem.quantity += 1
        return
      }

      state.items.push({ ...action.payload, quantity: 1 })
    },
    removeItem: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload)
    },
    updateQty: (state, action) => {
      const { id, quantity } = action.payload
      state.items = state.items
        .map((item) => (item.id === id ? { ...item, quantity } : item))
        .filter((item) => item.quantity > 0)
    },
    clearCart: (state) => {
      state.items = []
    }
  }
})

export const { addItem, removeItem, updateQty, clearCart } = cartSlice.actions
export default cartSlice.reducer
