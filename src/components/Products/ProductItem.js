import React from 'react';

function ProductItem({ product, onDelete }) {
  const imgURL = `http://localhost:5000${product.image}`;

  const handleEdit = () => {
    alert('Edit');
  };

  const handleDelete = () => {
    onDelete(product._id);
  };

  return (
    <div style={{ display: 'inline-flex' }}>
      <img
        src={imgURL}
        alt={product.name}
        style={{ height: '40px', width: '40px' }}
      />
      <p>{product.name}</p>
      <h6>{product.price}</h6>
      <button onClick={handleEdit}>Edit</button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}

export default ProductItem;
