import { Add, ChevronLeft, ChevronRight } from '@mui/icons-material';
import { Box, Button, Divider, Typography } from '@mui/joy';
import Snackbar, { SnackbarProps } from '@mui/joy/Snackbar';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CategoryFilter from '../components/categoryFilter/CategoryFIlter';
import ListTitle from '../components/listTitle/ListTitle';
import ProductCard from '../components/productCard/ProductCard';
import { filterByCategory, setPage, setSnackbarState } from '../store/productSlice';
import { fetchCategories, fetchProducts } from '../store/productThunks';
import { AppDispatch, RootState } from '../store/store';

export const ProductListPage = () => {
  const navigate = useNavigate()
  const dispatch: AppDispatch = useDispatch()
  const {
    filteredProducts,
    status,
    selectedCategory,
    currentPage,
    itemsPerPage,
  } = useSelector((state: RootState) => state.products)

  const openSnackbar = useSelector(
    (state: RootState) => state.products.snackbar,
  )
  const handleCloseSnackbar = () => {
    dispatch(setSnackbarState({
      open: false,
      message: '',
      severity: 'success' as SnackbarProps['color'] 
    }));
  };

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts())
      dispatch(fetchCategories())
    }
  }, [dispatch, status])

  useEffect(() => {
    dispatch(filterByCategory(selectedCategory))
  }, [selectedCategory, dispatch])

  const handlePageChange = (page: number) => {
    dispatch(setPage(page))
  }

  if (status === 'failed') {
    navigate('/error')
    return null
  }

  if (status === 'loading') {
    return <div>Loading...</div>
  }
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const productsToDisplay = filteredProducts.slice(startIndex, endIndex)

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)
 
  return (
    <div style={{ padding: '5vw 10vw 5vw 10vw' }}>
      <Typography level="h2">Product List</Typography>
      <Box
        sx={{
          margin: {
            xs: '32px 0',
            sm: '24px 0',
          },
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
       <CategoryFilter/>
      
        <Button
          startDecorator={<Add />}
          sx={{
            borderRadius: 0,
            height: {
              xs: '40px',
              sm: '56px',
            },
            backgroundColor: '#115C36',
            '&:hover': {
              backgroundColor: 'rgba(17, 92, 54, 0.9)',
            },
            '&:active': {
              backgroundColor: 'rgba(17, 92, 54, 0.9)',
            },
          }}
          onClick={()=>{ navigate('/newProduct')}}
        >
          Add Product
        </Button>
      </Box>
      <ListTitle/>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap:  {
            xs: 1,
            sm: 2,
          },
        }}
      >
        {productsToDisplay.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            title={product.title}
            price={product.price}
            category={product.category}
            image={product.image}
          />
        ))}
      </Box>
     <Divider sx={{
      margin:'16px 0 8px 0'
     }}/>
      <div
      style={{display:'flex', alignItems:'center', justifyContent:'center'}}
      >
        <Button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          variant="plain" 
          startDecorator={<ChevronLeft />}
        >
          Prev
        </Button>
        {Array.from({ length: totalPages }, (_, index) => (
          <Button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            disabled={currentPage !== index+1}
          >
            {index + 1}
          </Button>
        ))}
        <Button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          variant="plain" 
          endDecorator={<ChevronRight />}
        >
          Next
        </Button>
      </div>
      <Snackbar
          open={openSnackbar.open}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          color={openSnackbar.severity}
          variant='solid'
          autoHideDuration={4000}
      >
       {openSnackbar.message}
      </Snackbar>
    </div>
  )
}
