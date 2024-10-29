import React from 'react';
import ProductCard from '../ProductCard';
import styles from './ProductList.module.css';

const ProductList = ({ products }) => {
  return (
    <div className={styles.productList}>
      {products.length > 0 ? (
        products.map((product) => <ProductCard key={product.id} product={product} />)
      ) : (
        <h1 className={styles.noProducts}>No products found.</h1>
      )}
    </div>
  );
};

export default ProductList;

