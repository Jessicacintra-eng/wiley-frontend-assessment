import { Typography } from '@mui/joy'
import ProductForm from '../components/productForm/ProductForm'

export const ProductInsertionPage = () => {  
  return (
    <div style={{ padding: '5vw 10vw 5vw 10vw' }}>
      <Typography level="h2">Add a new product</Typography>
      <ProductForm/>
    </div>
  )
}
