import ProductCard from "../ProductCard";
import classes from "./ProductList.module.css";

const ProductList = ({ products }) => {
	return (
		<div className={classes.productList}>
			{products.length > 0 ? (
				products.map((product) => <ProductCard key={product.id} {...product} />)
			) : (
				<h1 className={classes.noProducts}>No products found !</h1>
			)}
		</div>
	);
};

export default ProductList;
