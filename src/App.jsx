import { useState, useMemo, useEffect } from "react";
import { BRANDS, CATEGORIES, INITIAL_FILTERS, PRODUCTS } from "./data";
import ProductList from "./components/ProductList";
import FilterPanel from "./components/FilterPanel";
import Spinner from "./components/Spinner";
import useDebounce from "./hooks/useDebounce";
import classes from "./App.module.css";

const App = () => {
	const [filters, setFilters] = useState(() => {
		const savedFilters = localStorage.getItem("filters");
		return savedFilters ? JSON.parse(savedFilters) : INITIAL_FILTERS;
	});

	const [isFilterOpen, setIsFilterOpen] = useState(true);
	const [loading, setLoading] = useState(false);

	const debouncedFilters = useDebounce(filters, 500);

	const filteredProducts = useMemo(() => {
		  const { category, brand, priceRange, rating, sortBy } = debouncedFilters;

		  const updatedProducts = PRODUCTS.filter((product) => {
				return (
					(!category || product.category === category) &&
					(!brand || product.brand === brand) &&
					product.price <= priceRange &&
					product.rating >= rating
				);
			});

		if (sortBy) {
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

	useEffect(() => {
		localStorage.setItem("filters", JSON.stringify(filters));
	}, [filters]);

	useEffect(() => {
		setLoading(true);
		const timer = setTimeout(() => setLoading(false), 500);
		return () => clearTimeout(timer);
	}, [debouncedFilters]);

	return (
		<div className={classes.app}>
			<button onClick={() => setIsFilterOpen((prev) => !prev)} className={classes.toggleButton}>
				{isFilterOpen ? "Hide Filters" : "Show Filters"}
			</button>
			{isFilterOpen && (
				<FilterPanel
					filters={filters}
					setFilters={setFilters}
					categories={CATEGORIES}
					brands={BRANDS}
				/>
			)}

			<div className={classes.productList}>
				{loading ? <Spinner loading={loading} /> : <ProductList products={filteredProducts} />}
			</div>
		</div>
	);
};

export default App;
