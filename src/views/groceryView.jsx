import React from "react";
import { Box, Typography } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function GroceryView({ groceryList }) {
  return (
    <Box style={{ marginTop: "5%" }}>
      <Typography variant="h3">Grocery List</Typography>
      <Typography variant="h6">
        This is what you need to buy for the current week
      </Typography>
      <Box display="flex" flexWrap="wrap">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow key="start">
                <TableCell>Food name</TableCell>
                <TableCell align="right">Quantity&nbsp;(g)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.keys(groceryList).map((food, index) => (
                <TableRow key={index}>
                  <TableCell>{groceryList[food].aliment.food_name}</TableCell>
                  <TableCell align="right">
                    {groceryList[food].quantity}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}
