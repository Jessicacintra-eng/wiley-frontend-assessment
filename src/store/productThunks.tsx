import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
    const response = await axios.get('https://fakestoreapi.com/products');
    return response.data;
});

export const fetchCategories = createAsyncThunk('products/fetchCategories', async () => {
    const response = await axios.get('https://fakestoreapi.com/products/categories');
    return ['all', ...response.data];
});

export const deleteProduct = createAsyncThunk('products/deleteProduct', async (productID: number) => {
    await axios.delete(`https://fakestoreapi.com/products/${productID}`);
    return productID;
});
