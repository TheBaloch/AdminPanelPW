import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function ProductItem({ product, onDelete, onUpdateProduct }) {
  const imgURL = `http://localhost:5000${product.image}`;
  const [showModal, setShowModal] = useState(false);
  const [editedProduct, setEditedProduct] = useState({
    name: product.name,
    price: product.price,
    description: product.description,
    image: null,
  });

  const handleEdit = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setEditedProduct((prevProduct) => ({
      ...prevProduct,
      image: file,
    }));
  };

  const handleProductEdit = async () => {
    const formData = new FormData();
    formData.append('name', editedProduct.name);
    formData.append('price', editedProduct.price);
    formData.append('description', editedProduct.description);
    formData.append('image', editedProduct.image);

    try {
      const response = await fetch(
        `http://localhost:5000/api/products/${product._id}`,
        {
          method: 'PUT',
          body: formData,
        }
      );

      if (response.ok) {
        console.log('Product updated successfully');
        handleClose();
        onUpdateProduct();
      } else {
        console.error('Error updating product:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating product:', error);
    }
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

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={editedProduct.name}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="text"
                name="price"
                value={editedProduct.price}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                value={editedProduct.description}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formImage">
              <Form.Label>Current Image</Form.Label>
              <br />
              <img
                src={imgURL}
                alt={product.name}
                style={{
                  height: '100px',
                  width: '100px',
                  marginBottom: '10px',
                }}
              />
              <Form.Label>Upload New Image</Form.Label>
              <Form.Control
                type="file"
                name="image"
                onChange={handleImageChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleProductEdit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ProductItem;
