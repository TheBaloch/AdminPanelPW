import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const steps = [
  'Select campaign settings',
  'Create an ad group',
  'Create an ad',
];

function EditProductModal({ product, onUpdateProduct, onHide }) {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const imgURL = `${process.env.REACT_APP_API_URL}/${product.image}`;
  const [editedProduct, setEditedProduct] = useState({
    name: product.name,
    price: product.price,
    description: product.description,
    category: product.category,
    mainproduct: product.mainproduct,
    categoryext: product.categoryext,
    brand: product.brand,
    image: null,
  });

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
    formData.append('category', editedProduct.category);
    formData.append('mainproduct', editedProduct.mainproduct);
    formData.append('categoryext', editedProduct.categoryext);
    formData.append('brand', editedProduct.brand);
    formData.append('price', editedProduct.price);
    formData.append('description', editedProduct.description);
    formData.append('image', editedProduct.image);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/products/${product._id}`,
        {
          method: 'PUT',
          body: formData,
        }
      );

      if (response.ok) {
        toast.success('Product updated successfully');
        onUpdateProduct();
        onHide();
      } else {
        toast.error('Error updating product:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  return (
    <div>
      <ToastContainer />

      <Modal show={true} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Box sx={{ maxWidth: 400 }}>
            <Stepper activeStep={activeStep} orientation="vertical">
              {steps.map((step, index) => (
                <Step key={index}>
                  <StepLabel>{step}</StepLabel>
                  <StepContent>
                    <Box sx={{ mb: 2 }}>
                      {index === 0 && (
                        <div>
                          <TextField
                            id="outlined-basic"
                            style={{ marginTop: '5px' }}
                            label="title"
                            variant="outlined"
                            name="name"
                            defaultValue={editedProduct.name}
                            onChange={handleInputChange}
                          />
                          <FormControl>
                            <InputLabel id="main-product-label">
                              Product
                            </InputLabel>
                            <Select
                              style={{ width: '160px' }}
                              labelId="main-product-label"
                              id="main-product-select"
                              name="mainproduct"
                              defaultValue={editedProduct.mainproduct}
                              onChange={handleInputChange}
                              label="Product"
                            >
                              <MenuItem value="">
                                <em>None</em>
                              </MenuItem>
                              <MenuItem value="Food">Food</MenuItem>
                              <MenuItem value="Accessories">
                                Accessories
                              </MenuItem>
                            </Select>
                          </FormControl>
                          <div style={{ marginLeft: '3%' }}>
                            {editedProduct.mainproduct === 'Food' && (
                              <FormControl>
                                <InputLabel id="food-category-label">
                                  Food Category
                                </InputLabel>
                                <Select
                                  style={{ width: '190px' }}
                                  labelId="food-category-label"
                                  id="food-category-select"
                                  name="category"
                                  defaultValue={editedProduct.category}
                                  onChange={handleInputChange}
                                  label="Food Category"
                                >
                                  <MenuItem value="">
                                    <em>None</em>
                                  </MenuItem>
                                  <MenuItem value="Dog Food">Dog Food</MenuItem>
                                  <MenuItem value="Cat Food">Cat Food</MenuItem>
                                  <MenuItem value="Rat Food">Rat Food</MenuItem>
                                  <MenuItem value="Snake Food">
                                    Snake Food
                                  </MenuItem>
                                  <MenuItem value="Rabbit Food">
                                    Rabbit Food
                                  </MenuItem>
                                  <MenuItem value="Others Food">
                                    Others Food
                                  </MenuItem>
                                </Select>
                              </FormControl>
                            )}
                            {editedProduct.mainproduct === 'Accessories' && (
                              <FormControl>
                                <InputLabel id="accessories-category-label">
                                  Accessories Category
                                </InputLabel>
                                <Select
                                  style={{ width: '210px' }}
                                  labelId="accessories-category-label"
                                  id="accessories-category-select"
                                  name="category"
                                  defaultValue={editedProduct.category}
                                  onChange={handleInputChange}
                                  // value={newProduct.category}
                                  // onChange={handleInputChange}
                                  label="Accessories Category"
                                >
                                  <MenuItem value="">
                                    <em>None</em>
                                  </MenuItem>
                                  <MenuItem value="Dog Accessories">
                                    Dog Accessories
                                  </MenuItem>
                                  <MenuItem value="Cat Accessories">
                                    Cat Accessories
                                  </MenuItem>
                                  <MenuItem value="Rat Accessories">
                                    Rat Accessories
                                  </MenuItem>
                                  <MenuItem value="Snake Accessories">
                                    Snake Accessories
                                  </MenuItem>
                                  <MenuItem value="Rabbit Accessories">
                                    Rabbit Accessories
                                  </MenuItem>
                                  <MenuItem value="Others Accessories">
                                    Others Accessories
                                  </MenuItem>
                                </Select>
                              </FormControl>
                            )}
                          </div>
                          <div style={{ marginLeft: '3%' }}>
                            {editedProduct.mainproduct === 'Accessories' && (
                              <FormControl>
                                <InputLabel id="accessories-category-label">
                                  Accessories Type
                                </InputLabel>
                                <Select
                                  style={{ width: '190px' }}
                                  labelId="accessories-category-label"
                                  id="accessories-category-select"
                                  name="categoryext"
                                  defaultValue={editedProduct.categoryext}
                                  onChange={handleInputChange}
                                  // value={newProduct.categoryext}
                                  // onChange={handleInputChange}
                                  required
                                  label="Accessories Type"
                                >
                                  <MenuItem value="">
                                    <em>None</em>
                                  </MenuItem>
                                  <MenuItem value="Belts">Belts</MenuItem>
                                  <MenuItem value="Beds">Beds</MenuItem>
                                  <MenuItem value="Shampoos">Shampoos</MenuItem>
                                  <MenuItem value="Toys">Toys</MenuItem>
                                  <MenuItem value="Bowls">Bowls</MenuItem>
                                  <MenuItem value="Clothes">Clothes</MenuItem>
                                  <MenuItem value="Carriers">Carriers</MenuItem>
                                  <MenuItem value="Collars">Collars</MenuItem>
                                  <MenuItem value="Leashes">Leashes</MenuItem>
                                  <MenuItem value="Grooming">
                                    Grooming Supplies
                                  </MenuItem>
                                  <MenuItem value="Travel">
                                    Travel Accessories
                                  </MenuItem>
                                  <MenuItem value="Others">others</MenuItem>
                                </Select>
                              </FormControl>
                            )}
                          </div>
                        </div>
                      )}
                      {index === 1 && (
                        <div>
                          <Form.Group controlId="formvband">
                            <Form.Label>Brand</Form.Label>
                            <Form.Control
                              type="text"
                              name="brand"
                              defaultValue={editedProduct.brand}
                              onChange={handleInputChange}
                              // value={newProduct.brand}
                              // onChange={handleInputChange}
                            />
                          </Form.Group>

                          <Form.Group controlId="formPrice">
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                              type="text"
                              name="price"
                              defaultValue={editedProduct.price}
                              onChange={handleInputChange}
                              // value={newProduct.price}
                              // onChange={handleInputChange}
                            />
                          </Form.Group>

                          <Form.Group controlId="formDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                              as="textarea"
                              name="description"
                              defaultValue={editedProduct.description}
                              onChange={handleInputChange}
                              // value={newProduct.description}
                              // onChange={handleInputChange}
                            />
                          </Form.Group>
                        </div>
                      )}
                      {index === 2 && (
                        <div>
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
                        </div>
                      )}
                    </Box>
                    <div>
                      {activeStep === steps.length - 1 ? (
                        //onClick={handleProductEdit}
                        <Button variant="contained" onClick={handleProductEdit}>
                          Submit
                        </Button>
                      ) : (
                        <Button variant="contained" onClick={handleNext}>
                          Next
                        </Button>
                      )}
                      <Button
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        sx={{ mt: 1, mr: 1 }}
                      >
                        Back
                      </Button>
                    </div>
                  </StepContent>
                </Step>
              ))}
            </Stepper>
            {activeStep === steps.length && (
              <Paper square elevation={0} sx={{ p: 3 }}>
                <Typography>
                  All steps completed - you&apos;re finished
                </Typography>
                <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                  Reset
                </Button>
              </Paper>
            )}
          </Box>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Cancel
          </Button>
          {/* <Button variant="primary" onClick={handleProductEdit}>
          Save Changes
        </Button> */}
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default EditProductModal;
