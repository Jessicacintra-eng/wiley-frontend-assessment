import { AspectRatio, Card, CardContent, Typography } from '@mui/joy'
import { useNavigate } from 'react-router-dom'
import { ProductCardProps } from '../../interfaces/interfaces'
import { formatCurrency } from '../../utils/currencyFormat'

function ProductCard({
  id,
  title,
  price,
  category,
  image,
}: Readonly<ProductCardProps>) {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/product/${id}`)
  }
  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'row',
        borderRadius: 'md',
        boxShadow: 'md',
        alignItems: 'center',
        '&:hover': {
          backgroundColor: 'rgba(17, 92, 54, 0.08)',
        },
        '&:active': {
          backgroundColor: 'rgba(17, 92, 54, 0.08)',
        },
        cursor: 'pointer',
      }}
      onClick={handleClick}
      role="button"
      aria-label={`${title} - price: ${formatCurrency(
        price,
      )}, click to view more info`}
      tabIndex={0}
    >
      <AspectRatio
        ratio="1/1"
        sx={{
          width: {
            xs: '72px',
            sm: '7.22vw',
          },
          borderRadius: 'md',
          overflow: 'hidden',
          flexShrink: 1,
        }}
      >
        <img
          src={image}
          alt={title}
          loading="lazy"
          style={{
            objectFit: 'contain',
            width: '100%',
            height: '100%',
            backgroundColor: 'white',
          }}
        />
      </AspectRatio>

      <CardContent
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: '65% 25% 10%',
          },
          alignItems: 'center',
          textAlign: 'left',
          paddingLeft: { sm: 2 },
          paddingTop: { xs: 2, sm: 0 },
          gap: 0,
        }}
      >
        <Typography
          level="title-md"
          fontWeight="bold"
          sx={{
            textOverflow: {
              xs: 'ellipsis',
              sm: 'unset',
            },
            overflow: {
              xs: 'hidden',
              sm: 'auto',
            },
            textWrap: {
              xs: 'nowrap',
              sm: 'pretty',
            },
            whiteSpace: 'nowrap',
            width: '100%',
            marginRight: '20px',
          }}
        >
          {title}
        </Typography>

        <Typography level="title-sm" flexWrap={'wrap'}>
          {category.toUpperCase()}
        </Typography>
        <Typography level="title-md" flexWrap={'wrap'}>
          {formatCurrency(price)}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default ProductCard
