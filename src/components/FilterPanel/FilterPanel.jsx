import RangeInput from "../RangeInput";
import Select from "../Select";
import { SORT_OPTIONS } from "./contants";
import classes from "./FilterPanel.module.css";

const FilterPanel = ({ filters, categories, brands, setFilters }) => {
	const { category, brand, priceRange, rating, sortBy } = filters;

	const handleSelectChange = (event) => {
		const { name, value } = event.target;
		setFilters((prev) => ({ ...prev, [name]: value }));
	};

	const handleRangeChange = (event) => {
		const { name, value } = event.target;
		setFilters((prev) => ({ ...prev, [name]: Number(value) }));
	};

	return (
		<div className={classes.filterPanel}>
			<h2 className={classes.filterTitle}>Filters</h2>

			<Select
				id="category"
				name="category"
				label="Category"
				value={category}
				onChange={handleSelectChange}
				options={categories}
				defaultOption={{ value: "", label: "All Categories" }}
			/>

			<Select
				id="brand"
				name="brand"
				label="Brand"
				value={brand}
				onChange={handleSelectChange}
				options={brands}
				defaultOption={{ value: "", label: "All Brands" }}
			/>

			<RangeInput
				id="priceRange"
				name="priceRange"
				label="Price Range"
				min={0}
				max={1000}
				step={10}
				value={priceRange}
				onChange={handleRangeChange}
				formatLabel={(value) => `Price Range: Up to $${value}`}
			/>

			<RangeInput
				id="rating"
				name="rating"
				label="Minimum Rating"
				min={0}
				max={5}
				step={0.5}
				value={rating}
				onChange={handleRangeChange}
				formatLabel={(value) => `Minimum Rating: ${value} Stars`}
			/>
			<Select
				id="sortBy"
				name="sortBy"
				label="Sort By"
				value={sortBy}
				onChange={handleSelectChange}
				options={SORT_OPTIONS}
			/>
		</div>
	);
};

export default FilterPanel;
