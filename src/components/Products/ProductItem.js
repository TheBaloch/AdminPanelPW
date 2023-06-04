import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Divider from "@mui/joy/Divider";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import DeleteForever from "@mui/icons-material/DeleteForever";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
import Typography from "@mui/joy/Typography";
import EditProductModal from "../EditProductModal/EditProductModal";
import React, { useState } from "react";
import "./ProductItem.css";

function ProductItem({ product, onDelete, onUpdateProduct }) {
  const imgURL = `http://localhost:5000/${product.image}`;

  const [open, setOpen] = React.useState(false);
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
                  <td className="value">catogery</td>

                  <td className="value">
                    <Button
                      variant="soft"
                      endDecorator={<KeyboardArrowRight />}
                      color="success"
                      onClick={handleEdit}
                    >
                      Edit
                    </Button>
                  </td>
                  <td className="value">
                    <Button
                      variant="outlined"
                      color="danger"
                      endDecorator={<DeleteForever />}
                      onClick={() => setOpen(true)}
                    >
                      Delete
                    </Button>
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

      <React.Fragment>
        <Modal open={open} onClose={() => setOpen(false)}>
          <ModalDialog
            variant="outlined"
            role="alertdialog"
            aria-labelledby="alert-dialog-modal-title"
            aria-describedby="alert-dialog-modal-description"
          >
            <Typography
              id="alert-dialog-modal-title"
              component="h2"
              startDecorator={<WarningRoundedIcon />}
            >
              Confirmation
            </Typography>
            <Divider />
            <Typography
              id="alert-dialog-modal-description"
              textColor="text.tertiary"
            >
              Are you sure you want to Delete Product?
            </Typography>
            <Box
              sx={{
                display: "flex",
                gap: 1,
                justifyContent: "flex-end",
                pt: 2,
              }}
            >
              <Button
                variant="plain"
                color="neutral"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant="solid"
                color="danger"
                onClick={() => {
                  handleDelete();
                  setOpen(false);
                }}
              >
                Delete
              </Button>
            </Box>
          </ModalDialog>
        </Modal>
      </React.Fragment>
    </>
  );
}

export default ProductItem;
