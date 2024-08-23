import { v4 as uuidv4 } from "uuid";

import { resolvePromise } from "../utils/resolvePromise.js";
import {
  fetchAccessToken,
  searchFood,
  getFoodById,
} from "../utils/foodSource.js";
import { googleFoodImg, googleMealImg } from "../utils/imageSource.js";

const mealModel = {
  userId: null,
  searchExpression: "",
  currentFoodId: null,
  currentMeal: null,
  meals: [],
  searchFoodResultsPromiseState: {},
  currentFoodPromiseState: {},
  accessToken: null,
  lastFetchTime: null,
  expiresIn: null,

  /**
   * Sets the search expression for the meal model.
   * @param {string} expression - The search expression to set.
   */
  setSearchExpression(expression) {
    this.searchExpression = expression;
  },

  /**
   * Searches for food items based on the search expression.
   * @param {Object} params - The parameters to use for the search.
   * @returns {Promise} - A promise that resolves with the search results.
   */
  async doSearch(params) {
    await this.refreshAccessToken();
    resolvePromise(
      searchFood(this.accessToken, params),
      this.searchFoodResultsPromiseState
    );
  },

  /**
   * Sets the current food ID.
   *
   * @param {string} foodId - The ID of the food to set as the current food.
   * @returns {Promise} - A promise that resolves with the details of the selected food.
   */
  getFoodDetails(foodId) {
    this.refreshAccessToken();
    return getFoodById(this.accessToken, foodId);
  },

  /**
   * Sets the current meal.
   * @param {Object} meal - The meal object to set as the current meal.
   *
   * To be invoked when a meal is selected from the list of meals.
   */
  setCurrentMeal(meal) {
    this.currentMeal = meal;
  },

  /**
   * Creates a new meal.
   */
  createNewMeal(name) {
    let newMeal = {
      mealName: name,
      mealId: uuidv4(),
      listOfFoods: [],
    };
    return newMeal;
  },

  /**
   * Adds a food item to the current meal.
   * @param {Object} foodToAdd - The food item to add.
   * @param {number} quantity - The quantity of the food item to add.
   */
  addToMeal(foodToAdd) {
    const existingFoodIndex = this.currentMeal.listOfFoods.findIndex(
      (food) => food.aliment.food_id === foodToAdd.food.food_id
    );
    if (existingFoodIndex !== -1) {
      this.currentMeal.listOfFoods[existingFoodIndex].quantity =
        foodToAdd.quantity;
    } else {
      googleFoodImg(foodToAdd.food.food_name).then((foodImg) => {
        let newFood = {
          aliment: foodToAdd.food,
          quantity: foodToAdd.quantity,
          description: foodToAdd.description,
          img: foodImg,
        };
        this.currentMeal.listOfFoods = [
          ...this.currentMeal.listOfFoods,
          newFood,
        ];
      });
    }
    const index = this.meals.findIndex(
      (meal) => meal.mealId === this.currentMeal.mealId
    );
    if (index !== -1) {
      this.meals[index] = this.currentMeal;
    }
  },

  /**
   * Removes a food item from the current meal.
   * @param {object} foodToRemove - The food item to remove.
   */
  removeFromMeal(foodToRemove) {
    this.currentMeal.listOfFoods = this.currentMeal.listOfFoods.filter(
      (food) => food.aliment.food_id !== foodToRemove.aliment.food_id
    );

    this.meals.find((meal) => {
      return meal.mealId === this.currentMeal.mealId;
    }).listOfFoods = this.currentMeal.listOfFoods.filter(
      (food) => food.aliment.food_id !== foodToRemove.aliment.food_id
    );
  },

  /**
   * Updates the quantity of a food item in the current meal.
   * @param {string} foodId - The ID of the food item to update.
   * @param {number} newQuantity - The new quantity of the food item.
   */
  updateFoodQuantity(foodId, newQuantity) {
    this.currentMeal.listOfFoods = this.currentMeal.listOfFoods.map((food) => {
      if (food.aliment.food_id === foodId) {
        food.quantity = newQuantity;
        return food;
      }
      return food;
    });

    this.meals.find((meal) => {
      return meal.mealId === this.currentMeal.mealId;
    }).listOfFoods = this.currentMeal.listOfFoods.map((food) => {
      if (food.aliment.food_id === foodId) {
        food.quantity = newQuantity;
        return food;
      }
      return food;
    });
  },

  /**
   * Sets the name of the meal.
   * @param {string} name - The name of the meal.
   */
  setMealName(name) {
    this.currentMeal.mealName = name;
  },

  /**
   * Adds the current meal to the list of meals.
   */
  addMeal(mealToAdd) {
    googleMealImg(mealToAdd.mealName).then((mealImg) => {
      mealToAdd.img = mealImg;
      this.meals = [...this.meals, mealToAdd];
      this.currentMeal = mealToAdd;
    });
  },

  /**
   * Removes a meal from the list of meals.
   * @param {Object} mealToRemove - The meal to remove.
   */
  removeMeal(mealToRemove) {
    this.meals = this.meals.filter(
      (meal) => meal.mealId !== mealToRemove.mealId
    );
  },

  /**
   * Fetches the access token if it is not available or has expired.
   */
  async refreshAccessToken() {
    if (!this.accessToken || Date.now() - this.lastFetchTime > this.expiresIn) {
      const tokenResponse = await fetchAccessToken();
      this.accessToken = tokenResponse.access_token;
      this.expiresIn = tokenResponse.expires_in;
      this.lastFetchTime = Date.now();
    }
  },
};

export { mealModel };
