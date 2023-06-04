import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductItem from "./ProductItem";
// import AddProductModal from "./AddProductModal";
import AddProductModal from "../AddProductModal/AddProductModal";
import { FaPlus } from "react-icons/fa";
import "./Products.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
    if (
      !newProduct.name ||
      !newProduct.category ||
      !newProduct.mainproduct ||
      // !newProduct.categoryext ||
      !newProduct.brand ||
      // !newProduct.rating ||
      !newProduct.price ||
      !newProduct.description ||
      !newProduct.image
    ) {
      toast.error("Please fill in all the required fields");
      return;
    }

    try {
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
      fetchProducts();
      toast.success("Product Added");
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
      <ToastContainer />
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
