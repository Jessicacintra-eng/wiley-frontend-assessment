import { DeleteOutlined, WarningRounded } from '@mui/icons-material'
import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  ModalDialog,
  Snackbar,
  SnackbarProps
} from '@mui/joy'
import Modal from '@mui/joy/Modal'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { setSnackbarState } from '../../store/productSlice'
import { deleteProduct } from '../../store/productThunks'
import { AppDispatch, RootState } from '../../store/store'

function DeleteButton() {
  const { id } = useParams<{ id: string }>()
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  const [openDialog, setOpenDialog] = useState(false)
  const openSnackbar = useSelector(
    (state: RootState) => state.products.snackbar,
  )
  const handleCloseSnackbar = () => {
    dispatch(
      setSnackbarState({
        open: false,
        message: '',
        severity: 'success' as SnackbarProps['color'],
      }),
    )
  }

  const handleOpenDialog = () => setOpenDialog(true)
  const handleCloseDialog = () => setOpenDialog(false)

  const handleDelete = async () => {
    if (id) {
      try {
        await dispatch(deleteProduct(Number(id))).unwrap()
        navigate('/')
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
    </>
  )
}

export default DeleteButton
