// import React from "react";
import Modal from "react-bootstrap/Modal";
// import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

import TextField from "@mui/material/TextField";

const steps = [
  "Select campaign settings",
  "Create an ad group",
  "Create an ad",
];

function AddProductModal({
  showModal,
  handleClose,
  handleInputChange,
  handleImageChange,
  handleProductSubmit,
  newProduct,
}) {
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

  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Product</Modal.Title>
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
                          style={{ marginTop: "5px" }}
                          label="Title"
                          variant="outlined"
                          name="name"
                          value={newProduct.name}
                          onChange={handleInputChange}
                        />
                        <FormControl>
                          <InputLabel id="main-product-label">
                            Product
                          </InputLabel>
                          <Select
                            style={{ width: "160px" }}
                            labelId="main-product-label"
                            id="main-product-select"
                            name="mainproduct"
                            value={newProduct.mainproduct}
                            onChange={handleInputChange}
                            label="Product"
                          >
                            <MenuItem value="">
                              <em>None</em>
                            </MenuItem>
                            <MenuItem value="Food">Food</MenuItem>
                            <MenuItem value="Accessories">Accessories</MenuItem>
                          </Select>
                        </FormControl>
                        <div style={{ marginLeft: "3%" }}>
                          {newProduct.mainproduct === "Food" && (
                            <FormControl>
                              <InputLabel id="food-category-label">
                                Food Category
                              </InputLabel>
                              <Select
                                style={{ width: "190px" }}
                                labelId="food-category-label"
                                id="food-category-select"
                                name="category"
                                value={newProduct.category}
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
                          {newProduct.mainproduct === "Accessories" && (
                            <FormControl>
                              <InputLabel id="accessories-category-label">
                                Accessories Category
                              </InputLabel>
                              <Select
                                style={{ width: "210px" }}
                                labelId="accessories-category-label"
                                id="accessories-category-select"
                                name="category"
                                value={newProduct.category}
                                onChange={handleInputChange}
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
                        <div style={{ marginLeft: "3%" }}>
                          {newProduct.mainproduct === "Accessories" && (
                            <FormControl>
                              <InputLabel id="accessories-category-label">
                                Accessories Type
                              </InputLabel>
                              <Select
                                style={{ width: "190px" }}
                                labelId="accessories-category-label"
                                id="accessories-category-select"
                                name="categoryext"
                                value={newProduct.categoryext}
                                onChange={handleInputChange}
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
                            value={newProduct.brand}
                            onChange={handleInputChange}
                          />
                        </Form.Group>

                        <Form.Group controlId="formPrice">
                          <Form.Label>Price</Form.Label>
                          <Form.Control
                            type="text"
                            name="price"
                            value={newProduct.price}
                            onChange={handleInputChange}
                          />
                        </Form.Group>

                        <Form.Group controlId="formDescription">
                          <Form.Label>Description</Form.Label>
                          <Form.Control
                            as="textarea"
                            name="description"
                            value={newProduct.description}
                            onChange={handleInputChange}
                          />
                        </Form.Group>
                      </div>
                    )}
                    {index === 2 && (
                      <div>
                        <Form.Group controlId="formImage">
                          <Form.Label>Image</Form.Label>
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
                      //
                      <Button variant="contained" onClick={handleProductSubmit}>
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
    </Modal>
  );
}

export default AddProductModal;
