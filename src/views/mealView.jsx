import React from "react";
import {
  Box,
  Typography,
  CardActionArea,
  Card,
  CardMedia,
  CardContent,
  Pagination,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RandomFood from "../randomFood.jpeg";
import { useLinkClickHandler } from "react-router-dom";

export default function MealView({
  meals,
  onSetCurrent,
  mealName,
  mealId,
  listOfFoods,
}) {
  const handlePaginationChange = (event, value) => {
    onSetCurrent(meals[value - 1]);
  };

  const handleLinkClick = useLinkClickHandler("/search");

  return (
    <Box style={{ width: "100%" }}>
      <Typography variant="h6">Your current meal:</Typography>
      <Typography variant="h4">
        {mealName ? `${mealName}` : "No meal name has been set"}
      </Typography>
      <Pagination
        count={Math.ceil(meals.length)}
        variant="outlined"
        style={{ marginLeft: "auto" }}
        page={meals.findIndex((meal) => meal.mealId === mealId) + 1}
        onChange={handlePaginationChange}
      />
      <Box display="flex" flexWrap="wrap">
        {listOfFoods.map((meal, index) => (
          <Card key={index} className="styledCard">
            <CardActionArea onClick={handleLinkClick}>
              <CardMedia
                component="img"
                height="140"
                src={meal.img ? meal.img : RandomFood}
                alt="green iguana"
              />
              <CardContent>
                <Typography
                  gutterBottom
                  component="div"
                  style={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    fontWeight: "bold",
                  }}
                  title={meal.foodName}
                >
                  {meal.foodName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {meal.quantity} grams
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
        <Card
          className="styledCard"
          key={listOfFoods.length}
          onClick={useLinkClickHandler("/search")}
        >
          <CardActionArea style={{ height: "100%", textAlign: "center" }}>
            <AddIcon fontSize="large" />
            <Typography gutterBottom component="div">
              Add new food to this meal
            </Typography>
          </CardActionArea>
        </Card>
      </Box>
    </Box>
  );
}
