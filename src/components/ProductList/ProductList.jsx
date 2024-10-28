import React from 'react';
import ProductCard from '../ProductCard';
import styles from './ProductList.module.css';

const ProductList = ({ products }) => {
  return (
    <div className={styles.productList}>
      {products.length > 0 ? (
        products.map((product) => <ProductCard key={product.id} product={product} />)
      ) : (
        <p className={styles.noProducts}>No products found.</p>
      )}
    </div>
  );
};

export default ProductList;

