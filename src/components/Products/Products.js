// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import ProductItem from "./ProductItem";
// // import AddProductModal from "./AddProductModal";
// import AddProductModal from "../AddProductModal/AddProductModal";
// import { FaPlus } from "react-icons/fa";
// import "./Products.css";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import Select from "@mui/material/Select";
// import MenuItem from "@mui/material/MenuItem";

// import FormControl from "@mui/material/FormControl";
// import InputLabel from "@mui/material/InputLabel";

// function Products() {
//   const [products, setProducts] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [filterCategory, setFilterCategory] = useState("");

//   const [foodType, setFoodType] = useState("");
//   const [accessoriesType, setAccessoriesType] = useState("");

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

//   const handleAdd = () => {
//     setShowModal(true);
//   };

//   const handleClose = () => {
//     setShowModal(false);
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
//     setFilterCategory("");
//     setFoodType("");
//     setAccessoriesType("");
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
//     if (
//       !newProduct.name ||
//       !newProduct.category ||
//       !newProduct.mainproduct ||
//       // !newProduct.categoryext ||
//       !newProduct.brand ||
//       // !newProduct.rating ||
//       !newProduct.price ||
//       !newProduct.description ||
//       !newProduct.image
//     ) {
//       toast.error("Please fill in all the required fields");
//       return;
//     }

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
//       toast.success("Product Added");
//     } catch (error) {
//       console.error("Error adding product:", error);
//     }
//   };

//   const handleProductDelete = async (productId) => {
//     try {
//       await axios.delete(`http://localhost:5000/api/products/${productId}`);
//       fetchProducts(); // Fetch the updated list of products after successful deletion
//     } catch (error) {
//       console.error("Error deleting product:", error);
//     }
//   };

//   const updateProductList = () => {
//     fetchProducts();
//   };
//   // const filteredProducts = filterCategory
//   //   ? foodType
//   //     ? accessoriesType
//   //       ? products.filter(
//   //           (product) =>
//   //             product.mainproduct === filterCategory &&
//   //             product.category === foodType &&
//   //             product.categoryext === accessoriesType
//   //         )
//   //       : products.filter(
//   //           (product) =>
//   //             product.mainproduct === filterCategory &&
//   //             product.category === foodType &&
//   //             !product.categoryext
//   //         )
//   //     : products.filter((product) => product.mainproduct === filterCategory)
//   //   : products;

//   const filteredProducts = filterCategory
//     ? foodType
//       ? products.filter(
//           (product) =>
//             product.mainproduct === filterCategory &&
//             product.category === foodType &&
//             product.categoryext === accessoriesType
//         )
//       : products.filter((product) => product.mainproduct === filterCategory)
//     : products;

//   return (
//     <div style={{ width: "30rem" }}>
//       <ToastContainer />

//       <FormControl style={{ marginTop: "20px", marginLeft: "30px" }}>
//         <InputLabel id="main-product-label">Category</InputLabel>
//         <Select
//           style={{ width: "140px", height: "60px" }}
//           labelId="main-product-label"
//           id="main-product-select"
//           name="mainproduct"
//           value={filterCategory}
//           onChange={(e) => setFilterCategory(e.target.value)}
//           label="Product"
//         >
//           <MenuItem value="">
//             <em>None</em>
//           </MenuItem>
//           <MenuItem value="Food">Food</MenuItem>
//           <MenuItem value="Accessories">Accessories</MenuItem>
//         </Select>
//       </FormControl>
//       {filterCategory === "Food" && (
//         <FormControl style={{ marginTop: "20px", marginLeft: "30px" }}>
//           <InputLabel id="food-type-label">Food Type</InputLabel>
//           <Select
//             style={{ width: "140px", height: "60px" }}
//             labelId="food-type-label"
//             id="food-type-select"
//             name="foodType"
//             value={foodType}
//             onChange={(e) => setFoodType(e.target.value)}
//             label="Food Type"
//           >
//             <MenuItem value="">
//               <em>None</em>
//             </MenuItem>
//             <MenuItem value="Dog Food">Dog Food</MenuItem>
//             <MenuItem value="Cat Food">Cat Food</MenuItem>
//             <MenuItem value="Rat Food">Rat Food</MenuItem>
//             <MenuItem value="Snake Food">Snake Food</MenuItem>
//             <MenuItem value="Rabbit Food">Rabbit Food</MenuItem>
//             <MenuItem value="Others Food">Others Food</MenuItem>
//           </Select>
//         </FormControl>
//       )}

//       {filterCategory === "Accessories" && (
//         <FormControl style={{ marginTop: "20px", marginLeft: "30px" }}>
//           <InputLabel id="accessories-type-label">Accessories Type</InputLabel>
//           <Select
//             style={{ width: "140px", height: "60px" }}
//             labelId="accessories-type-label"
//             id="accessories-type-select"
//             name="accessoriesType"
//             value={accessoriesType}
//             onChange={(e) => setAccessoriesType(e.target.value)}
//             label="Accessories Type"
//           >
//             <MenuItem value="">
//               <em>None</em>
//             </MenuItem>
//             <MenuItem value="Belts">Belts</MenuItem>
//             <MenuItem value="Beds">Beds</MenuItem>
//             <MenuItem value="Shampoos">Shampoos</MenuItem>
//             <MenuItem value="Toys">Toys</MenuItem>
//             <MenuItem value="Bowls">Bowls</MenuItem>
//             <MenuItem value="Clothes">Clothes</MenuItem>
//             <MenuItem value="Carriers">Carriers</MenuItem>
//             <MenuItem value="Collars">Collars</MenuItem>
//             <MenuItem value="Leashes">Leashes</MenuItem>
//             <MenuItem value="Grooming">Grooming Supplies</MenuItem>
//             <MenuItem value="Travel">Travel Accessories</MenuItem>
//             <MenuItem value="Others">others</MenuItem>
//           </Select>
//         </FormControl>
//       )}

//       <button
//         style={{
//           marginTop: "15px",
//           marginLeft: "930px",
//           marginBottom: "-25px",
//         }}
//         className="glow-on-hover"
//         type="button"
//         onClick={handleAdd}
//       >
//         <FaPlus style={{ marginBottom: "4px" }} /> Add Product
//       </button>
//       <h3>All Products</h3>
//       {filteredProducts.map((product) => (
//         <ProductItem
//           key={product._id}
//           product={product}
//           onDelete={handleProductDelete}
//           onUpdateProduct={updateProductList}
//         />
//       ))}
//       {/* {products.map((product) => (
//         <ProductItem
//           key={product._id}
//           product={product}
//           onDelete={handleProductDelete}
//           onUpdateProduct={updateProductList}
//         />
//       ))} */}

//       <AddProductModal
//         showModal={showModal}
//         handleClose={handleClose}
//         handleInputChange={handleInputChange}
//         handleImageChange={handleImageChange}
//         handleProductSubmit={handleProductSubmit}
//         newProduct={newProduct}
//       />
//     </div>
//   );
// }

// export default Products;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductItem from './ProductItem';
import AddProductModal from '../AddProductModal/AddProductModal';
import { FaPlus } from 'react-icons/fa';
import './Products.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

function Products() {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [filterCategory, setFilterCategory] = useState('');
  const [foodType, setFoodType] = useState('');
  const [accessoriesType, setAccessoriesType] = useState('');

  const [newProduct, setNewProduct] = useState({
    name: '',
    category: '',
    mainproduct: '',
    categoryext: 'Pets Food',
    brand: '',
    rating: '',
    price: '',
    description: '',
    image: null,
  });

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/products`
      );
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
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
      name: '',
      price: '',
      description: '',
      category: '',
      mainproduct: '',
      categoryext: '',
      brand: '',
      rating: '',
      image: null,
    });
    setFilterCategory('');
    setFoodType('');
    setAccessoriesType('');
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
    if (
      !newProduct.name ||
      !newProduct.category ||
      !newProduct.mainproduct ||
      !newProduct.brand ||
      !newProduct.price ||
      !newProduct.description ||
      !newProduct.image
    ) {
      toast.error('Please fill in all the required fields');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('name', newProduct.name);
      formData.append('category', newProduct.category);
      formData.append('mainproduct', newProduct.mainproduct);
      formData.append('categoryext', newProduct.categoryext);
      formData.append('brand', newProduct.brand);
      formData.append('rating', newProduct.rating);
      formData.append('price', newProduct.price);
      formData.append('description', newProduct.description);
      formData.append('image', newProduct.image);

      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/products`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      handleClose();
      fetchProducts();
      toast.success('Product Added');
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const handleProductDelete = async (productId) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/products/${productId}`
      );
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const updateProductList = () => {
    fetchProducts();
  };

  const filteredProducts = products.filter((product) => {
    if (filterCategory && product.mainproduct !== filterCategory) {
      return false;
    }
    if (foodType && product.category !== foodType) {
      return false;
    }
    if (accessoriesType && product.categoryext !== accessoriesType) {
      return false;
    }

    return true;
  });

  return (
    <div style={{ width: '30rem' }}>
      <ToastContainer />
      <FormControl style={{ marginTop: '20px', marginLeft: '30px' }}>
        <InputLabel id="main-product-label">Category</InputLabel>
        <Select
          style={{ width: '140px', height: '60px' }}
          labelId="main-product-label"
          id="main-product-select"
          name="mainproduct"
          value={filterCategory}
          onChange={(e) => {
            const value = e.target.value;
            if (value === '') {
              setFilterCategory('');
              setFoodType('');
              setAccessoriesType('');
            } else {
              setFilterCategory(value);
            }
          }}
          label="Product"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="Food">Food</MenuItem>
          <MenuItem value="Accessories">Accessories</MenuItem>
        </Select>
      </FormControl>

      {filterCategory === 'Food' && (
        <FormControl style={{ marginTop: '20px', marginLeft: '30px' }}>
          <InputLabel id="food-type-label">Food Type</InputLabel>
          <Select
            style={{ width: '140px', height: '60px' }}
            labelId="food-type-label"
            id="food-type-select"
            name="foodType"
            value={foodType}
            onChange={(e) => setFoodType(e.target.value)}
            label="Food Type"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="Dog Food">Dog Food</MenuItem>
            <MenuItem value="Cat Food">Cat Food</MenuItem>
            <MenuItem value="Rat Food">Rat Food</MenuItem>
            <MenuItem value="Snake Food">Snake Food</MenuItem>
            <MenuItem value="Rabbit Food">Rabbit Food</MenuItem>
            <MenuItem value="Others Food">Others Food</MenuItem>
          </Select>
        </FormControl>
      )}

      {filterCategory === 'Accessories' && (
        <FormControl style={{ marginTop: '20px', marginLeft: '30px' }}>
          <InputLabel id="accessories-type-label">Accessories Type</InputLabel>
          <Select
            style={{ width: '140px', height: '60px' }}
            labelId="accessories-type-label"
            id="accessories-type-select"
            name="accessoriesType"
            value={accessoriesType}
            onChange={(e) => setAccessoriesType(e.target.value)}
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
            <MenuItem value="Grooming">Grooming Supplies</MenuItem>
            <MenuItem value="Travel">Travel Accessories</MenuItem>
            <MenuItem value="Others">others</MenuItem>
          </Select>
        </FormControl>
      )}

      <button
        style={{
          marginTop: '15px',
          marginLeft: '930px',
          marginBottom: '-25px',
        }}
        className="glow-on-hover"
        type="button"
        onClick={handleAdd}
      >
        <FaPlus style={{ marginBottom: '4px' }} /> Add Product
      </button>

      {filteredProducts.map((product) => (
        <ProductItem
          key={product._id}
          product={product}
          onDelete={handleProductDelete}
          onUpdate={updateProductList}
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
