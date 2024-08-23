import { observer } from "mobx-react-lite";
import * as React from "react";
import StatsView from "../views/statsView";

const Stats = observer(function StatsRender(data) {
  const currentWeekDays = data.model.weekly.currentWeek?.listOfDays.map(
    (day) => day.dietId
  );
  const mealsInOverview = data.model.daily.diets
    ?.filter((diet) => currentWeekDays?.includes(diet.dietId))
    .flatMap((diet) => diet.listOfMeals);

  function calculateMealMacros(mealData) {
    let nutrients = {
      vitamin_a: 0,
      vitamin_c: 0,
      protein: 0,
      potassium: 0,
      iron: 0,
      fiber: 0,
      fat: 0,
      calcium: 0,
      carbohydrate: 0,
      cholesterol: 0,
    };

    for (const meal of mealData.meals) {
      if (mealsInOverview?.includes(meal.mealId)) {
        for (const item of meal.listOfFoods) {
          const servings = item.aliment.servings.serving;
          for (const serving of servings) {
            if (
              serving.measurement_description === "g" &&
              serving.metric_serving_amount === "100.000"
            ) {
              for (const nutrient in nutrients) {
                nutrients[nutrient] += parseFloat(
                  (serving[nutrient] / 100) * item.quantity
                );
              }
            }
          }
        }
      }
    }

    const data = [];
    let counter = 0;
    for (const nutrient in nutrients) {
      let value;
      value = nutrients[nutrient];
      data.push({
        id: counter,
        value: value,
        label: nutrient,
      });
      counter++;
    }

    return data;
  }
  const pieData = calculateMealMacros(data.model.meal);

  return <StatsView pieData={pieData} data={data} />;
});

export { Stats };
