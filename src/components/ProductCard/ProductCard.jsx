// src/components/ProductCard.jsx
import React from "react";
import styles from "./ProductCard.module.css";
import { FaDollarSign, FaStar } from "react-icons/fa";

const ProductCard = ({ product }) => {
	const { name, category, brand, price, rating, imageUrl } = product;

	return (
		<div className={styles.productCard}>
			<img src={imageUrl} alt={`${name} by ${brand}`} className={styles.productImage} />
			<div className={styles.productDetails}>
				<h3 className={styles.productName}>{name}</h3>
				<p className={styles.productCategory}>Category: {category}</p>
				<p className={styles.productBrand}>Brand: {brand}</p>
				<p className={styles.productPrice}>
					<FaDollarSign />{price.toFixed(2)}
				</p>
				<p className={styles.productRating}>
					<FaStar /> {rating} Stars
				</p>
			</div>
		</div>
	);
};

export default ProductCard;
