import { Box, Typography } from '@mui/joy'
import './ListTitle.css'

function ListTitle() {
  return (
      <Box className="list-title-container">
      <Typography className="list-title-image">
        IMAGE
      </Typography> 
       <Typography className="list-title-title">
        TITLE
      </Typography>
      <Typography className="list-title-category">
        CATEGORY
      </Typography>
      <Typography className="list-title-price">
        PRICE
      </Typography>

      {/* for mobile */}
      <Typography className="list-title-mobile">
      IMAGE/TITLE / CATEGORY / PRICE
      </Typography>
      </Box>
  )
}

export default ListTitle
