import { SnackbarProps } from '@mui/joy';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product, ProductsState, SnackbarState } from '../interfaces/interfaces';
import {
  addProduct,
  deleteProduct,
  fetchCategories,
  fetchProducts,
  updateProduct,
} from './productThunks';

const initialState: ProductsState = {
  products: [],
  categories: [],
  filteredProducts: [],
  selectedCategory: [],
  selectedProduct: null,
  status: 'idle',
  error: null,
  currentPage: 1,
  itemsPerPage: 8,
  isItemBeingEdited: false,
  snackbar: {
    open: false,
    message: '',
    severity: 'success'as SnackbarProps['color'] 
  },
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    filterByCategory(state, action: PayloadAction<string[]>) {
      const selectedCategories = action.payload;

      state.selectedCategory = selectedCategories;

      if (selectedCategories.length === 1 && selectedCategories[0] === 'all') {
        state.filteredProducts = state.products;
      } else {
        state.filteredProducts = state.products.filter((product) =>
          selectedCategories.includes(product.category)
        );
      }
    },
    setPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setSelectedProduct(state, action: PayloadAction<number>) {
      state.selectedProduct =
        state.products.find((product) => product.id === action.payload) || null;
    },
    setEditingState(state, action: PayloadAction<boolean>) {
      state.isItemBeingEdited = action.payload;
    },
    setSnackbarState(state, action: PayloadAction<SnackbarState>) {
      state.snackbar = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.status = 'succeeded';
        state.products = action.payload;
        state.filteredProducts = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch product list';

      })
      .addCase(fetchCategories.fulfilled, (state, action: PayloadAction<string[]>) => {
        state.categories = ['all', ...action.payload];
      })
      .addCase(deleteProduct.fulfilled, (state, action: PayloadAction<number>) => {
        state.products = state.products.filter((product) => product.id !== action.payload);
        state.filteredProducts = state.filteredProducts.filter((product) => product.id !== action.payload);
        if (state.selectedProduct?.id === action.payload) {
          state.selectedProduct = null;
        }
        state.snackbar = {
          open: true,
          message: 'Product deleted successfully!',
          severity: 'success'as SnackbarProps['color'] 
        };
      })
      .addCase(addProduct.fulfilled, (state, action: PayloadAction<Product>) => {
        const newProduct = action.payload;
        state.products.push(newProduct);
        state.filteredProducts.push(newProduct);
        state.snackbar = {
          open: true,
          message: 'Product added successfully!',
          severity: 'success' as SnackbarProps['color'] 
        };
      })
      .addCase(updateProduct.fulfilled, (state, action: PayloadAction<Product>) => {
        const updatedProduct = action.payload;
        state.products = state.products.map((product) =>
          product.id === updatedProduct.id ? updatedProduct : product
        );
        state.filteredProducts = state.filteredProducts.map((product) =>
          product.id === updatedProduct.id ? updatedProduct : product
        );
        if (state.selectedProduct?.id === updatedProduct.id) {
          state.selectedProduct = updatedProduct;
        }
        state.snackbar = {
          open: true,
          message: 'Product updated successfully!',
          severity: 'success'as SnackbarProps['color'] 
        };
      });
  },
});

export const {
  filterByCategory,
  setPage,
  setSelectedProduct,
  setEditingState,
  setSnackbarState,
} = productsSlice.actions;

export default productsSlice.reducer;
