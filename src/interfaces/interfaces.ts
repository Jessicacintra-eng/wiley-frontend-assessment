import { SnackbarProps } from "@mui/joy";

export interface Product {
    id: number;
    title: string;
    price: number;
    image: string;
    category: string;
    description: string;
}

export interface ProductsState {
    products: Product[];
    categories: string[];
    filteredProducts: Product[];
    selectedCategory: string[];
    selectedProduct: Product | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
    currentPage: number,
    itemsPerPage: number
    isItemBeingEdited:boolean;
    snackbar:SnackbarState;
}

export interface ProductCardProps {
    id: number;
    title: string;
    price: number;
    category: string;
    image: string;
}
export interface SnackbarState{
    open: boolean;
    message: string;
    severity: SnackbarProps['color'] 
}