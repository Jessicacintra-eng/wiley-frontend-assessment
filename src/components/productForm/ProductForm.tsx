import { ArrowBack, Save } from '@mui/icons-material'
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Option,
  Select,
  Snackbar,
  SnackbarProps,
  Textarea,
} from '@mui/joy'
import { useEffect, useState } from 'react'
import { NumericFormat } from 'react-number-format'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Product } from '../../interfaces/interfaces'
import { setEditingState, setSnackbarState } from '../../store/productSlice'
import { addProduct, updateProduct } from '../../store/productThunks'
import { AppDispatch, RootState } from '../../store/store'

function ProductForm() {
  const categories = useSelector(
    (state: RootState) => state.products.categories,
  )
  const selectedProduct = useSelector(
    (state: RootState) => state.products.selectedProduct,
  )
  const isNewProduct = useSelector(
    (state: RootState) => state.products.isItemBeingEdited,
  )
  const openSnackbar = useSelector(
    (state: RootState) => state.products.snackbar,
  )
  const [product, setProduct] = useState<Product>({
    id: 0,
    title: '',
    price: 0,
    image: '',
    category: 'all',
    description: '',
  })
  const [imagePreview, setImagePreview] = useState('')

  const handleCloseSnackbar = () => {
    dispatch(
      setSnackbarState({
        open: false,
        message: '',
        severity: 'success' as SnackbarProps['color'],
      }),
    )
  }

  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  useEffect(() => {
    if (isNewProduct && selectedProduct) {
      setProduct(selectedProduct)
      setImagePreview(selectedProduct.image)
    } else {
      const savedImage = localStorage.getItem('uploadedImage')
      if (savedImage) {
        setImagePreview(savedImage)
        setProduct((prevProduct) => ({
          ...prevProduct,
          image: savedImage,
        }))
      }
    }
  }, [!isNewProduct, selectedProduct])

  const handleInputChange = (name: string, value: string) => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
      id: prevProduct.id || generateRandomId(),
    }))
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      processFile(file)
    }
  }

  const processFile = (file: File) => {
    const objectURL = URL.createObjectURL(file)

    localStorage.removeItem('uploadedImage')
    localStorage.setItem('uploadedImage', objectURL)

    setImagePreview(objectURL)
    setProduct((prevProduct) => ({
      ...prevProduct,
      image: objectURL,
    }))

    return () => URL.revokeObjectURL(objectURL)
  }

  const generateRandomId = () => Math.random() + Date.now()

  const handleInsertion = async () => {
    localStorage.removeItem('uploadedImage')
    if (!isFormValid()) {
      dispatch(
        setSnackbarState({
          open: true,
          message: 'Please fill in all required fields.',
          severity: 'danger',
        }),
      )
      return
    }

    try {
      await dispatch(addProduct(product)).unwrap()
      navigate('/')
    } catch (error) {
      dispatch(
        setSnackbarState({
          open: true,
          message: 'Error adding product.',
          severity: 'danger',
        }),
      )
    }
  }

  const handleSave = async () => {
    if (!isFormValid()) {
      dispatch(
        setSnackbarState({
          open: true,
          message: 'Please fill in all required fields.',
          severity: 'danger',
        }),
      )
      return
    }

    if (product) {
      try {
        await dispatch(updateProduct(product)).unwrap()
        dispatch(setEditingState(false))
        navigate('/')
      } catch (error) {
        dispatch(
          setSnackbarState({
            open: true,
            message: 'Error updating product.',
            severity: 'danger',
          }),
        )
      }
    }
  }

  const isFormValid = () => {
    return (
      product.title.trim() !== '' &&
      product.price > 0 &&
      product.category.trim() !== '' &&
      product.description.trim() !== ''
    )
  }
  return (
    <Box>
      {!isNewProduct ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            margin: {
              sm: '2.22vw 0',
              xs: '1.67vw 0',
            },
          }}
        >
          <Button
            variant="plain"
            startDecorator={<ArrowBack />}
            onClick={() => navigate('/')}
          >
            Cancel
          </Button>
          <Button
            startDecorator={<Save />}
            onClick={handleInsertion}
            disabled={!isFormValid()}
          >
            Save
          </Button>
        </Box>
      ) : (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            margin: {
              sm: '2.22vw 0',
              xs: '1.67vw 0',
            },
          }}
        >
          <Button
            startDecorator={<ArrowBack />}
            variant="plain"
            onClick={() => dispatch(setEditingState(false))}
          >
            Cancel
          </Button>
          <Button startDecorator={<Save />} onClick={handleSave}>
            Save
          </Button>
        </Box>
      )}

      <FormControl sx={{ mt: 2 }}>
        <FormLabel>IMAGE</FormLabel>
        <input
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          id="upload-button"
        />
        <label htmlFor="upload-button" style={{ width: 240, height: 240 }}>
          <Button
            variant="outlined"
            component="span"
            onChange={handleFileChange}
            sx={{
              width: 240,
              height: 240,
              mt: 1,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              border: '0.14vw dashed #ccc',
              textAlign: 'center',
              color: '#666',
              '&:hover': {
                border: '0.14vw dashed #888',
                backgroundColor: '#f9f9f9',
              },
            }}
          >
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Product Preview"
                style={{
                  maxWidth: '100%',
                  maxHeight: '100%',
                  objectFit: 'contain',
                }}
              />
            ) : (
              'Upload Image'
            )}
          </Button>
        </label>
      </FormControl>

      <FormControl sx={{ mt: 2 }}>
        <FormLabel>TITLE</FormLabel>
        <Input
          name="title"
          value={product.title}
          onChange={(e) => handleInputChange(e.target.name, e.target.value)}
          placeholder="Insert the name of the product"
          fullWidth
          required
          size="lg"
        />
      </FormControl>

      <FormControl sx={{ mt: 2 }}>
        <FormLabel>PRICE</FormLabel>
        <NumericFormat
          name="price"
          value={product.price || ''}
          prefix={'$'}
          decimalScale={2}
          onValueChange={(values) => {
            handleInputChange('price', values.floatValue?.toString() || '')
          }}
          customInput={Input}
          fullWidth
          required
          thousandSeparator=","
          decimalSeparator="."
          fixedDecimalScale={true}
          size="lg"
        />
      </FormControl>

      <FormControl sx={{ mt: 2 }}>
        <FormLabel>CATEGORY</FormLabel>
        <Select
          name="category"
          value={product.category}
          onChange={(e, newValue) => {
            setProduct((prevProduct) => ({
              ...prevProduct,
              category: newValue as string,
            }))
          }}
          required
          size="lg"
        >
          {categories.map((category) => (
            <Option key={category} value={category}>
              {category}
            </Option>
          ))}
        </Select>
      </FormControl>

      <FormControl sx={{ mt: 2 }}>
        <FormLabel>DESCRIPTION</FormLabel>
        <Textarea
          name="description"
          value={product.description}
          onChange={(e) => handleInputChange(e.target.name, e.target.value)}
          style={{ width: '100%' }}
          required
          size="lg"
        />
      </FormControl>
      <Snackbar
        open={openSnackbar.open}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        color={openSnackbar.severity}
        variant="solid"
        autoHideDuration={4000}
      >
        {openSnackbar.message}
      </Snackbar>
    </Box>
  )
}

export default ProductForm
