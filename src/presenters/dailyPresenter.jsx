import { observer } from "mobx-react-lite";
import DailyView from "../views/dailyView";
import MacrosView from "../views/macrosView";
import CreateDailyView from "../views/createDailyView";
import { calculateTotalDietMacros } from "../utils/macros";
import { groceryList } from "../utils/groceryList";

const Daily = observer(function DailyRender(props) {
  if (!props.model.daily.currentDiet) {
    return <CreateDailyView onSave={saveDietACB} />;
  }

  if (!props.model.daily.ready) {
    return <img src={"https://brfenergi.se/iprog/loading.gif"}></img>;
  } else {
    updateGroceriesList();
  }

  function onRemoveDayACB() {
    props.model.weekly.removeFromWeek(props.model.daily.currentDiet.dietId);
    props.model.daily.removeDiet(props.model.daily.currentDiet);
    updateGroceriesList();
  }

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <DailyView
        days={props.model.daily.diets}
        onSetCurrent={setCurrentDietACB}
        dayName={props.model.daily.currentDiet?.dietName}
        dayId={props.model.daily.currentDiet?.dietId}
        listOfMeals={props.model.daily.currentDiet?.listOfMeals.map(
          getNameOfMealsCB
        )}
        meals={props.model.meal.meals}
        onAddMeal={addMealACB}
        onRemoveMeal={removeMealACB}
        onSaveNew={saveDietACB}
        onCardClick={setCurrentMealACB}
        onRemoveDay={onRemoveDayACB}
      />
      <MacrosView
        text="day"
        macros={calculateTotalDietMacros(
          props.model.daily.currentDiet.listOfMeals,
          props.model.meal.meals
        )}
      />
    </div>
  );
  /**
   * Retrieves the name of a meal based on its ID.
   *
   * @param {number} mealId - The ID of the meal.
   * @returns {Array} An array containing the meal ID and its name.
   */
  function getNameOfMealsCB(mealId) {
    const meal = props.model.meal.meals.find((meal) => meal.mealId === mealId);
    return [mealId, meal?.mealName, meal?.img];
  }
  /**
   * Adds a meal to the diet.
   * @param {string} mealId - The ID of the meal to be added.
   */
  function addMealACB(mealId) {
    props.model.daily.addToDiet(mealId);

    updateGroceriesList();
  }
  /**
   * Removes a meal from the diet.
   * @param {string} mealId - The ID of the meal to be removed.
   */
  function removeMealACB(index) {
    props.model.daily.removeFromDiet(index);
  }
  /**
   * Creates a new diet.
   */
  function createNewDietACB() {
    props.model.daily.createNewDiet();
  }
  /**
   * Saves the diet with the given name.
   *
   * @param {string} name - The name of the diet to be saved.
   */
  function saveDietACB(name) {
    let newDiet = props.model.daily.createNewDiet(name);
    props.model.daily.addDiet(newDiet);
  }
  /**
   * Sets the current meal based on the provided meal ID.
   *
   * @param {string} mealId - The ID of the meal to set as the current meal.
   */
  function setCurrentMealACB(mealId) {
    const meal = props.model.meal.meals.find((meal) => meal.mealId === mealId);
    props.model.meal.setCurrentMeal(meal);
  }
  /**
   * Sets the current diet for the presenter.
   *
   * @param {string} diet - The diet to set.
   */
  function setCurrentDietACB(diet) {
    props.model.daily.setCurrentDiet(diet);
  }

  function updateGroceriesList() {
    if (props.model.weekly.currentWeek) {
      const groceryListObj = groceryList(
        props.model.weekly.currentWeek.listOfDays,
        props.model.daily.diets,
        props.model.meal.meals
      );
      props.setGroceryListSize(Object.keys(groceryListObj).length);
    }
  }
});

export { Daily };
