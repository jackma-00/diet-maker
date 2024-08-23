import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../config/firebaseConfig.js";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { getDatabase, ref, get, set, onValue } from "firebase/database";

import { getFoodById } from "../utils/foodSource.js";

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
export const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();

const PATH = "users";

/**
 * Retrieves the value from a Firebase snapshot.
 *
 * @param {firebase.database.DataSnapshot} snapshot - The Firebase snapshot.
 * @returns {*} The value from the snapshot.
 */
function getSnapshotValue(snapshot) {
  return snapshot.val();
}

/**
 * Converts a food object to a persistence object.
 * @param {Object} food - The food object to be converted.
 * @returns {Object} - The persistence object.
 */
function foodToPersistenceCB(food) {
  return {
    aliment: food.aliment,
    quantity: food.quantity,
    description: food.description,
    img: food.img || null,
  };
}

/**
 * Converts a meal model to its persistence representation.
 *
 * @param {Object} mealModel - The meal model to convert.
 * @returns {Object} The persistence representation of the meal model.
 */
export function mealModelToPersistence(mealModel) {
  return {
    currentMeal: {
      mealName: mealModel.currentMeal?.mealName || null,
      mealId: mealModel.currentMeal?.mealId || null,
      listOfFoods:
        mealModel.currentMeal?.listOfFoods?.map(foodToPersistenceCB) || [],
      img: mealModel.currentMeal?.img || null,
    },
    meals: mealModel.meals.map((meal) => ({
      mealName: meal.mealName,
      mealId: meal.mealId,
      listOfFoods: meal?.listOfFoods?.map(foodToPersistenceCB) || [],
      img: meal.img || null,
    })),
  };
}

/**
 * Converts a daily diet model to its persistence representation.
 * @param {Object} dailyDietModel - The daily diet model to convert.
 * @returns {Object} The persistence representation of the daily diet model.
 */
export function dailyDietModelToPersistence(dailyDietModel) {
  return {
    currentDiet: {
      dietName: dailyDietModel.currentDiet?.dietName || null,
      dietId: dailyDietModel.currentDiet?.dietId || null,
      listOfMeals: dailyDietModel.currentDiet?.listOfMeals || [],
      img: dailyDietModel.currentDiet?.img || null,
    },
    diets: dailyDietModel.diets.map((diet) => ({
      dietName: diet.dietName,
      dietId: diet.dietId,
      listOfMeals: diet?.listOfMeals || [],
      img: diet.img || null,
    })),
  };
}

/**
 * Converts a weekly diet model to its persistence representation.
 * @param {Object} weeklyDietModel - The weekly diet model to convert.
 * @returns {Object} - The persistence representation of the weekly diet model.
 */
export function weeklyDietModelToPersistence(weeklyDietModel) {
  return {
    currentWeek: {
      weekNumber: weeklyDietModel.currentWeek?.weekNumber || null,
      weekId: weeklyDietModel.currentWeek?.weekId || null,
      listOfDays: weeklyDietModel.currentWeek?.listOfDays || [],
    },
    weeks: weeklyDietModel.weeks.map((week) => ({
      weekNumber: week.weekNumber,
      weekId: week.weekId,
      listOfDays: week?.listOfDays || [],
    })),
  };
}

/**
 * Converts the persisted data to the meal model.
 * @param {Object} data - The persisted data.
 * @param {Object} mealModel - The meal model object.
 */
async function persistenceToMealModel(data, mealModel) {
  function loadFoodToMealModelCB(food) {
    return {
      aliment: food.aliment,
      quantity: food.quantity,
      description: food.description,
      img: food.img || null,
    };
  }

  function loadMealToMealModelCB(meal) {
    return {
      mealName: meal.mealName,
      mealId: meal.mealId,
      listOfFoods: meal.listOfFoods?.map(loadFoodToMealModelCB) || [],
      img: meal.img || null,
    };
  }

  if (data) {
    if (data.currentMeal) {
      mealModel.currentMeal = loadMealToMealModelCB(data.currentMeal);
    }

    mealModel.meals = data.meals?.map(loadMealToMealModelCB) || [];
  }
}

function persistenceToDailyDietModel(data, dailyDietModel) {
  function loadDietToDailyDietModelCB(diet) {
    return {
      dietName: diet.dietName,
      dietId: diet.dietId,
      listOfMeals: diet?.listOfMeals || [],
      img: diet.img || null,
    };
  }
  if (data) {
    dailyDietModel.currentDiet = {
      dietName: data.currentDiet?.dietName || null,
      dietId: data.currentDiet?.dietId || null,
      listOfMeals: data.currentDiet?.listOfMeals || [],
      img: data.currentDiet?.img || null,
    };
    dailyDietModel.diets = data.diets?.map(loadDietToDailyDietModelCB) || [];
  }
}

function persistenceToWeeklyDietModel(data, weeklyDietModel) {
  function loadWeekToWeeklyDietModelCB(week) {
    return {
      weekNumber: week.weekNumber,
      weekId: week.weekId,
      listOfDays: week?.listOfDays || [],
    };
  }
  if (data) {
    weeklyDietModel.currentWeek = {
      weekNumber: data.currentWeek?.weekNumber || null,
      weekId: data.currentWeek?.weekId || null,
      listOfDays: data.currentWeek?.listOfDays || [],
    };
    weeklyDietModel.weeks = data.weeks?.map(loadWeekToWeeklyDietModelCB) || [];
  }
}

/**
 * Saves a meal model to persistence.
 *
 * @param {string} userId - The ID of the user.
 * @param {object} mealModel - The meal model to be saved.
 */
export function saveMealModelToPersistence(userId, mealModel) {
  if (mealModel.userId && mealModel.ready) {
    const userRef = ref(db, `${PATH}/${userId}/meals`);
    set(userRef, mealModelToPersistence(mealModel));
  }
}

/**
 * Saves a daily diet model to persistence.
 *
 * @param {string} userId - The ID of the user.
 * @param {object} dailyDietModel - The daily diet model to be saved.
 */
export function saveDailyDietModelToPersistence(userId, dailyDietModel) {
  if (dailyDietModel.userId && dailyDietModel.ready) {
    const userRef = ref(db, `${PATH}/${userId}/diets`);
    set(userRef, dailyDietModelToPersistence(dailyDietModel));
  }
}

/**
 * Saves a weekly diet model to persistence.
 *
 * @param {string} userId - The ID of the user.
 * @param {object} weeklyDietModel - The weekly diet model to be saved.
 */
export function saveWeeklyDietModelToPersistence(userId, weeklyDietModel) {
  if (weeklyDietModel.userId && weeklyDietModel.ready) {
    const userRef = ref(db, `${PATH}/${userId}/weeks`);
    set(userRef, weeklyDietModelToPersistence(weeklyDietModel));
  }
}

/**
 * Loads the meal model from the database persistence for a specific user.
 * @param {string} userId - The ID of the user.
 * @param {object} mealModel - The meal model object to be populated with data from the database.
 */
export function loadMealModelFromPersistence(userId, mealModel) {
  const userRef = ref(db, `${PATH}/${userId}/meals`);

  /**
   * Convert live updates from the database to the meal model.
   */
  onValue(userRef, (snapshot) => {
    if (mealModel.ready) {
      const data = snapshot.val();
      persistenceToMealModel(data, mealModel);
    }
  });

  /**
   * Convert the initial data from the database to the meal model.
   */
  if (mealModel.ready) {
    mealModel.ready = false;
    get(userRef).then((snapshot) => {
      const data = snapshot.val();
      persistenceToMealModel(data, mealModel);
      mealModel.ready = true;
    });
  }
}

/**
 * Loads the daily diet model from the database persistence for a specific user.
 * @param {string} userId - The ID of the user.
 * @param {object} dailyDietModel - The daily diet model object to be populated with data from the database.
 */
export function loadDailyDietModelFromPersistence(userId, dailyDietModel) {
  const userRef = ref(db, `${PATH}/${userId}/diets`);

  /**
   * Convert live updates from the database to the daily diet model.
   */
  onValue(userRef, (snapshot) => {
    if (dailyDietModel.ready) {
      const data = snapshot.val();
      persistenceToDailyDietModel(data, dailyDietModel);
    }
  });

  /**
   * Convert the initial data from the database to the daily diet model.
   */
  if (dailyDietModel.ready) {
    dailyDietModel.ready = false;
    get(userRef).then((snapshot) => {
      const data = snapshot.val();
      persistenceToDailyDietModel(data, dailyDietModel);
      dailyDietModel.ready = true;
    });
  }
}

/**
 * Loads the weekly diet model from the database persistence for a specific user.
 * @param {string} userId - The ID of the user.
 * @param {object} weeklyDietModel - The weekly diet model object to be populated with data from the database.
 */
function loadWeeklyDietModelFromPersistence(userId, weeklyDietModel) {
  const userRef = ref(db, `${PATH}/${userId}/weeks`);

  /**
   * Convert live updates from the database to the weekly diet model.
   */
  onValue(userRef, (snapshot) => {
    if (weeklyDietModel.ready) {
      const data = snapshot.val();
      persistenceToWeeklyDietModel(data, weeklyDietModel);
    }
  });

  /**
   * Convert the initial data from the database to the weekly diet model.
   */
  if (weeklyDietModel.ready) {
    weeklyDietModel.ready = false;
    get(userRef).then((snapshot) => {
      const data = snapshot.val();
      persistenceToWeeklyDietModel(data, weeklyDietModel);
      weeklyDietModel.ready = true;
    });
  }
}

/**
 * Sign in with Google.
 * @returns {Promise<void>} A promise that resolves when the sign-in process is complete.
 */
export async function signInWithGoogle() {
  return signInWithPopup(auth, googleProvider);
}

/**
 * Signs out the current user.
 * @returns {Promise<void>} A promise that resolves when the user is signed out.
 */
export function signOutUser() {
  return signOut(auth);
}

/**
 * Connects to the persistence layer and initializes the models.
 * @param {Object} mealModel - The meal model object.
 * @param {Object} dailyDietModel - The daily diet model object.
 * @param {Object} weeklyDietModel - The weekly diet model object.
 * @param {Function} watchFunction - The watch function to be called when models change.
 */
export function connectToPersistence(
  mealModel,
  dailyDietModel,
  weeklyDietModel,
  watchFunction
) {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      const userId = user.uid;
      mealModel.userId = userId;
      mealModel.ready = true;

      dailyDietModel.userId = userId;
      dailyDietModel.ready = true;

      weeklyDietModel.userId = userId;
      weeklyDietModel.ready = true;

      await mealModel.refreshAccessToken();
      loadMealModelFromPersistence(userId, mealModel);
      loadDailyDietModelFromPersistence(userId, dailyDietModel);
      loadWeeklyDietModelFromPersistence(userId, weeklyDietModel);
      watchFunction(
        () => {
          return [
            mealModel.currentMeal,
            mealModel.currentMeal?.listOfFoods,
            mealModel.meals,
            dailyDietModel.currentDiet,
            dailyDietModel.currentDiet?.listOfMeals,
            dailyDietModel.diets,
            weeklyDietModel.currentWeek,
            weeklyDietModel.currentWeek?.listOfDays,
            weeklyDietModel.weeks,
          ];
        },
        () => {
          saveMealModelToPersistence(userId, mealModel);
          saveDailyDietModelToPersistence(userId, dailyDietModel);
          saveWeeklyDietModelToPersistence(userId, weeklyDietModel);
        }
      );
    } else {
    }
  });
}

export function getUser() {
  return auth.currentUser;
}
