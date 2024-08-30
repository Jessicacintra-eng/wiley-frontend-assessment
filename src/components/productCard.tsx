import { useNavigate } from 'react-router-dom';
import { ProductCardProps } from '../interfaces/interfaces';
import { formatCurrency } from '../utils/currencyFormat';

function ProductCard({ id, title, price, image }: Readonly<ProductCardProps>) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/product/${id}`);
    };

    return (
        <div 
            onClick={handleClick} 
            role='button'
            aria-label={`${title} - price: ${formatCurrency(price)}, click to view more info`} 
            tabIndex={0}
        >
            <img 
                aria-hidden={true} 
                src={image} 
                alt={title} 
            />
            <h2 aria-hidden={true} >{title}</h2>
            <p  aria-hidden={true} >{formatCurrency(price)}</p>
        </div>
    );
}

export default ProductCard;
