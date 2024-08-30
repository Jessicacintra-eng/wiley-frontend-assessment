import { createSlice } from '@reduxjs/toolkit'
import { ProductsState } from '../interfaces/interfaces'
import { fetchCategories, fetchProducts } from './productThunks'

const initialState: ProductsState = {
  products: [],
  categories: [],
  filteredProducts: [],
  selectedCategory: 'all',
  status: 'idle',
  error: null,
  currentPage: 1,
  itemsPerPage: 10
}

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    filterByCategory(state, action) {
      state.selectedCategory = action.payload
      if (action.payload === 'all') {
        state.filteredProducts = state.products
      } else {
        state.filteredProducts = state.products.filter(
          (product) => product.category === action.payload,
        )
      }
    },
    setPage: (state, action) => {
      state.currentPage = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.products = action.payload
        state.filteredProducts = action.payload
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message ?? 'Failed to fetch product list'
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload
      })
  },
})

export const { filterByCategory, setPage  } = productsSlice.actions

export default productsSlice.reducer
