import React, { useState } from "react";

const FilterPanel = ({ filters, setFilters }) => {
	const { category, brand, priceRange, rating } = filters;

	const handleInputChange = (e) => {
		const { name, value, type, checked } = e.target;
		setFilters((prev) => ({
			...prev,
			[name]: type === "checkbox" ? checked : value,
		}));
	};

	return (
		<div className="filter-panel">
			<h2>Filters</h2>

			{/* Category Filter */}
			<div>
				<h3>Category</h3>
				<input
					type="text"
					name="category"
					value={category}
					onChange={handleInputChange}
					placeholder="Search category"
				/>
			</div>

			{/* Brand Filter */}
			<div>
				<h3>Brand</h3>
				<input
					type="text"
					name="brand"
					value={brand}
					onChange={handleInputChange}
					placeholder="Search brand"
				/>
			</div>

			{/* Price Range Filter */}
			<div>
				<h3>Price Range</h3>
				<input
					type="range"
					name="priceRange"
					min="0"
					max="1000"
					value={priceRange}
					onChange={handleInputChange}
				/>
				<span>${priceRange}</span>
			</div>

			{/* Rating Filter */}
			<div>
				<h3>Rating</h3>
				<input
					type="number"
					name="rating"
					min="0"
					max="5"
					step="0.1"
					value={rating}
					onChange={handleInputChange}
				/>
			</div>
		</div>
	);
};

export default FilterPanel;
