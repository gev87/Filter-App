// src/App.jsx
import React, { useState, useMemo, useEffect } from "react";
import "./App.css"; // Import global CSS variables
import styles from "./App.module.css"; // Import CSS module for App component
import { BRANDS, CATEGORIES, INITIAL_FILTERS, PRODUCTS } from "./data"; // Import mock data
import ProductList from "./components/ProductList"; // Product list component
import FilterPanel from "./components/FilterPanel"; // Filter panel component
import Spinner from "./components/Spinner"; // Spinner component
import useDebounce from "./hooks/useDebounce"; // Custom debounce hook



const App = () => {
	// State for filters, loaded from localStorage if available
	const [filters, setFilters] = useState(() => {
		const savedFilters = localStorage.getItem("filters");
		return savedFilters ? JSON.parse(savedFilters) : INITIAL_FILTERS;
	});

	// State to control the visibility of the filter panel
	const [isFilterOpen, setIsFilterOpen] = useState(true);

	// State for loading indicator
	const [loading, setLoading] = useState(false);

	// Debounce the filters to prevent unnecessary re-renders
	const debouncedFilters = useDebounce(filters,500);
	

	// Apply filters and sorting logic
	const filteredProducts = useMemo(() => {
		let updatedProducts = [...PRODUCTS];

		// Filter by category
		if (debouncedFilters.category) {
			updatedProducts = updatedProducts.filter(
				(product) => product.category === debouncedFilters.category
			);
		}

		// Filter by brand
		if (debouncedFilters.brand) {
			updatedProducts = updatedProducts.filter(
				(product) => product.brand === debouncedFilters.brand
			);
		}

		// Filter by price range
		updatedProducts = updatedProducts.filter(
			(product) => product.price <= debouncedFilters.priceRange
		);

		// Filter by rating
		updatedProducts = updatedProducts.filter(
			(product) => product.rating >= debouncedFilters.rating
		);

		// Sort products
		if (debouncedFilters.sortBy) {
			const [key, order] = debouncedFilters.sortBy.split("-");
			updatedProducts.sort((a, b) => {
				if (order === "asc") {
					return a[key] - b[key];
				} else {
					return b[key] - a[key];
				}
			});
		}

		return updatedProducts;
	}, [debouncedFilters]);

	// Save filters to localStorage whenever they change
	useEffect(() => {
		localStorage.setItem("filters", JSON.stringify(filters));
	}, [filters]);

	// Simulate loading when filters change
	useEffect(() => {
		setLoading(true);
		const timer = setTimeout(() => setLoading(false), 500); // Simulate a 500ms loading time
		return () => clearTimeout(timer);
	}, [debouncedFilters]);

	return (
		<div className={styles.app}>
			{/* Toggle button for filter panel on smaller screens */}
			<button onClick={() => setIsFilterOpen((prev) => !prev)} className={styles.toggleButton}>
				{isFilterOpen ? "Hide Filters" : "Show Filters"}
			</button>

			{/* Filter panel */}
			{isFilterOpen && (
				<FilterPanel
					filters={filters}
					setFilters={setFilters}
					categories={CATEGORIES}
					brands={BRANDS}
				/>
			)}

			{/* Product list or loading spinner */}
			<div className={styles.productList}>
				{loading ? <Spinner loading={loading} /> : <ProductList products={filteredProducts} />}
			</div>
		</div>
	);
};

export default App;
