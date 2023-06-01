import React from 'react';

export default function ProductItem(products) {
  const product = products.product;
  const imgURL = `http://localhost:5000/${product.image}`;
  return (
    <div>
      <h4>{product.name}</h4>
      <img src={imgURL} alt={product.name} />
      <h6>{product.description}</h6>
    </div>
  );
}
