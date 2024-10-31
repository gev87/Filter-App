
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';
import '@testing-library/jest-dom';
import { vi } from 'vitest';
import { PRODUCTS } from './data';

vi.mock('./hooks/useDebounce', () => ({
  default: (value) => value,
}));


beforeEach(() => {
  Storage.prototype.getItem = vi.fn(() => null);
  Storage.prototype.setItem = vi.fn();
});

describe('App Component', () => {
  test('renders the App component with FilterPanel and ProductList', async () => {
    render(<App />);
 
    expect(screen.getByRole('heading', { name: /Filters/i })).toBeInTheDocument();
   
    await waitFor(() => {
      PRODUCTS.forEach((product) => {
        expect(screen.getByText(product.name)).toBeInTheDocument();
      });
    });
  });

  test('shows and hides the filter panel when the toggle button is clicked', () => {
    render(<App />);

    const toggleButton = screen.getByRole('button', { name: /Hide Filters/i });

    expect(screen.getByRole('heading', { name: /Filters/i })).toBeInTheDocument();

    fireEvent.click(toggleButton);

    expect(screen.queryByRole('heading', { name: /Filters/i })).not.toBeInTheDocument();

    expect(screen.getByRole('button', { name: /Show Filters/i })).toBeInTheDocument();
  });

  test('filters products based on user input', async () => {
    render(<App />);

    
    await waitFor(() => {
      expect(screen.getByText(PRODUCTS[0].name)).toBeInTheDocument();
    });

    fireEvent.change(screen.getByLabelText('Category'), {
      target: { value: 'Electronics' },
    });

    fireEvent.change(screen.getByLabelText('Brand'), {
      target: { value: 'Brand A' },
    });

    fireEvent.change(screen.getByLabelText('Price Range: Up to $1000'), {
      target: { value: '500' },
    });

    fireEvent.change(screen.getByLabelText('Minimum Rating: 0 Stars'), {
      target: { value: '4' },
    });

    await waitFor(() => {
      const filteredProducts = PRODUCTS.filter(
        (product) =>
          product.category === 'Electronics' &&
          product.brand === 'Brand A' &&
          product.price <= 500 &&
          product.rating >= 4
      );

      filteredProducts.forEach((product) => {
        expect(screen.getByText(product.name)).toBeInTheDocument();
      });

      const otherProducts = PRODUCTS.filter(
        (product) => !filteredProducts.includes(product)
      );

      otherProducts.forEach((product) => {
        expect(screen.queryByText(product.name)).not.toBeInTheDocument();
      });
    });
  });

  test('updates the product list in real time when filters change', async () => {
    render(<App />);

    await waitFor(() => {
      expect(screen.getByText(PRODUCTS[0].name)).toBeInTheDocument();
    });

    fireEvent.change(screen.getByLabelText('Category'), {
      target: { value: 'Clothing' },
    });

    await waitFor(() => {
      const clothingProducts = PRODUCTS.filter(
        (product) => product.category === 'Clothing'
      );

      clothingProducts.forEach((product) => {
        expect(screen.getByText(product.name)).toBeInTheDocument();
      });

      const otherProducts = PRODUCTS.filter(
        (product) => product.category !== 'Clothing'
      );

      otherProducts.forEach((product) => {
        expect(screen.queryByText(product.name)).not.toBeInTheDocument();
      });
    });

    fireEvent.change(screen.getByLabelText('Category'), {
      target: { value: '' },
    });

    await waitFor(() => {
      PRODUCTS.forEach((product) => {
        expect(screen.getByText(product.name)).toBeInTheDocument();
      });
    });
  });


  test('sorts products correctly when sortBy filter changes', async () => {
    render(<App />);

    await waitFor(() => {
      expect(screen.getByText(PRODUCTS[0].name)).toBeInTheDocument();
    });

    fireEvent.change(screen.getByLabelText('Sort By'), {
      target: { value: 'price-asc' },
    });

    await waitFor(() => {
      const sortedProducts = [...PRODUCTS].sort((a, b) => a.price - b.price);

      const productElements = screen.getAllByTestId('product-card');
      productElements.forEach((element, index) => {
        expect(element).toHaveTextContent(sortedProducts[index].name);
      });
    });

    fireEvent.change(screen.getByLabelText('Sort By'), {
      target: { value: 'rating-desc' },
    });

    await waitFor(() => {
      const sortedProducts = [...PRODUCTS].sort((a, b) => b.rating - a.rating);

      const productElements = screen.getAllByTestId('product-card');
      productElements.forEach((element, index) => {
        expect(element).toHaveTextContent(sortedProducts[index].name);
      });
    });
  });
});
