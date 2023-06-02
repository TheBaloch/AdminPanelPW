import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductItem from './ProductItem';

function Products() {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAdd = () => {
    alert('Add New');
  };

  const handleProductDelete = async (productId) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this product?'
    );
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:5000/api/products/${productId}`);
        fetchProducts(); // Fetch the updated list of products after successful deletion
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  return (
    <div style={{ width: '30rem' }}>
      <button onClick={handleAdd}>Add New</button>
      <h3>All Products</h3>
      {products.map((product) => (
        <ProductItem
          key={product._id}
          product={product}
          onDelete={handleProductDelete}
        />
      ))}
    </div>
  );
}

export default Products;
