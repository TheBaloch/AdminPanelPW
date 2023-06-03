// import React, { useState } from "react";
// import Form from "react-bootstrap/Form";
// import "./ProductItem.css";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { Transition } from "react-transition-group";
// import Box from "@mui/joy/Box";
// import Button from "@mui/joy/Button";
// import Divider from "@mui/joy/Divider";
// import Modal from "@mui/joy/Modal";
// import ModalDialog from "@mui/joy/ModalDialog";
// import DeleteForever from "@mui/icons-material/DeleteForever";
// import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
// import Typography from "@mui/joy/Typography";

// function ProductItem({ product, onDelete, onUpdateProduct }) {
//   const imgURL = `http://localhost:5000/${product.image}`;

//   const [showModal, setShowModal] = useState(false);
//   const [open, setOpen] = React.useState(false);
//   const [isOpen, setIsOpen] = React.useState(false);
//   const [editedProduct, setEditedProduct] = useState({
//     name: product.name,
//     price: product.price,
//     description: product.description,
//     image: null,
//   });

//   const handleEdit = () => {
//     setIsOpen(true);
//   };

//   const handleClose = () => {
//     setShowModal(false);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setEditedProduct((prevProduct) => ({
//       ...prevProduct,
//       [name]: value,
//     }));
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     setEditedProduct((prevProduct) => ({
//       ...prevProduct,
//       image: file,
//     }));
//   };

//   const handleProductEdit = async () => {
//     const formData = new FormData();
//     formData.append("name", editedProduct.name);
//     formData.append("price", editedProduct.price);
//     formData.append("description", editedProduct.description);
//     formData.append("image", editedProduct.image);

//     try {
//       const response = await fetch(
//         `http://localhost:5000/api/products/${product._id}`,
//         {
//           method: "PUT",
//           body: formData,
//         }
//       );

//       if (response.ok) {
//         console.log("Product updated successfully");
//         handleClosee();
//         onUpdateProduct();
//       } else {
//         console.error("Error updating product:", response.statusText);
//       }
//     } catch (error) {
//       console.error("Error updating product:", error);
//     }
//   };
//   const handleClosee = () => {
//     setIsOpen(false);
//   };
//   const handleDelete = () => {
//     onDelete(product._id);
//   };

//   return (
//     <div>
//       <ToastContainer />

//       <div style={{ width: "90%" }}>
//         <article className="profile-section">
//           <section className="profile-info">
//             <table className="profile-table">
//               <tbody>
//                 <tr className="table-row">
//                   <td className="label">
//                     <img
//                       src={imgURL}
//                       alt={product.name}
//                       style={{ height: "70px", width: "70px" }}
//                     />
//                     {product.name}
//                   </td>
//                   <td className="value">
//                     <button onClick={handleEdit}>Edit</button>
//                   </td>
//                   <td className="value">
//                     <Button
//                       variant="outlined"
//                       color="danger"
//                       endDecorator={<DeleteForever />}
//                       onClick={() => setOpen(true)}
//                     >
//                       Discard
//                     </Button>
//                   </td>
//                 </tr>
//               </tbody>
//             </table>
//           </section>
//         </article>
//       </div>

//       <Modal show={showModal} onHide={handleClose}>
//         <Modal.Header closeButton>
//           <Modal.Title>Edit Product</Modal.Title>
//         </Modal.Header>
//         <Modal.Body></Modal.Body>
//         <Modal.Footer></Modal.Footer>
//       </Modal>

//       <React.Fragment>
//         <Modal open={open} onClose={() => setOpen(false)}>
//           <ModalDialog
//             variant="outlined"
//             role="alertdialog"
//             aria-labelledby="alert-dialog-modal-title"
//             aria-describedby="alert-dialog-modal-description"
//           >
//             <Typography
//               id="alert-dialog-modal-title"
//               component="h2"
//               startDecorator={<WarningRoundedIcon />}
//             >
//               Confirmation
//             </Typography>
//             <Divider />
//             <Typography
//               id="alert-dialog-modal-description"
//               textColor="text.tertiary"
//             >
//               Are you sure you want to Delete Product
//             </Typography>
//             <Box
//               sx={{
//                 display: "flex",
//                 gap: 1,
//                 justifyContent: "flex-end",
//                 pt: 2,
//               }}
//             >
//               <Button
//                 variant="plain"
//                 color="neutral"
//                 onClick={() => setOpen(false)}
//               >
//                 Cancel
//               </Button>
//               <Button
//                 variant="solid"
//                 color="danger"
//                 onClick={() => {
//                   handleDelete();
//                   setOpen(false);
//                 }}
//               >
//                 Delete
//               </Button>
//             </Box>
//           </ModalDialog>
//         </Modal>
//       </React.Fragment>

//       <React.Fragment>
//         <Transition in={isOpen} timeout={400}>
//           {(state) => (
//             <Modal
//               keepMounted
//               open={!["exited", "exiting"].includes(state)}
//               onClose={handleClosee}
//               slotProps={{
//                 backdrop: {
//                   sx: {
//                     opacity: 0,
//                     backdropFilter: "none",
//                     transition: `opacity 400ms, backdrop-filter 400ms`,
//                     ...{
//                       entering: { opacity: 1, backdropFilter: "blur(8px)" },
//                       entered: { opacity: 1, backdropFilter: "blur(8px)" },
//                     }[state],
//                   },
//                 },
//               }}
//               sx={{
//                 visibility: state === "exited" ? "hidden" : "visible",
//               }}
//             >
//               <ModalDialog
//                 aria-labelledby="fade-modal-dialog-title"
//                 aria-describedby="fade-modal-dialog-description"
//                 sx={{
//                   opacity: 0,
//                   transition: `opacity 300ms`,
//                   ...{
//                     entering: { opacity: 1 },
//                     entered: { opacity: 1 },
//                   }[state],
//                 }}
//               >
//                 <Typography id="fade-modal-dialog-title" component="h2">
//                   Transition modal
//                 </Typography>
//                 <Typography
//                   id="fade-modal-dialog-description"
//                   textColor="text.tertiary"
//                 >
//                   <Form>
//                     <Form.Group controlId="formName">
//                       <Form.Label>Name</Form.Label>
//                       <Form.Control
//                         type="text"
//                         name="name"
//                         value={editedProduct.name}
//                         onChange={handleInputChange}
//                       />
//                     </Form.Group>
//                     <Form.Group controlId="formPrice">
//                       <Form.Label>Price</Form.Label>
//                       <Form.Control
//                         type="text"
//                         name="price"
//                         value={editedProduct.price}
//                         onChange={handleInputChange}
//                       />
//                     </Form.Group>
//                     <Form.Group controlId="formDescription">
//                       <Form.Label>Description</Form.Label>
//                       <Form.Control
//                         as="textarea"
//                         name="description"
//                         value={editedProduct.description}
//                         onChange={handleInputChange}
//                       />
//                     </Form.Group>
//                     <Form.Group controlId="formImage">
//                       <Form.Label>Current Image</Form.Label>
//                       <br />
//                       <img
//                         src={imgURL}
//                         alt={product.name}
//                         style={{
//                           height: "100px",
//                           width: "100px",
//                           marginBottom: "10px",
//                         }}
//                       />
//                       <Form.Label>Upload New Image</Form.Label>
//                       <Form.Control
//                         type="file"
//                         name="image"
//                         onChange={handleImageChange}
//                       />
//                     </Form.Group>
//                   </Form>
//                   <Button variant="secondary" onClick={handleClosee}>
//                     Cancel
//                   </Button>
//                   <Button variant="primary" onClick={handleProductEdit}>
//                     Save Changes
//                   </Button>
//                 </Typography>
//               </ModalDialog>
//             </Modal>
//           )}
//         </Transition>
//       </React.Fragment>
//     </div>
//   );
//   // now model for edit form
// }

// export default ProductItem;

import EditProductModal from "../EditProductModal/EditProductModal";
import React, { useState } from "react";
import "./ProductItem.css";

function ProductItem({ product, onDelete, onUpdateProduct }) {
  const imgURL = `http://localhost:5000/${product.image}`;
  const [showModal, setShowModal] = useState(false);

  const handleEdit = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const handleDelete = () => {
    onDelete(product._id);
  };

  return (
    <>
      <div style={{ display: "inline-flex" }}>
        <article className="profile-section">
          <section className="profile-info">
            <table className="profile-table">
              <tbody>
                <tr className="table-row">
                  <td className="label">
                    <img
                      src={imgURL}
                      alt={product.name}
                      style={{ height: "70px", width: "70px" }}
                    />
                    {product.name}
                  </td>
                  <td className="value">
                    <button onClick={handleEdit}>Edit</button>
                  </td>
                  <td className="value">
                    <button onClick={handleDelete}>Delete</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </section>
        </article>
      </div>
      {showModal && (
        <EditProductModal
          product={product}
          onUpdateProduct={onUpdateProduct}
          onHide={handleClose}
        />
      )}
    </>
  );
}

export default ProductItem;
