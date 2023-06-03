import axios from "axios";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import Chip from "@mui/material/Chip";

export default function DayCare() {
  const [products, setProducts] = useState([]);
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

  const handleClick_approval = () => {
    alert("You clicked the Chip.");
  };

  return (
    <TableContainer
      component={Paper}
      style={{ width: "95%", marginLeft: "20px", marginTop: "50px" }}
    >
      <Table
        sx={{
          marginLeft: "30px",
          minWidth: 400,
          width: "1020px",
        }}
        size="small"
        aria-label="a dense table"
      >
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Title</TableCell>
            <TableCell align="right">Category</TableCell>
            <TableCell align="right">Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product, index) => (
            <TableRow key={index}>
              <TableCell component="th" scope="row">
                {product.name}
              </TableCell>
              <TableCell align="right">{product.name}</TableCell>
              <TableCell align="right">{product.category}</TableCell>
              <TableCell align="right">{product.price}</TableCell>
              <TableCell align="right">
                <Chip
                  label="Approve"
                  variant="outlined"
                  onClick={handleClick_approval}
                  style={{ backgroundColor: "#63F263" }}
                />
              </TableCell>
              <TableCell align="left">
                <Chip
                  label="Reject"
                  variant="outlined"
                  onClick={handleClick_approval}
                  style={{ backgroundColor: "#FC4E40" }}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
