import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './counter/counterSlice'
import productsReducer from './products/productSlice'

export default configureStore({
  reducer: {
    counter: counterReducer,
    products: productsReducer
  },
})