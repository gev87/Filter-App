// src/components/ProductCard.jsx
import React from "react";
import classes from "./ProductCard.module.css";

const ProductCard = ({ product }) => {
	const { name, brand, price,category, rating, imageUrl } = product;
	return (
		<div className={classes.productCard}>
			<img src={imageUrl} alt={name} className={classes.productImage} />
			<h3 className={classes.productName}>{name}</h3>
			<p className={classes.productCategory}>Category: {category}</p>
			<p className={classes.productBrand}>{brand}</p>
			<p className={classes.productPrice}>${price.toFixed(2)}</p>
			<p className={classes.productRating}>Rating: {rating} Stars</p>
		</div>
	);
};

export default ProductCard;
