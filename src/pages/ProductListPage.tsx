import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../components/productCard';
import { filterByCategory, setPage } from '../store/productSlice';
import { fetchCategories, fetchProducts } from '../store/productThunks';
import { AppDispatch, RootState } from '../store/store';

export const ProductListPage = () =>  {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { filteredProducts, categories, status, selectedCategory, currentPage, itemsPerPage } =
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

  const handlePageChange = (page: number) => {
    dispatch(setPage(page));
  };
 
  if (status === 'failed') {
    navigate('/error');
    return null; 
  }

  if (status === 'loading') {
    return <div>Loading...</div>;
  }
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const productsToDisplay = filteredProducts.slice(startIndex, endIndex);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  
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
        {productsToDisplay.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            title={product.title}
            price={product.price}
            image={product.image}
          />
        ))}
      </div>
      <div>
        <button 
          onClick={() => handlePageChange(currentPage - 1)} 
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button 
            key={index} 
            onClick={() => handlePageChange(index + 1)}
            disabled={currentPage === index + 1}
          >
            {index + 1}
          </button>
        ))}
        <button 
          onClick={() => handlePageChange(currentPage + 1)} 
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}
