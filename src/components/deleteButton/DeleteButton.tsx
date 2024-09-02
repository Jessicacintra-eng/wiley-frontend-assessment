import { DeleteOutlined, WarningRounded } from '@mui/icons-material'
import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  ModalDialog
} from '@mui/joy'
import Modal from '@mui/joy/Modal'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { deleteProduct } from '../../store/productThunks'
import { AppDispatch } from '../../store/store'

function DeleteButton() {
  const { id } = useParams<{ id: string }>()
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  const [openDialog, setOpenDialog] = useState(false)
  const [dialogMessage, setDialogMessage] = useState('')
  const [dialogColor, setDialogColor] = useState<'success' | 'danger'>('success')

  const handleOpenDialog = () => setOpenDialog(true)
  const handleCloseDialog = () => setOpenDialog(false)

  const handleDelete = async () => {
    if (id) {
      try {
        await dispatch(deleteProduct(Number(id))).unwrap()
        setDialogMessage('Success, product deleted')
        setDialogColor('success')
        setOpenDialog(true)
        navigate('/')
      } catch (error) {
        setDialogMessage("We couldn't delete this product right now, try again later")
        setDialogColor('danger')
      } finally {
        handleCloseDialog()
      }
    }
  }

  return (
    <>
      <Button
        variant="plain"
        sx={{
            color: '#C70000'
        }}
        startDecorator={<DeleteOutlined />}
        onClick={handleOpenDialog}
      >
        Delete
      </Button>
      <Modal open={openDialog} onClose={() => setOpenDialog(false)}>
        <ModalDialog variant="outlined" role="alertdialog">
          <DialogTitle>
            <WarningRounded />
            Confirmation
          </DialogTitle>
          <Divider />
          <DialogContent>
            {dialogMessage && (
              <div style={{ color: dialogColor === 'success' ? 'green' : 'red', marginBottom: '16px' }}>
                {dialogMessage}
              </div>
            )}
            Are you sure you want to delete this product?
          </DialogContent>
          <DialogActions>
            <Button variant="solid" color="danger" onClick={handleDelete}>
              Delete
            </Button>
            <Button
              variant="plain"
              color="neutral"
              onClick={() => setOpenDialog(false)}
            >
              Cancel
            </Button>
          </DialogActions>
        </ModalDialog>
      </Modal>
    </>
  )
}

export default DeleteButton
