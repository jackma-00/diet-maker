import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TextField, Button, Box } from "@mui/material";
import { useState } from "react";

export default function ({ searchResults, addFood }) {
  return (
    <Box>
      {searchResults.foods.food?.length ? (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Food</TableCell>
                <TableCell align="right">Description</TableCell>
                <TableCell align="right">Quantity</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{searchResults.foods.food.map(tableRow)}</TableBody>
          </Table>
        </TableContainer>
      ) : (
        <p>No results found, try searching for something else!</p>
      )}
    </Box>
  );

  function tableRow(fd) {
    const [foodQuantity, setFoodQuantity] = useState("");

    function onAddFoodACB(food) {
      if (!Number(foodQuantity) || Number(foodQuantity) <= 0) {
        window.alert(
          `${foodQuantity} is not a number, or the number is negative! Please enter only digits (positive number)`
        );
      } else {
        addFood({ food: food, quantity: Number(foodQuantity) });
      }
      setFoodQuantity("");
    }

    return (
      <TableRow
        key={fd.food_id}
        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
      >
        <TableCell component="th" scope="row">
          {fd.food_name}
        </TableCell>
        <TableCell align="right">{fd.food_description}</TableCell>
        <TableCell>
          <TextField
            value={foodQuantity}
            onChange={(e) => setFoodQuantity(e.target.value)}
            style={{ width: 100 }}
            label="g"
          />
        </TableCell>
        <TableCell>
          <Button
            disabled={!foodQuantity}
            variant="contained"
            onClick={() => onAddFoodACB(fd)}
          >
            Add
          </Button>
        </TableCell>
      </TableRow>
    );
  }
}
