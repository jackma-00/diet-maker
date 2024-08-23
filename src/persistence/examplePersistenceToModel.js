/**
 * Converts the persisted data to the meal model.
 * @param {Object} data - The persisted data.
 * @param {Object} mealModel - The meal model object.
 */
async function persistenceToMealModel(data, mealModel) {
  async function loadFoodToMealModelCB(food) {
    function persistedFoodToMealModelACB(aliment) {
      return {
        aliment: aliment,
        quantity: food.quantity,
      };
    }
    await mealModel.refreshAccessToken();
    return getFoodById(mealModel.accessToken, food.id).then(
      persistedFoodToMealModelACB
    );
  }

  async function loadMealToMealModelCB(meal) {
    const foodPromises = meal.listOfFoods?.map(loadFoodToMealModelCB) || [];
    await Promise.all(meal.listOfFoods).then((foods) => {
      foodPromises = foods;
    });
    return {
      mealName: meal.mealName,
      mealId: meal.mealId,
      listOfFoods: foodPromises,
    };
  }

  if (data) {
    mealModel.currentMeal = {
      mealName: data.currentMeal?.mealName || null,
      mealId: data.currentMeal?.mealId || null,
      listOfFoods:
        data.currentMeal?.listOfFoods.map(loadFoodToMealModelCB) || [],
    };
    await Promise.all(mealModel.currentMeal.listOfFoods).then((foods) => {
      mealModel.currentMeal.listOfFoods = foods;
    });
    mealModel.meals = data.meals?.map(loadMealToMealModelCB) || [];
  }
}
