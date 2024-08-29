import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './counter/counterSlice'
import productsReducer from './products/productSlice'
import productCategoriesReducer from './products/ProductCategoriesSlice'

export default configureStore({
  reducer: {
    counter: counterReducer,
    products: productsReducer,
    productCategories: productCategoriesReducer
  },
})