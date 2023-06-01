import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductItem from './ProductItem';

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Make the API request to fetch products from MongoDB
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);
  console.log(products);
  return (
    <div>
      <button>Add New</button>
      {products.map((product) => (
        <ProductItem key={product._id} product={product} />
      ))}
    </div>
  );
}
