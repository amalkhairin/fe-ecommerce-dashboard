import { createSlice } from '@reduxjs/toolkit'

export const productSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    total: 0,
    isLoading: false,
    error: null,
  },
  reducers: {
    setProducts: (state, action) => {
      state.items = action.payload.items;
      state.total = action.payload.total;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setProducts, setLoading, setError } = productSlice.actions
const  { reducer: productsReducer } = productSlice

// export default counterSlice.reducer
export default productsReducer