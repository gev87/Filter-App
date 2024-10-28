import { useState, useMemo } from "react";
import { products as mockProducts } from "./data";
import ProductList from "./components/ProductList";
import FilterPanel from "./components/FilterPanel";
import useDebounce from "./hooks/useDebounce";
import classes from "./App.module.css";
import "./App.css";

const App = () => {
	const [filters, setFilters] = useState({
		category: "",
		brand: "",
		priceRange: 1000,
		rating: 0,
		sortBy: "",
	});

	const categories = [...new Set(mockProducts.map((product) => product.category))];
	const brands = [...new Set(mockProducts.map((product) => product.brand))];

	const debouncedFilters = useDebounce(filters, 500);

	const filteredProducts = useMemo(() => {
		// ... (filtering logic)
	}, [debouncedFilters]);

	return (
		<div className={classes.app}>
			<FilterPanel
				filters={filters}
				setFilters={setFilters}
				categories={categories}
				brands={brands}
			/>
			<ProductList products={mockProducts} />
		</div>
	);
};

export default App;
