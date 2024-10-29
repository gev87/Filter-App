// src/components/FilterPanel.jsx
import React from "react";
import classes from "./FilterPanel.module.css";

const FilterPanel = ({ filters, setFilters, categories, brands }) => {
	const { category,brand,priceRange,rating,sortBy } = filters;
	

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

			{/* Category Filter */}
			<div className={classes.filterSection}>
				<label htmlFor="category" className={classes.filterLabel}>
					Category
				</label>
				<select
					name="category"
					value={category}
					onChange={handleSelectChange}
					className={classes.filterSelect}
				>
					<option value="">All Categories</option>
					{categories.map((category) => (
						<option key={category} value={category}>
							{category}
						</option>
					))}
				</select>
			</div>

			{/* Brand Filter */}
			<div className={classes.filterSection}>
				<label htmlFor="brand" className={classes.filterLabel}>
					Brand
				</label>
				<select
					name="brand"
					value={brand}
					onChange={handleSelectChange}
					className={classes.filterSelect}
				>
					<option value="">All Brands</option>
					{brands.map((br) => (
						<option key={br} value={br}>
							{br}
						</option>
					))}
				</select>
			</div>

			{/* Price Range Filter */}
			<div className={classes.filterSection}>
				<label htmlFor="priceRange" className={classes.filterLabel}>
					Price Range: Up to ${priceRange}
				</label>
				<input
					type="range"
					name="priceRange"
					min="0"
					max="1000"
					step="10"
					value={priceRange}
					onChange={handleRangeChange}
					className={classes.filterRange}
				/>
			</div>

			{/* Rating Filter */}
			<div className={classes.filterSection}>
				<label htmlFor="rating" className={classes.filterLabel}>
					Minimum Rating: {rating} Stars
				</label>
				<input
					type="range"
					name="rating"
					min="0"
					max="5"
					step="0.5"
					value={rating}
					onChange={handleRangeChange}
					className={classes.filterRange}
				/>
			</div>

			{/* Sort By Filter */}
			<div className={classes.filterSection}>
				<label htmlFor="sortBy" className={classes.filterLabel}>
					Sort By
				</label>
				<select
					name="sortBy"
					value={sortBy}
					onChange={handleSelectChange}
					className={classes.filterSelect}
				>
					<option value="">Select</option>
					<option value="price-asc">Price: Low to High</option>
					<option value="price-desc">Price: High to Low</option>
					<option value="rating-asc">Rating: Low to High</option>
					<option value="rating-desc">Rating: High to Low</option>
				</select>
			</div>
		</div>
	);
};

export default FilterPanel;
