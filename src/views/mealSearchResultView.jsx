import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

export default function MealSearchResultView({
  model,
  removeFoodFromMeal,
  changeFoodQuantity,
}) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow key="start">
            <TableCell>Food name</TableCell>
            <TableCell align="right">Description</TableCell>
            <TableCell align="right">Quantity&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{model.listOfFoods?.map(foodTableRow)}</TableBody>
      </Table>
    </TableContainer>
  );

  function foodTableRow(food) {
    function onRemoveFoodACB() {
      removeFoodFromMeal(food);
    }

    function onUpdateFoodACB(newFoodQuantity) {
      if (!Number(newFoodQuantity) || Number(newFoodQuantity) <= 0) {
        window.alert(
          `${newFoodQuantity} is not a number, or the number is negative! Please enter only digits (positive number)`
        );
      } else {
        changeFoodQuantity(food.aliment.food_id, Number(newFoodQuantity));
      }
    }
    return (
      <TableRow
        key={food?.aliment?.food_id}
        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
      >
        <TableCell>{food?.aliment?.food_name}</TableCell>
        <TableCell align="right">{food?.description}</TableCell>
        <TableCell align="right">
          <TextField
            value={food?.quantity}
            onChange={(e) => onUpdateFoodACB(e.target.value)}
            style={{ width: 100 }}
            label="g"
            type="number"
            min={"0"}
          />
        </TableCell>
        <TableCell align="right">
          <Button
            variant="outlined"
            style={{ color: "red", borderColor: "red" }}
            onClick={onRemoveFoodACB}
          >
            Remove
          </Button>
        </TableCell>
      </TableRow>
    );
  }
}
