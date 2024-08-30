import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../components/productCard';
import { filterByCategory } from '../store/productSlice';
import { fetchCategories, fetchProducts } from '../store/productThunks';
import { AppDispatch, RootState } from '../store/store';

export const ProductListPage = () =>  {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { filteredProducts, categories, status, selectedCategory } =
    useSelector((state: RootState) => state.products);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
      dispatch(fetchCategories());
    }
  }, [dispatch, status]);

  useEffect(() => {
    dispatch(filterByCategory(selectedCategory));
  }, [selectedCategory, dispatch]);

 
  if (status === 'failed') {
    navigate('/error');
    return null; 
  }

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="category">Filter</label>
        <select
          id="category"
          value={selectedCategory}
          onChange={(e) => dispatch(filterByCategory(e.target.value))}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            title={product.title}
            price={product.price}
            image={product.image}
          />
        ))}
      </div>
    </div>
  );
}
