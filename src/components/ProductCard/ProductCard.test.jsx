import React from 'react';
import { render, screen } from '@testing-library/react';
import ProductCard from './ProductCard';
import '@testing-library/jest-dom';
import { vi } from 'vitest';

vi.mock('./ProductCard.module.css', () => ({
  default: {
    productCard: 'productCard',
    productImage: 'productImage',
    productDetails: 'productDetails',
    productName: 'productName',
    productCategory: 'productCategory',
    productBrand: 'productBrand',
    productPrice: 'productPrice',
    productRating: 'productRating',
  },
}));

vi.mock('react-icons/fa', () => {
  return {
    FaDollarSign: () => <span data-testid="dollar-sign-icon">$</span>,
    FaStar: () => <span data-testid="star-icon">★</span>,
  };
});

describe('ProductCard Component', () => {
  test('renders correctly with given props', () => {
    const product = {
      name: 'Sample Product',
      category: 'Electronics',
      brand: 'Brand A',
      price: 199.99,
      rating: 4.5,
      imageUrl: 'https://example.com/product.jpg',
    };

    render(<ProductCard {...product} />);

    const image = screen.getByRole('img', {
      name: `${product.name} by ${product.brand}`,
    });
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', product.imageUrl);

    expect(
      screen.getByRole('heading', { name: product.name })
    ).toBeInTheDocument();

    expect(
      screen.getByText(`Category: ${product.category}`)
    ).toBeInTheDocument();

    expect(screen.getByText(`Brand: ${product.brand}`)).toBeInTheDocument();


    expect(
      screen.getByText(`${product.rating} Stars`)
    ).toBeInTheDocument();

    expect(screen.getByTestId('dollar-sign-icon')).toBeInTheDocument();

    expect(screen.getByTestId('star-icon')).toBeInTheDocument();
  });
});
