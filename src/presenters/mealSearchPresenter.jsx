import MealSearchView from "../views/mealSearchView";
import MealSearchResultView from "../views/mealSearchResultView";
import { observer } from "mobx-react-lite";

export const MealSearch = observer(function MealSearchRender({
  model,
  removeFoodFromMeal,
  createNewMealActive,
  setCreateNewMealActive,
  removeMeal,
}) {
  function createNewMealViewActiveACB(status) {
    if (status) {
    }
    setCreateNewMealActive(status);
  }

  function createMealACB(mealName) {
    let newMeal = model.createNewMeal(mealName);
    model.addMeal(newMeal);
    setCreateNewMealActive(false);
  }

  function onSelectedMealIdACB(mealId) {
    if (!mealId) {
      return;
    }
    model.setCurrentMeal(model.meals.find((meal) => meal.mealId === mealId));
  }

  function removeFoodACB(food) {
    removeFoodFromMeal(food);
  }

  function updateFoodQuantityACB(foodId, newQuantity) {
    model.updateFoodQuantity(foodId, newQuantity);
  }

  function onRemoveMealACB() {
    removeMeal();
  }

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <MealSearchView
        model={model}
        createNewMealActive={createNewMealActive}
        setCreateNewMealActive={createNewMealViewActiveACB}
        setMealName={createMealACB}
        selectedMealById={onSelectedMealIdACB}
        removeMeal={onRemoveMealACB}
      />
      {promiseNoData(model.currentMeal) || (
        <MealSearchResultView
          model={model.currentMeal}
          removeFoodFromMeal={removeFoodACB}
          changeFoodQuantity={updateFoodQuantityACB}
        />
      )}
    </div>
  );

  function promiseNoData(currentMeal) {
    if (createNewMealActive || !currentMeal) {
      return <p></p>;
    } else if (!currentMeal?.listOfFoods.length) {
      return <p>No food added yet! Search and add food from below</p>;
    } else if (currentMeal.error) {
      return <div>{currentMeal.error}</div>;
    } else {
      return false;
    }
  }
});
