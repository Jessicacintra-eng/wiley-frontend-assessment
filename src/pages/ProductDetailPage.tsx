import { Edit, KeyboardArrowLeft } from '@mui/icons-material'
import {
  AspectRatio,
  Breadcrumbs,
  Button,
  Divider,
  Link,
  Snackbar,
  SnackbarProps,
  Typography,
} from '@mui/joy'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import DeleteButton from '../components/deleteButton/DeleteButton'
import ProductForm from '../components/productForm/ProductForm'
import {
  setEditingState,
  setSelectedProduct,
  setSnackbarState,
} from '../store/productSlice'
import { AppDispatch, RootState } from '../store/store'
import { formatCurrency } from '../utils/currencyFormat'

export const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>()
  const dispatch: AppDispatch = useDispatch()
  const product = useSelector(
    (state: RootState) => state.products.selectedProduct,
  )
  const isEditing = useSelector(
    (state: RootState) => state.products.isItemBeingEdited,
  )
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
    if (id) {
      dispatch(setSelectedProduct(Number(id)))
    }
  }, [id, dispatch])

  const handleEditToggle = () => {
    dispatch(setEditingState(true))
  }

  if (!product) return <div>Product not found, try again later</div>

  return (
    <div style={{ padding: '5vw 10vw 5vw 10vw' }}>
      <Breadcrumbs
        aria-label="breadcrumbs"
        sx={{ visibility: isEditing ? 'hidden' : '' }}
      >
        <Link key={'Product list'} color="neutral" href="/">
          <KeyboardArrowLeft />
          {'Product list'}
        </Link>
      </Breadcrumbs>
      <Typography level="h2">
        {isEditing ? 'Product Edit Page' : 'Product Detail Page'}
      </Typography>

      <div
        style={{
          display: isEditing ? 'none' : 'flex',
          justifyContent: 'end',
        }}
      >
        <DeleteButton />
        <Button startDecorator={<Edit />} onClick={handleEditToggle}>
          Edit
        </Button>
      </div>

      {isEditing ? (
        <ProductForm />
      ) : (
        <div>
          <Divider
            sx={{
              margin: {
                xs: '24px 0',
                sm: '32px 0',
              },
            }}
          />
          <Typography mt={3} mb={1}>
            IMAGE
          </Typography>
          <AspectRatio
            ratio="1/1"
            sx={{
              width: {
                xs: '240px',
                sm: '240px',
              },
              height: {
                xs: '240px',
                sm: '240px',
              },
              borderRadius: 'md',
              overflow: 'hidden',
              flexShrink: 1,
              mb: 3,
            }}
          >
            <img
              src={product.image}
              alt={product.title}
              loading="lazy"
              style={{
                objectFit: 'contain',
                width: '100%',
                height: '100%',
                backgroundColor: 'white',
              }}
            />
          </AspectRatio>

          <Typography mt={3} mb={1}>
            TITLE
          </Typography>
          <Typography level="title-md" fontWeight="bold" flexWrap={'wrap'}>
            {product.title}
          </Typography>

          <Typography mt={3} mb={1}>
            PRICE
          </Typography>
          <Typography level="title-md" flexWrap={'wrap'}>
            {formatCurrency(product.price)}
          </Typography>

          <Typography mt={3} mb={1}>
            CATEGORY
          </Typography>
          <Typography level="title-md" flexWrap={'wrap'}>
            {product.category}
          </Typography>

          <Typography color="neutral" mt={3} mb={1}>
            DESCRIPTION
          </Typography>
          <Typography level="title-md" flexWrap={'wrap'}>
            {product.description}
          </Typography>
        </div>
      )}

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
