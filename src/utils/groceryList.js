/**
 * Calculates the grocery list based on the given list of days, diets, and meals.
 * @param {Array} listOfDays - The list of days.
 * @param {Array} diets - The list of diets.
 * @param {Array} meals - The list of meals.
 * @returns {Object} - The calculated grocery list.
 */
export function groceryList(listOfDays, diets, meals) {
  /**
   * Callback function used to sum up the grocery list.
   * @param {Object} acc - The accumulator object.
   * @param {Object} day - The current day object.
   * @returns {Object} - The updated accumulator object.
   */
  function sumUpGroceryListCB(acc, day) {
    const diet = diets.find((diet) => diet.dietId === day.dietId);
    const mealIds = diet.listOfMeals;
    mealIds.forEach((mealId) => {
      const meal = meals.find((meal) => meal.mealId === mealId);
      meal.listOfFoods.forEach((food) => {
        if (acc[food.aliment.food_id]) {
          acc[food.aliment.food_id].quantity += food.quantity;
        } else {
          acc[food.aliment.food_id] = { ...food };
        }
      });
    });
    return acc;
  }

  return listOfDays.reduce(sumUpGroceryListCB, {});
}
