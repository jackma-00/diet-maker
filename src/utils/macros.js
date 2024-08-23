/**
 * Calculates the total macronutrient values for a given list of foods.
 * @param {Array} foods - The list of foods to calculate the macronutrient values for.
 * @returns {Object} - An object containing the total macronutrient values (calories, protein, carbohydrate, fat).
 */
export function calculateTotalMealMacros(foods) {
  /**
   * Callback function to filter servings and keep only the ones with serving_description "100 g".
   * @param {Object} serving - The serving object to check.
   * @returns {boolean} - True if the serving_description is "100 g", false otherwise.
   */
  function keep100gServingCB(serving) {
    return serving.serving_description === "100 g";
  }

  /**
   * Callback function to sum up the macronutrient values for each food.
   * @param {Object} acc - The accumulator object to store the total macronutrient values.
   * @param {Object} food - The food object to calculate the macronutrient values for.
   * @returns {Object} - The updated accumulator object with the added macronutrient values.
   */
  function sumUpMacrosCB(acc, food) {
    const serving = food.aliment.servings.serving.filter(keep100gServingCB)[0];
    if (!serving) {
      console.log("No 100g serving found for food:", food);
      return acc;
    }
    acc.calories += (serving.calories * food.quantity) / 100;
    acc.protein += (serving.protein * food.quantity) / 100;
    acc.carbohydrate += (serving.carbohydrate * food.quantity) / 100;
    acc.fat += (serving.fat * food.quantity) / 100;
    return acc;
  }

  return foods.reduce(sumUpMacrosCB, {
    calories: 0,
    protein: 0,
    carbohydrate: 0,
    fat: 0,
  });
}

/**
 * Calculates the total macronutrient values for a given list of meal IDs.
 * @param {Array} mealIds - An array of meal IDs.
 * @param {Array} meals - An array of meal objects.
 * @returns {Object} - The total macronutrient values (calories, protein, carbohydrate, fat).
 */
export function calculateTotalDietMacros(mealIds, meals) {
  /**
   * Callback function to sum up the macronutrient values for each meal.
   * @param {Object} acc - The accumulator object to store the total macronutrient values.
   * @param {string} mealId - The ID of the meal to calculate the macronutrient values for.
   * @returns {Object} - The updated accumulator object with the added macronutrient values.
   */
  function sumUpMacrosCB(acc, mealId) {
    const meal = meals.find((meal) => meal.mealId === mealId);
    const mealMacros = calculateTotalMealMacros(meal.listOfFoods);
    acc.calories += mealMacros.calories;
    acc.protein += mealMacros.protein;
    acc.carbohydrate += mealMacros.carbohydrate;
    acc.fat += mealMacros.fat;
    return acc;
  }

  return mealIds.reduce(sumUpMacrosCB, {
    calories: 0,
    protein: 0,
    carbohydrate: 0,
    fat: 0,
  });
}

/**
 * Calculates the total macronutrient values for a given week.
 * @param {Object} weekObj - The object representing the week's diet plan.
 * @param {Array} diets - The array of available diets.
 * @param {Array} meals - The array of available meals.
 * @returns {Object} - The object containing the total macronutrient values for the week.
 */
export default function calculateTotalWeekMacros(weekObj, diets, meals) {
  /**
   * Callback function to sum up the macronutrient values for each diet.
   * @param {Object} acc - The accumulator object to store the total macronutrient values.
   * @param {string} dietId - The ID of the diet to calculate the macronutrient values for.
   * @returns {Object} - The updated accumulator object with the added macronutrient values.
   */
  function sumUpMacrosCB(acc, day) {
    const diet = diets.find((diet) => diet.dietId === day.dietId);
    const dietMacros = calculateTotalDietMacros(diet.listOfMeals, meals);
    acc.calories += dietMacros.calories;
    acc.protein += dietMacros.protein;
    acc.carbohydrate += dietMacros.carbohydrate;
    acc.fat += dietMacros.fat;
    return acc;
  }

  return weekObj.reduce(sumUpMacrosCB, {
    calories: 0,
    protein: 0,
    carbohydrate: 0,
    fat: 0,
  });
}
