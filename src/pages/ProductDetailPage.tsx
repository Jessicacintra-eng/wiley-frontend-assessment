import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { Product } from '../interfaces/interfaces'
import { setSelectedProduct } from '../store/productSlice'
import { deleteProduct } from '../store/productThunks'
import { AppDispatch, RootState } from '../store/store'

export const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>()
  const dispatch: AppDispatch = useDispatch()
  const navigate = useNavigate()
  const product = useSelector(
    (state: RootState) => state.products.selectedProduct,
  )
  const status = useSelector((state: RootState) => state.products.status)
  const error = useSelector((state: RootState) => state.products.error)

  const [isEditing, setIsEditing] = useState(false)
  const [editedProduct, setEditedProduct] = useState<Product | null>(null)

  useEffect(() => {
    if (id) {
      dispatch(setSelectedProduct(Number(id)))
    }
  }, [id, dispatch])

  useEffect(() => {
    if (product) {
      setEditedProduct(product)
    }
  }, [product])

  const handleDelete = () => {
    if (product) {
      dispatch(deleteProduct(product.id)).then(() => {
        navigate('/')
      })
    }
  }

  const handleEditToggle = () => {
    setIsEditing((prev) => !prev)
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target
    if (editedProduct) {
      setEditedProduct({
        ...editedProduct,
        [name]: value,
      })
    }
  }

  if (status === 'loading') return <div>Loading...</div>
  if (status === 'failed') return <div>Error: {error}</div>
  if (!product) return <div>Product not found, try again later</div>

  return (
    <div style={{ padding: '20px' }}>
      <h1>{isEditing ? 'Edit Product' : product.title}</h1>
      <img
        src={product.image}
        alt={product.title}
        style={{ width: '300px', height: 'auto' }}
      />
      {isEditing ? (
        <div>
          <label>
            Title:
            <input
              type="text"
              name="title"
              value={editedProduct?.title || ''}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Price:
            <input
              type="number"
              name="price"
              value={editedProduct?.price || ''}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Description:
            <textarea
              name="description"
              value={editedProduct?.description || ''}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Category:
            <input
              type="text"
              name="category"
              value={editedProduct?.category || ''}
              onChange={handleChange}
            />
          </label>
          <br />
        </div>
      ) : (
        <div>
          <p>{product.description}</p>
          <p>Price: ${product.price}</p>
          <p>Category: {product.category}</p>
          <button
            onClick={handleDelete}
            style={{ marginTop: '20px', marginLeft: '10px' }}
          >
            Delete Product
          </button>
        </div>
      )}
    </div>
  )
}
