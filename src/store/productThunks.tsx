import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Product } from '../interfaces/interfaces';
import request from '../utils/request';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    return request(
      () => axios.get('https://fakestoreapi.com/products'),
      rejectWithValue
    );
  }
);

export const fetchCategories = createAsyncThunk(
  'products/fetchCategories',
  async (_, { rejectWithValue }) => {
    const categories = await request(
      () => axios.get('https://fakestoreapi.com/products/categories'),
      rejectWithValue
    );
    return [...categories];
  }
);

export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async (productID: number, { rejectWithValue }) => {
    return request(
      () => axios.delete(`https://fakestoreapi.com/products/${productID}`),
      rejectWithValue
    ).then(() => productID);
  }
);

export const addProduct = createAsyncThunk(
  'products/addProduct',
  async (newProduct: Product, { rejectWithValue }) => {
    return request(
      () => axios.post('https://fakestoreapi.com/products', newProduct),
      rejectWithValue
    );
  }
);

export const updateProduct = createAsyncThunk(
  'products/updateProduct',
  async (product: Product, { rejectWithValue }) => {
    return request(
      () => axios.put(`https://fakestoreapi.com/products/${product.id}`, product),
      rejectWithValue
    );
  }
);
