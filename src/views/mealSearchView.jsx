import * as React from "react";
import {
  Box,
  Typography,
  TextField,
  Stack,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useState } from "react";

export default function MealSearchView({
  model,
  createNewMealActive,
  setCreateNewMealActive,
  setMealName,
  selectedMealById,
  removeMeal,
}) {
  const [searchInput, setSearchInput] = useState("");
  const [mealSelected, setMealSelected] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  function onSwitchingMealSearchView(status) {
    setCreateNewMealActive(status);
    setMealSelected("");
  }

  function createMealHandlerACB(evt) {
    const checkMeal = model.meals.find((meal) => {
      return meal.mealName.toLowerCase() === searchInput.toLowerCase();
    });
    if (checkMeal) {
      return alert(
        "An existing meal has already this name, please choose another name"
      );
    } else {
      setMealName(searchInput);
    }
  }

  function getMealByIdACB(evt) {
    setMealSelected(evt.target.value);
    selectedMealById(evt.target.value);
  }

  function removeMealACB() {
    removeMeal();
    setMealSelected("");
  }

  return (
    <Box>
      <Typography variant="h4">Meals</Typography>
      <Box style={{ marginBottom: "1%" }}>
        <Button
          disabled={!createNewMealActive}
          variant="contained"
          onClick={() => {
            onSwitchingMealSearchView(!createNewMealActive);
          }}
          style={{
            marginRight: "0.5rem",
          }}
        >
          Select existing meal
        </Button>
        <Button
          variant="outlined"
          onClick={removeMealACB}
          style={{
            marginRight: "0.5rem",
            display: createNewMealActive || !model.currentMeal ? "none" : "",
            color: "red",
            borderColor: "red",
          }}
          startIcon={<DeleteOutlineIcon />}
        >
          Delete the meal
        </Button>
        <Button
          disabled={createNewMealActive}
          variant="contained"
          onClick={() => {
            onSwitchingMealSearchView(!createNewMealActive);
          }}
        >
          Create new meal
        </Button>
      </Box>

      <Box style={{ display: "flex" }}>
        {createNewMealActive ? createNewMeal() : selectMeal()}
      </Box>
    </Box>
  );

  function selectMeal() {
    return (
      <Box style={{ display: "flex", flexDirection: "row" }}>
        <FormControl sx={{ m: 1, minWidth: 150, marginRight: "10px" }}>
          <InputLabel id="demo-simple-select-helper-label">
            {model.currentMeal ? model.currentMeal.mealName : "No meals yet"}
          </InputLabel>
          {model.meals.length > 0 && (
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={mealSelected}
              label="Select"
              onChange={getMealByIdACB}
            >
              {model.meals
                .filter((meal) =>
                  searchTerm
                    ? meal.mealName
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase())
                    : true
                )
                .map((meal) => {
                  return (
                    <MenuItem key={meal.mealId} value={meal.mealId}>
                      {meal.mealName}
                    </MenuItem>
                  );
                })}
            </Select>
          )}
        </FormControl>
        {model.meals.length > 0 && (
          <TextField
            style={{ alignSelf: "center" }}
            placeholder="Search meals"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        )}

        {searchTerm &&
          model.meals.filter((meal) =>
            meal.mealName.toLowerCase().includes(searchTerm.toLowerCase())
          ).length === 0 && (
            <Typography
              style={{ alignSelf: "center", marginLeft: "10px" }}
              variant="body2"
              color="error"
            >
              No meals that include {searchTerm}
            </Typography>
          )}
      </Box>
    );
  }

  function createNewMeal() {
    return (
      <>
        <Stack spacing={5} sx={{ width: 300 }}>
          <TextField
            onChange={(e) => setSearchInput(e.target.value)}
            label="Enter meal name"
          />
        </Stack>

        <Button
          disabled={!searchInput}
          variant="contained"
          value={searchInput}
          onClick={createMealHandlerACB}
        >
          Save
        </Button>
      </>
    );
  }
}
