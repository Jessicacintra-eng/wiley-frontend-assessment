import { configureStore } from '@reduxjs/toolkit';
import { ProductsState } from '../interfaces/interfaces';
import productsReducer from '../store/productSlice';

const initialState: ProductsState = {
  products: [
    { id: 1, title: 'Product 1', price: 10.0, image: 'url1', category: 'Category 1', description: 'Description 1' },
    { id: 2, title: 'Product 2', price: 20.0, image: 'url2', category: 'Category 2', description: 'Description 2' },
  ],
  categories: ['all', 'Category 1', 'Category 2'],
  filteredProducts: [
    { id: 1, title: 'Product 1', price: 10.0, image: 'url1', category: 'Category 1', description: 'Description 1' },
  ],
  selectedCategory: ['all'],
  selectedProduct: null,
  status: 'idle',
  error: null,
  currentPage: 1,
  itemsPerPage: 8,
  isItemBeingEdited: false,
  snackbar: {
    open: false,
    message: '',
    severity: 'success',
  },
};

const mockStore = configureStore({
  reducer: {
    products: productsReducer,
  },
  preloadedState: {
    products: initialState,
  },
});

export default mockStore;
