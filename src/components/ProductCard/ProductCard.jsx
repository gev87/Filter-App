
import { memo } from "react";
import classes from "./ProductCard.module.css";
import { FaDollarSign, FaStar } from "react-icons/fa";

const ProductCard = ({ name, category, brand, price, rating, imageUrl }) => {

	return (
		<div className={classes.productCard}>
			<img src={imageUrl} alt={`${name} by ${brand}`} className={classes.productImage} />
			<div className={classes.productDetails}>
				<h3 className={classes.productName}>{name}</h3>
				<p className={classes.productCategory}>Category: {category}</p>
				<p className={classes.productBrand}>Brand: {brand}</p>
				<p className={classes.productPrice}>
					<FaDollarSign />
					{price.toFixed(2)}
				</p>
				<p className={classes.productRating}>
					<FaStar /> {rating} Stars
				</p>
			</div>
		</div>
	);
};

export default memo(ProductCard);
