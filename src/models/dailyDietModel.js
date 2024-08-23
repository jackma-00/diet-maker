import { v4 as uuidv4 } from "uuid";
import { googleDailyImg } from "../utils/imageSource";

const dailyDietModel = {
  userId: null,
  currentDiet: null,
  diets: [],

  /**
   * Sets the current diet.
   * @param {string} diet - The diet to set.
   *
   * To be invoked when a diet is selected from the list of diets.
   */
  setCurrentDiet(diet) {
    this.currentDiet = diet;
  },

  /**
   * Creates a new diet.
   */
  createNewDiet(name) {
    const newDiet = {
      dietName: name,
      dietId: uuidv4(),
      listOfMeals: [],
    };
    return newDiet;
  },

  /**
   * Adds a meal to the current diet.
   * @param {String} mealId - The id of the meal to add.
   */
  addToDiet(mealId) {
    this.currentDiet.listOfMeals = [...this.currentDiet.listOfMeals, mealId];
    const index = this.diets.findIndex(
      (diet) => diet.dietId === this.currentDiet.dietId
    );
    if (index !== -1) {
      this.diets[index] = this.currentDiet;
    }
  },

  /**
   * Removes a meal from the current diet based on the given index.
   * @param {number} index - The index of the meal to be removed.
   * @returns {void}
   */
  removeFromDiet(index) {
    if (this.currentDiet) {
      this.currentDiet.listOfMeals = this.currentDiet.listOfMeals.filter(
        (meal, i) => i !== index
      );

      const dietIndex = this.diets.findIndex(
        (diet) => diet.dietId === this.currentDiet.dietId
      );
      if (dietIndex !== -1) {
        this.diets[dietIndex] = this.currentDiet;
      }
    }
  },

  /**
   * Deletes a meal from the diets.
   * @param {string} mealId - The ID of the meal to be deleted.
   */
  deleteMealFromDiets(mealId) {
    if (this.currentDiet) {
      this.currentDiet.listOfMeals = this.currentDiet.listOfMeals.filter(
        (meal) => meal !== mealId
      );

      this.diets.forEach((diet) => {
        if (diet.listOfMeals.includes(mealId)) {
          diet.listOfMeals = diet.listOfMeals.filter((meal) => meal !== mealId);
        }
      });
    }
  },

  /**
   * Sets the name of the diet.
   * @param {string} name - The name of the diet.
   */
  setDietName(name) {
    this.currentDiet.dietName = name;
  },

  /**
   * Adds the current diet to the list of diets.
   */
  addDiet(dietToAdd) {
    googleDailyImg(dietToAdd.dietName).then((dailyImg) => {
      dietToAdd.img = dailyImg;
      this.diets = [...this.diets, dietToAdd];
      this.currentDiet = dietToAdd;
    });
  },

  /**
   * Removes a diet from the list of diets.
   * @param {Object} dietToRemove - The diet object to remove.
   */
  removeDiet(dietToRemove) {
    this.diets = this.diets.filter(
      (diet) => diet.dietId !== dietToRemove.dietId
    );
    if (this.diets.length > 0) {
      this.currentDiet = this.diets[0];
    } else {
      this.currentDiet = null;
    }
  },
};

export { dailyDietModel };
