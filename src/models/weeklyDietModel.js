import { v4 as uuidv4 } from "uuid";

const weekDays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const weeklyDietModel = {
  userId: null,
  currentWeek: null,
  weeks: [],

  /**
   * Sets the current week.
   * @param {string} week - The week to set.
   *
   * To be invoked when a week is selected from the list of weeks.
   */
  setCurrentWeek(week) {
    this.weeks = this.weeks.map((week) => {
      if (week.weekId === this.currentWeek.weekId) {
        return this.currentWeek;
      }
      return week;
    });
    this.currentWeek = week;
  },

  /**
   * Creates a new week.
   */
  createNewWeek() {
    const newWeek = {
      weekNumber: this.weeks.length + 1,
      weekId: uuidv4(),
      listOfDays: [],
    };
    return newWeek;
  },

  /**
   * Adds a diet to a specific day of the week.
   * @param {string} weekDay - The day of the week to add the diet to.
   * @param {string} dietId - The id of the diet to add.
   */
  addToWeek(weekDay, dietId) {
    let dayToAdd = {
      day: weekDay,
      dietId: dietId,
    };
    this.currentWeek.listOfDays = [...this.currentWeek.listOfDays, dayToAdd];
  },

  /**
   * Removes a diet from a specific day of the week.
   * @param {string} day - The day of the week to remove the diet from.
   */
  removeFromWeek(dietIdToRemove) {
    if (this.currentWeek) {
      this.currentWeek.listOfDays = this.currentWeek.listOfDays.filter(
        (diet) => diet.dietId !== dietIdToRemove
      );
      this.currentWeek.listOfDays.forEach((diet, index) => {
        diet.day = weekDays[index];
      });
    }

    this.weeks.forEach((week) => {
      week.listOfDays.forEach((diet) => {
        if (diet.dietId === dietIdToRemove) {
          week.listOfDays = week.listOfDays.filter(
            (diet) => diet.dietId !== dietIdToRemove
          );
        }
      });
      week.listOfDays.forEach((diet, index) => {
        diet.day = weekDays[index];
      });
    });
  },

  /**
   * Sets the week number.
   * @param {string} number - The number of the week.
   */
  setWeekNumber(number) {
    this.currentWeek.weekNumber = number;
  },

  /**
   * Adds the current week to the list of weeks.
   */
  addWeek(weekToAdd) {
    this.weeks = [...this.weeks, weekToAdd];
  },

  /**
   * Removes a week from the list of weeks.
   * @param {} weekToRemove - The week to remove.
   */
  removeWeek(weekToRemoveId) {
    this.weeks = this.weeks.filter((week) => week.weekId !== weekToRemoveId);
    this.currentWeek = this.weeks[this.weeks.length - 1];
  },
};

export { weeklyDietModel };
