import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FilterPanel from './FilterPanel';
import '@testing-library/jest-dom';
import { vi } from 'vitest';

describe('FilterPanel Component', () => {
  function expectSetFiltersToHaveBeenLastCalledWithUpdatedFilters(setFilters, prevFilters, expectedUpdatedFilters) {
    expect(setFilters).toHaveBeenCalled();

    const setFiltersCalls = setFilters.mock.calls;
    const lastCallIndex = setFiltersCalls.length - 1;
    const setFiltersArg = setFiltersCalls[lastCallIndex][0];

    expect(typeof setFiltersArg).toBe('function');

    const updatedFilters = setFiltersArg(prevFilters);

    expect(updatedFilters).toEqual(expectedUpdatedFilters);
  }

  test('renders all filter inputs', () => {
    const filters = {
      category: '',
      brand: '',
      priceRange: 1000,
      rating: 0,
      sortBy: '',
    };

    const categories = ['Electronics', 'Footwear', 'Clothing'];
    const brands = ['Brand A', 'Brand B', 'Brand C'];
    const setFilters = vi.fn();

    render(
      <FilterPanel
        filters={filters}
        categories={categories}
        brands={brands}
        setFilters={setFilters}
      />
    );

    expect(screen.getByLabelText('Category')).toBeInTheDocument();
    expect(screen.getByLabelText('Brand')).toBeInTheDocument();
    expect(screen.getByLabelText('Price Range: Up to $1000')).toBeInTheDocument();
    expect(screen.getByLabelText('Minimum Rating: 0 Stars')).toBeInTheDocument();
    expect(screen.getByLabelText('Sort By')).toBeInTheDocument();
  });

  test('updates filters state when select inputs change', () => {
    const filters = {
      category: '',
      brand: '',
      priceRange: 1000,
      rating: 0,
      sortBy: '',
    };

    const categories = ['Electronics', 'Footwear', 'Clothing'];
    const brands = ['Brand A', 'Brand B', 'Brand C'];
    const setFilters = vi.fn();

    render(
      <FilterPanel
        filters={filters}
        categories={categories}
        brands={brands}
        setFilters={setFilters}
      />
    );

    fireEvent.change(screen.getByLabelText('Category'), {
      target: { value: 'Electronics' },
    });

    expectSetFiltersToHaveBeenLastCalledWithUpdatedFilters(setFilters, filters, {
      ...filters,
      category: 'Electronics',
    });

    fireEvent.change(screen.getByLabelText('Brand'), {
      target: { value: 'Brand B' },
    });

    expectSetFiltersToHaveBeenLastCalledWithUpdatedFilters(setFilters, filters, {
      ...filters,
      brand: 'Brand B',
    });

    fireEvent.change(screen.getByLabelText('Sort By'), {
      target: { value: 'price-asc' },
    });

    expectSetFiltersToHaveBeenLastCalledWithUpdatedFilters(setFilters, filters, {
      ...filters,
      sortBy: 'price-asc',
    });
  });

  test('updates filters state when range inputs change', () => {
    const filters = {
      category: '',
      brand: '',
      priceRange: 1000,
      rating: 0,
      sortBy: '',
    };

    const categories = ['Electronics', 'Footwear', 'Clothing'];
    const brands = ['Brand A', 'Brand B', 'Brand C'];
    const setFilters = vi.fn();

    render(
      <FilterPanel
        filters={filters}
        categories={categories}
        brands={brands}
        setFilters={setFilters}
      />
    );

    fireEvent.change(screen.getByLabelText('Price Range: Up to $1000'), {
      target: { value: '500' },
    });

    expectSetFiltersToHaveBeenLastCalledWithUpdatedFilters(setFilters, filters, {
      ...filters,
      priceRange: 500,
    });

    fireEvent.change(screen.getByLabelText('Minimum Rating: 0 Stars'), {
      target: { value: '4.5' },
    });

    expectSetFiltersToHaveBeenLastCalledWithUpdatedFilters(setFilters, filters, {
      ...filters,
      rating: 4.5,
    });
  });

  test('displays default options for select inputs', () => {
    const filters = {
      category: '',
      brand: '',
      priceRange: 1000,
      rating: 0,
      sortBy: '',
    };

    const categories = ['Electronics', 'Footwear', 'Clothing'];
    const brands = ['Brand A', 'Brand B', 'Brand C'];
    const setFilters = vi.fn();

    render(
      <FilterPanel
        filters={filters}
        categories={categories}
        brands={brands}
        setFilters={setFilters}
      />
    );

    expect(
      screen.getByRole('option', { name: 'All Categories' })
    ).toBeInTheDocument();

    expect(
      screen.getByRole('option', { name: 'All Brands' })
    ).toBeInTheDocument();
  });

  test('passes correct props to Select and RangeInput components', () => {
    const filters = {
      category: 'Electronics',
      brand: 'Brand A',
      priceRange: 500,
      rating: 4,
      sortBy: 'price-desc',
    };

    const categories = ['Electronics', 'Footwear', 'Clothing'];
    const brands = ['Brand A', 'Brand B', 'Brand C'];
    const setFilters = vi.fn();

    render(
      <FilterPanel
        filters={filters}
        categories={categories}
        brands={brands}
        setFilters={setFilters}
      />
    );

    expect(screen.getByLabelText('Category')).toHaveValue('Electronics');
    expect(screen.getByLabelText('Brand')).toHaveValue('Brand A');
    expect(screen.getByLabelText('Sort By')).toHaveValue('price-desc');

    expect(screen.getByLabelText('Price Range: Up to $500')).toHaveValue('500');
    expect(screen.getByLabelText('Minimum Rating: 4 Stars')).toHaveValue('4');
  });
});
