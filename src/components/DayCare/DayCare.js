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
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

export default function DayCare() {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState("pending");

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/buyandsell");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleApprove = async (productId) => {
    try {
      await axios.put(`http://localhost:5000/api/buyandsell/${productId}`, {
        status: "approved",
      });
      fetchProducts();
    } catch (error) {
      console.error("Error updating product status:", error);
    }
  };

  const handleReject = async (productId) => {
    try {
      await axios.put(`http://localhost:5000/api/buyandsell/${productId}`, {
        status: "rejected",
      });
      fetchProducts();
    } catch (error) {
      console.error("Error updating product status:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const filteredProducts = products.filter(
    (product) => product.status === filter
  );

  return (
    <>
      <Select
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        style={{ marginBottom: "20px" }}
      >
        <MenuItem value="pending">Pending Requests</MenuItem>
        <MenuItem value="rejected">Rejected Requests</MenuItem>
        <MenuItem value="approved">Approved Requests</MenuItem>
      </Select>

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
              <TableCell>picture</TableCell>
              <TableCell>title</TableCell>
              <TableCell align="right">Pet</TableCell>
              <TableCell align="right">Breed</TableCell>
              <TableCell align="right">city</TableCell>
              <TableCell align="right">Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredProducts.map((product, index) => (
              <TableRow key={index}>
                <TableCell align="left">
                  {product.images && product.images.length > 0 && (
                    <img
                      style={{ height: "80px", width: "80px" }}
                      src={`http://localhost:5000/${product.images[0]}`}
                      alt={product.title}
                    />
                  )}
                </TableCell>
                <TableCell component="th" scope="row">
                  {product.title}
                </TableCell>
                <TableCell align="right">{product.pet}</TableCell>
                <TableCell align="right">{product.breed}</TableCell>
                <TableCell align="right">{product.city}</TableCell>
                <TableCell align="right">{product.price}</TableCell>
                <TableCell align="right">
                  {!product.status === "approved" && (
                    <Chip
                      label="Approve"
                      variant="outlined"
                      onClick={() => handleApprove(product._id)}
                      style={{ backgroundColor: "#63F263" }}
                    />
                  )}
                  {product.status === "pending" && (
                    <Chip
                      label="Approve"
                      variant="outlined"
                      onClick={() => handleApprove(product._id)}
                      style={{ backgroundColor: "#63F263" }}
                    />
                  )}
                  {product.status === "rejected" && (
                    <Chip
                      label="Approve"
                      variant="outlined"
                      onClick={() => handleApprove(product._id)}
                      style={{ backgroundColor: "#63F263" }}
                    />
                  )}
                </TableCell>
                <TableCell align="left">
                  {!product.status === "rejected" && (
                    <Chip
                      label="Reject"
                      variant="outlined"
                      onClick={() => handleReject(product._id)}
                      style={{ backgroundColor: "#FC4E40" }}
                    />
                  )}
                  {product.status === "pending" && (
                    <Chip
                      label="Reject"
                      variant="outlined"
                      onClick={() => handleReject(product._id)}
                      style={{ backgroundColor: "#FC4E40" }}
                    />
                  )}
                  {product.status === "approved" && (
                    <Chip
                      label="Reject"
                      variant="outlined"
                      onClick={() => handleReject(product._id)}
                      style={{ backgroundColor: "#FC4E40" }}
                    />
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );

  // return (
  //   <>
  //     <Select
  //       value={filter}
  //       onChange={(e) => setFilter(e.target.value)}
  //       style={{ marginBottom: "20px" }}
  //     >
  //       <MenuItem value="pending">Pending Requests</MenuItem>
  //       <MenuItem value="rejected">Rejected Requests</MenuItem>
  //       <MenuItem value="approved">Approved Requests</MenuItem>
  //     </Select>

  //     <TableContainer
  //       component={Paper}
  //       style={{ width: "95%", marginLeft: "20px", marginTop: "50px" }}
  //     >
  //       <Table
  //         sx={{
  //           marginLeft: "30px",
  //           minWidth: 400,
  //           width: "1020px",
  //         }}
  //         size="small"
  //         aria-label="a dense table"
  //       >
  //         <TableHead>
  //           <TableRow>
  //             <TableCell>picture</TableCell>
  //             <TableCell>title</TableCell>
  //             <TableCell align="right">Pet</TableCell>
  //             <TableCell align="right">Breed</TableCell>
  //             <TableCell align="right">city</TableCell>
  //             <TableCell align="right">Price</TableCell>
  //           </TableRow>
  //         </TableHead>
  //         <TableBody>
  //           {filteredProducts.map((product, index) => (
  //             <TableRow key={index}>
  //               <TableCell align="left">
  //                 {product.images && product.images.length > 0 && (
  //                   <img
  //                     style={{ height: "80px", width: "80px" }}
  //                     src={`http://localhost:5000/${product.images[0]}`}
  //                     alt={product.title}
  //                   />
  //                 )}
  //               </TableCell>
  //               <TableCell component="th" scope="row">
  //                 {product.title}
  //               </TableCell>
  //               <TableCell align="right">{product.pet}</TableCell>
  //               <TableCell align="right">{product.breed}</TableCell>
  //               <TableCell align="right">{product.city}</TableCell>
  //               <TableCell align="right">{product.price}</TableCell>
  //               <TableCell align="right">
  //                 <Chip
  //                   label="Approve"
  //                   variant="outlined"
  //                   onClick={() => handleApprove(product._id)}
  //                   style={{ backgroundColor: "#63F263" }}
  //                 />
  //               </TableCell>
  //               <TableCell align="left">
  //                 <Chip
  //                   label="Reject"
  //                   variant="outlined"
  //                   onClick={() => handleReject(product._id)}
  //                   style={{ backgroundColor: "#FC4E40" }}
  //                 />
  //               </TableCell>
  //             </TableRow>
  //           ))}
  //         </TableBody>
  //       </Table>
  //     </TableContainer>
  //   </>
  // );
}
