
import React from 'react';
import { render, screen } from '@testing-library/react';
import ProductList from './ProductList';
import '@testing-library/jest-dom';
import { vi } from 'vitest';

vi.mock('../ProductCard', () => {
  return {
    __esModule: true,
    default: ({ name }) => <div data-testid="product-card">{name}</div>,
  };
});

describe('ProductList Component', () => {
  test('renders a list of products when products array is not empty', () => {
    const products = [
      { id: 1, name: 'Product 1', price: 100, rating: 4 },
      { id: 2, name: 'Product 2', price: 200, rating: 5 },
    ];

    render(<ProductList products={products} />);

    const productCards = screen.getAllByTestId('product-card');
    expect(productCards).toHaveLength(products.length);

    products.forEach((product) => {
      expect(screen.getByText(product.name)).toBeInTheDocument();
    });

    expect(screen.queryByText(/No products found/i)).not.toBeInTheDocument();
  });

  test('displays "No products found" message when products array is empty', () => {
    const products = [];

    render(<ProductList products={products} />);

    expect(screen.getByText(/No products found/i)).toBeInTheDocument();

    expect(screen.queryByTestId('product-card')).not.toBeInTheDocument();
  });
});
