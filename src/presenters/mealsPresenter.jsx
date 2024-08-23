import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { Button, Typography, Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import MacrosView from "../views/macrosView";
import { calculateTotalMealMacros } from "../utils/macros";
import MealView from "../views/mealView";
import { groceryList } from "../utils/groceryList";

const Meals = observer(function MealsRender(props) {
  if (!props.model.meal.ready) {
    return <img src={"https://brfenergi.se/iprog/loading.gif"}></img>;
  }

  if (!props.model.meal.currentMeal) {
    return (
      <Box>
        <Typography variant="h4">
          {props.model.meal.meals.length === 0
            ? "You are about to create your first meal"
            : "No meal is selected"}
        </Typography>
        <Typography variant="body1">
          Click the button below to add/create your meal from 'search'
        </Typography>
        <Link style={{ height: "5%", margin: "5%" }} to="/search">
          <Button
            startIcon={<AddIcon />}
            style={{ height: "5%" }}
            variant="outlined"
          >
            Create your first meal
          </Button>
        </Link>
      </Box>
    );
  } else if (props.model.weekly.currentWeek) {
    const groceryListObj = groceryList(
      props.model.weekly.currentWeek.listOfDays,
      props.model.daily.diets,
      props.model.meal.meals
    );
    props.setGroceryListSize(Object.keys(groceryListObj).length);
  }
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <MealView
        meals={props.model.meal.meals}
        onSetCurrent={setCurrentMealACB}
        mealName={props.model.meal.currentMeal?.mealName}
        mealId={props.model.meal.currentMeal?.mealId}
        listOfFoods={props.model.meal.currentMeal?.listOfFoods.map(
          getNameOfFoodsCB
        )}
      />
      <MacrosView
        text="meal"
        macros={calculateTotalMealMacros(
          props.model.meal.currentMeal.listOfFoods
        )}
      />
    </div>
  );
  /**
   * Sets the current meal in the model.
   *
   * @param {Object} meal - The meal object to set as the current meal.
   */
  function setCurrentMealACB(meal) {
    props.model.meal.setCurrentMeal(meal);
  }
  /**
   * Returns an object containing the name of the food and its quantity.
   *
   * @param {object} food - The food object.
   * @returns {object} - An object with the food name and quantity.
   */
  function getNameOfFoodsCB(food) {
    const foodToReturn = {
      foodName: food?.aliment?.food_name,
      foodId: food?.aliment?.food_id,
      quantity: food?.quantity,
      img: food?.img,
    };
    return foodToReturn;
  }
});

export { Meals };
