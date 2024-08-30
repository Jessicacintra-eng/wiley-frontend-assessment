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
    selectedCategory: string;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

export interface ProductCardProps {
    id: number;
    title: string;
    price: number;
    image: string;
}