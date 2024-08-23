import { observer } from "mobx-react-lite";
import { FoodSearch } from "./foodSearchPresenter";
import { MealSearch } from "./mealSearchPresenter";
import { useState } from "react";
import { groceryList } from "../utils/groceryList";

export const SearchPresenter = observer(function SearchPresenter({
  model,
  setGroceryListSize,
}) {
  const [createNewMealActive, setCreateNewMealActive] = useState(
    !model.meal.currentMeal
  );

  function activateCreateNewMealViewACB(status) {
    setCreateNewMealActive(status);
  }

  function addFoodToMealACB(foodObj) {
    model.meal.getFoodDetails(foodObj.food.food_id).then((apiFood) => {
      model.meal.addToMeal({
        food: apiFood,
        quantity: foodObj.quantity,
        description: foodObj.food.food_description,
      });

      updateGroceriesCard();
    });
  }

  function removeFoodFromMealACB(food) {
    model.meal.removeFromMeal(food);

    updateGroceriesCard();
  }

  function onRemoveMealACB() {
    const length = model.meal.meals.length;
    model.daily.deleteMealFromDiets(model.meal.currentMeal.mealId);
    model.meal.removeMeal(model.meal.currentMeal);
    if (length > 1) {
      model.meal.setCurrentMeal(model.meal.meals[0]);
    } else {
      model.meal.setCurrentMeal(null);
    }
    updateGroceriesCard();
  }

  if (model.meal.currentMeal) {
    updateGroceriesCard();
  }

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <MealSearch
        model={model.meal}
        createNewMealActive={createNewMealActive}
        setCreateNewMealActive={activateCreateNewMealViewACB}
        removeFoodFromMeal={removeFoodFromMealACB}
        removeMeal={onRemoveMealACB}
      />

      <hr />
      <hr />

      {model.meal?.currentMeal && !createNewMealActive ? (
        <FoodSearch model={model} addFood={addFoodToMealACB} />
      ) : (
        <div></div>
      )}
    </div>
  );

  function updateGroceriesCard() {
    if (model.weekly.currentWeek) {
      const groceryListObj = groceryList(
        model.weekly.currentWeek?.listOfDays,
        model.daily.diets,
        model.meal.meals
      );
      setGroceryListSize(Object.keys(groceryListObj).length);
    }
  }
});
