import * as React from "react";
import {
  Box,
  Typography,
  TextField,
  Autocomplete,
  Stack,
  Button,
} from "@mui/material";

export default function FoodSearchView({
  data,
  searchFood,
  setSearchQuery,
  searchInputEmpty,
}) {
  function setSearchQueryACB(query) {
    setSearchQuery(query);
  }

  function searchInputHandlerACB() {
    searchFood();
  }

  return (
    <Box>
      <Typography style={{ marginBottom: "1%" }} variant="h4">
        Ingredients
      </Typography>
      <Box style={{ display: "flex" }}>
        <Stack spacing={5} sx={{ width: 300 }}>
          <Autocomplete
            freeSolo
            id="free-solo-2-demo"
            disableClearable
            options={data.map((meal) => meal.name)}
            onChange={(e, value) => {
              setSearchQueryACB(value);
            }}
            renderInput={(params) => (
              <TextField
                onChange={(e) => setSearchQueryACB(e.target.value)}
                {...params}
                label="Search food"
                InputProps={{
                  ...params.InputProps,
                  type: "search",
                }}
              />
            )}
          />
        </Stack>

        <Button
          variant="contained"
          disabled={!searchInputEmpty}
          onClick={searchInputHandlerACB}
          style={{ marginLeft: "10px" }}
        >
          Search
        </Button>
      </Box>
    </Box>
  );
}
