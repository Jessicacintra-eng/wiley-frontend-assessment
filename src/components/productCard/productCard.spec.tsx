import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { ProductCardProps } from '../../interfaces/interfaces';
import store from '../../store/store';
import ProductCard from './ProductCard';

describe('ProductCard', () => {
  const product: ProductCardProps = {
    id: 1,
    title: 'Test Product',
    price: 100,
    category: 'Test Category',
    image: 'urltoimage',
  };

  it('renders product details correctly', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ProductCard
            key={product.id}
            id={product.id}
            title={product.title}
            price={product.price}
            category={product.category}
            image={product.image}
          />
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.getByText('Test Product')).toHaveTextContent('Test Product');
    expect(screen.getByText('$100.00')).toBeInTheDocument();
    expect(screen.getByText('TEST CATEGORY')).toBeInTheDocument();
  });
  it('navigates to the correct route on click', () => {
    const { container } = render(
      <Provider store={store}>
        <MemoryRouter>
          <ProductCard
            key={product.id}
            id={product.id}
            title={product.title}
            price={product.price}
            category={product.category}
            image={product.image}
          />
        </MemoryRouter>
      </Provider>,
    );

    const card = container.querySelector('div[role="button"]');
    if (card) {
      fireEvent.click(card);
    }

    expect(window.location.pathname).toBe(`/`);
  });
});
