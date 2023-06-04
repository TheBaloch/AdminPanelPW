// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import ProductItem from "./ProductItem";
// import Button from "react-bootstrap/Button";
// import Stepper from "@mui/material/Stepper";
// import Step from "@mui/material/Step";
// import StepLabel from "@mui/material/StepLabel";
// import TextField from "@mui/material/TextField";
// import FormControl from "@mui/material/FormControl";
// import InputLabel from "@mui/material/InputLabel";
// import Select from "@mui/material/Select";
// import MenuItem from "@mui/material/MenuItem";
// import Box from "@mui/material/Box";
// import Typography from "@mui/material/Typography";
// import Modal from "@mui/material/Modal";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const style = {
//   marginTop: "10px",
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 800,
//   bgcolor: "background.paper",
//   border: "2px solid #000",
//   p: 5,
// };

// const steps = ["Select campaign settings", "Create an ad"];

// function Products() {
//   const [activeStep, setActiveStep] = React.useState(0);
//   const [open, setOpen] = React.useState(false);
//   const handleOpen = () => setOpen(true);
//   const [products, setProducts] = useState([]);
//   const [newProduct, setNewProduct] = useState({
//     name: "",
//     category: "",
//     mainproduct: "",
//     categoryext: "",
//     brand: "",
//     rating: "",
//     price: "",
//     description: "",
//     image: null,
//   });

//   const fetchProducts = async () => {
//     try {
//       const response = await axios.get("http://localhost:5000/api/products");
//       setProducts(response.data);
//     } catch (error) {
//       console.error("Error fetching products:", error);
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const handleClose = () => {
//     setOpen(false);
//     setNewProduct({
//       name: "",
//       price: "",
//       description: "",
//       category: "",
//       mainproduct: "",
//       categoryext: "",
//       brand: "",
//       rating: "",
//       image: null,
//     });
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewProduct((prevProduct) => ({
//       ...prevProduct,
//       [name]: value,
//     }));
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     setNewProduct((prevProduct) => ({
//       ...prevProduct,
//       image: file,
//     }));
//   };

//   const handleProductSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const formData = new FormData();
//       formData.append("name", newProduct.name);
//       formData.append("category", newProduct.category);
//       formData.append("mainproduct", newProduct.mainproduct);
//       formData.append("categoryext", newProduct.categoryext);

//       formData.append("brand", newProduct.brand);
//       formData.append("rating", newProduct.rating);
//       formData.append("price", newProduct.price);
//       formData.append("description", newProduct.description);
//       formData.append("image", newProduct.image);

//       await axios.post("http://localhost:5000/api/products", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       handleClose();
//       fetchProducts();
//     } catch (error) {
//       console.error("Error adding product:", error);
//     }
//   };

//   const handleProductDelete = async (productId) => {
//     toast.success("sucessfully deleted!");
//     // const confirmDelete = window.confirm(
//     //   "Are you sure you want to delete this product?"
//     // );
//     // if (confirmDelete) {
//     try {
//       await axios.delete(`http://localhost:5000/api/products/${productId}`);
//       fetchProducts();
//     } catch (error) {
//       console.error("Error deleting product:", error);
//     }
//     // }
//   };

//   const updateProductList = () => {
//     fetchProducts();
//   };

//   const handleNext = () => {
//     setActiveStep((prevActiveStep) => prevActiveStep + 1);
//   };

//   const handleBack = () => {
//     setActiveStep((prevActiveStep) => prevActiveStep - 1);
//   };
//   const renderStepContent = (step) => {
//     switch (step) {
//       case 0:
//         return (
//           <div style={{ display: "grid" }}>
//             <div>
//               <div style={{ marginLeft: "5%" }}>
//                 <h5
//                   style={{
//                     marginTop: "20px",
//                     marginBottom: "10px",
//                     color: "grey",
//                   }}
//                 >
//                   Name*
//                 </h5>

//                 <TextField
//                   id="outlined-basic"
//                   style={{ marginTop: "5px" }}
//                   label="Title"
//                   variant="outlined"
//                   name="name"
//                   value={newProduct.name}
//                   onChange={handleInputChange}
//                 />
//               </div>
//               <div>
//                 <h5
//                   style={{
//                     marginLeft: "5%",
//                     marginTop: "20px",
//                     marginBottom: "10px",
//                     color: "grey",
//                   }}
//                 >
//                   Product*
//                 </h5>
//                 <div style={{ marginLeft: "5%", display: "flex" }}>
//                   <FormControl>
//                     <InputLabel id="main-product-label">Product</InputLabel>
//                     <Select
//                       style={{ width: "160px" }}
//                       labelId="main-product-label"
//                       id="main-product-select"
//                       name="mainproduct"
//                       value={newProduct.mainproduct}
//                       onChange={handleInputChange}
//                       label="Product"
//                     >
//                       <MenuItem value="">
//                         <em>None</em>
//                       </MenuItem>
//                       <MenuItem value="Food">Food</MenuItem>
//                       <MenuItem value="Accessories">Accessories</MenuItem>
//                     </Select>
//                   </FormControl>
//                   <div style={{ marginLeft: "3%" }}>
//                     {newProduct.mainproduct === "Food" && (
//                       <FormControl>
//                         <InputLabel id="food-category-label">
//                           Food Category
//                         </InputLabel>
//                         <Select
//                           style={{ width: "190px" }}
//                           labelId="food-category-label"
//                           id="food-category-select"
//                           name="category"
//                           value={newProduct.category}
//                           onChange={handleInputChange}
//                           label="Food Category"
//                         >
//                           <MenuItem value="">
//                             <em>None</em>
//                           </MenuItem>
//                           <MenuItem value="Dog Food">Dog Food</MenuItem>
//                           <MenuItem value="Cat Food">Cat Food</MenuItem>
//                           <MenuItem value="Rat Food">Rat Food</MenuItem>
//                           <MenuItem value="Snake Food">Snake Food</MenuItem>
//                           <MenuItem value="Rabbit Food">Rabbit Food</MenuItem>
//                           <MenuItem value="Others Food">Others Food</MenuItem>
//                         </Select>
//                       </FormControl>
//                     )}
//                     {newProduct.mainproduct === "Accessories" && (
//                       <FormControl>
//                         <InputLabel id="accessories-category-label">
//                           Accessories Category
//                         </InputLabel>
//                         <Select
//                           style={{ width: "210px" }}
//                           labelId="accessories-category-label"
//                           id="accessories-category-select"
//                           name="category"
//                           value={newProduct.category}
//                           onChange={handleInputChange}
//                           label="Accessories Category"
//                         >
//                           <MenuItem value="">
//                             <em>None</em>
//                           </MenuItem>
//                           <MenuItem value="Dog Accessories">
//                             Dog Accessories
//                           </MenuItem>
//                           <MenuItem value="Cat Accessories">
//                             Cat Accessories
//                           </MenuItem>
//                           <MenuItem value="Rat Accessories">
//                             Rat Accessories
//                           </MenuItem>
//                           <MenuItem value="Snake Accessories">
//                             Snake Accessories
//                           </MenuItem>
//                           <MenuItem value="Rabbit Accessories">
//                             Rabbit Accessories
//                           </MenuItem>
//                           <MenuItem value="Others Accessories">
//                             Others Accessories
//                           </MenuItem>
//                         </Select>
//                       </FormControl>
//                     )}
//                   </div>
//                   <div style={{ marginLeft: "3%" }}>
//                     {newProduct.mainproduct === "Accessories" && (
//                       <FormControl>
//                         <InputLabel id="accessories-category-label">
//                           Accessories Type
//                         </InputLabel>
//                         <Select
//                           style={{ width: "190px" }}
//                           labelId="accessories-category-label"
//                           id="accessories-category-select"
//                           name="categoryext"
//                           value={newProduct.categoryext}
//                           onChange={handleInputChange}
//                           required
//                           label="Accessories Type"
//                         >
//                           <MenuItem value="">
//                             <em>None</em>
//                           </MenuItem>
//                           <MenuItem value="Belts">Belts</MenuItem>
//                           <MenuItem value="Beds">Beds</MenuItem>
//                           <MenuItem value="Shampoos">Shampoos</MenuItem>
//                           <MenuItem value="Toys">Toys</MenuItem>
//                           <MenuItem value="Bowls">Bowls</MenuItem>
//                           <MenuItem value="Clothes">Clothes</MenuItem>
//                           <MenuItem value="Carriers">Carriers</MenuItem>
//                           <MenuItem value="Collars">Collars</MenuItem>
//                           <MenuItem value="Leashes">Leashes</MenuItem>
//                           <MenuItem value="Grooming">
//                             Grooming Supplies
//                           </MenuItem>
//                           <MenuItem value="Travel">Travel Accessories</MenuItem>
//                           <MenuItem value="Others">others</MenuItem>
//                         </Select>
//                       </FormControl>
//                     )}
//                   </div>
//                 </div>
//               </div>

//               <div style={{ marginLeft: "5%" }}>
//                 <h5
//                   style={{
//                     marginTop: "20px",
//                     marginBottom: "10px",
//                     color: "grey",
//                   }}
//                 >
//                   Brand*
//                 </h5>

//                 <TextField
//                   id="outlined-basic"
//                   style={{ marginTop: "5px" }}
//                   label="Title"
//                   variant="outlined"
//                   name="brand"
//                   value={newProduct.brand}
//                   onChange={handleInputChange}
//                   required
//                 />
//               </div>
//             </div>
//           </div>
//         );
//       case 1:
//         return (
//           <div>
//             <div>
//               <label>Price:</label>
//               <input
//                 type="number"
//                 name="price"
//                 value={newProduct.price}
//                 onChange={handleInputChange}
//                 required
//               />
//             </div>

//             <div>
//               <label>Description:</label>
//               <textarea
//                 name="description"
//                 value={newProduct.description}
//                 onChange={handleInputChange}
//                 required
//               ></textarea>
//             </div>
//             <div>
//               <label>Image:</label>
//               <input
//                 type="file"
//                 name="image"
//                 onChange={handleImageChange}
//                 required
//               />
//             </div>
//           </div>
//         );
//       case 2:
//         return <></>;
//       default:
//         return null;
//     }
//   };

//   return (
//     <div style={{ width: "30rem" }}>
//       <ToastContainer />
//       <button onClick={handleOpen}>Add New</button>
//       <h3>All Products</h3>
//       {products.map((product) => (
//         <ProductItem
//           key={product._id}
//           product={product}
//           onDelete={handleProductDelete}
//           onUpdateProduct={updateProductList}
//         />
//       ))}
//       <Modal
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="modal-modal-title"
//         aria-describedby="modal-modal-description"
//       >
//         <Box sx={style}>
//           <Typography id="modal-modal-description" sx={{ mt: 2 }}>
//             <div>
//               <h1
//                 style={{
//                   textAlign: "center",
//                   fontSize: "3rem",
//                   marginBottom: "0",
//                   marginTop: "8px",
//                 }}
//               >
//                 Add Products
//               </h1>
//               <Box sx={{ marginTop: "30px" }}>
//                 <Stepper activeStep={activeStep}>
//                   {steps.map((label, index) => {
//                     const stepProps = {};
//                     const labelProps = {};
//                     return (
//                       <Step key={label} {...stepProps}>
//                         <StepLabel {...labelProps}>{label}</StepLabel>
//                       </Step>
//                     );
//                   })}
//                 </Stepper>
//                 <React.Fragment>
//                   <Typography sx={{ mt: 2, mb: 1 }}>
//                     Step {activeStep + 1}
//                   </Typography>
//                   {renderStepContent(activeStep)}
//                   <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
//                     <Button
//                       color="inherit"
//                       disabled={activeStep === 0}
//                       onClick={handleBack}
//                       sx={{ mr: 1 }}
//                     >
//                       Back
//                     </Button>
//                     <Box sx={{ flex: "1 1 auto" }} />
//                     {activeStep === steps.length - 1 ? (
//                       <Button onClick={handleProductSubmit}>Submit</Button>
//                     ) : (
//                       <Button onClick={handleNext}>Next</Button>
//                     )}
//                   </Box>
//                 </React.Fragment>
//               </Box>
//             </div>
//           </Typography>
//         </Box>
//       </Modal>
//     </div>
//   );
// }

// ?????????????????????????????????????????????????????????????????????????
// export default Products;
import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductItem from "./ProductItem";
// import AddProductModal from "./AddProductModal";
import AddProductModal from "../AddProductModal/AddProductModal";
import { FaPlus } from "react-icons/fa";
import "./Products.css";

function Products() {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "",
    mainproduct: "",
    categoryext: "",
    brand: "",
    rating: "",
    price: "",
    description: "",
    image: null,
  });

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAdd = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setNewProduct({
      name: "",
      price: "",
      description: "",
      category: "",
      mainproduct: "",
      categoryext: "",
      brand: "",
      rating: "",
      image: null,
    });
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      image: file,
    }));
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();

    try {
      // const formData = new FormData();
      // formData.append("name", newProduct.name);
      // formData.append("price", newProduct.price);
      // formData.append("description", newProduct.description);
      // formData.append("image", newProduct.image);

      const formData = new FormData();
      formData.append("name", newProduct.name);
      formData.append("category", newProduct.category);
      formData.append("mainproduct", newProduct.mainproduct);
      formData.append("categoryext", newProduct.categoryext);
      formData.append("brand", newProduct.brand);
      formData.append("rating", newProduct.rating);
      formData.append("price", newProduct.price);
      formData.append("description", newProduct.description);
      formData.append("image", newProduct.image);

      await axios.post("http://localhost:5000/api/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      handleClose();
      fetchProducts(); // Fetch the updated list of products after successful addition
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const handleProductDelete = async (productId) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${productId}`);
      fetchProducts(); // Fetch the updated list of products after successful deletion
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const updateProductList = () => {
    fetchProducts();
  };

  return (
    <div style={{ width: "30rem" }}>
      {/* <button onClick={handleAdd}>Add New</button>*/}
      <button
        style={{
          marginTop: "15px",
          marginLeft: "930px",
          marginBottom: "-25px",
        }}
        className="glow-on-hover"
        type="button"
        onClick={handleAdd}
      >
        <FaPlus style={{ marginBottom: "4px" }} /> Add Product
      </button>
      <h3>All Products</h3>
      {products.map((product) => (
        <ProductItem
          key={product._id}
          product={product}
          onDelete={handleProductDelete}
          onUpdateProduct={updateProductList}
        />
      ))}

      <AddProductModal
        showModal={showModal}
        handleClose={handleClose}
        handleInputChange={handleInputChange}
        handleImageChange={handleImageChange}
        handleProductSubmit={handleProductSubmit}
        newProduct={newProduct}
      />
    </div>
  );
}

export default Products;
