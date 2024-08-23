import { observable, configure, reaction } from "mobx";
import { createRoot } from "react-dom/client";
import { createElement } from "react";

import { dailyDietModel } from "./models/dailyDietModel.js";
import { weeklyDietModel } from "./models/weeklyDietModel.js";
import { mealModel } from "./models/mealModel.js";
import { connectToPersistence } from "./persistence/firebasePersistence.js";
import { ReactRoot } from "./ReactRoot.jsx";

configure({ enforceActions: "never" });
const reactiveDailyDietModel = observable(dailyDietModel);
const reactiveWeeklyDietModel = observable(weeklyDietModel);
const reactiveMealModel = observable(mealModel);

const model = {
  meal: reactiveMealModel,
  daily: reactiveDailyDietModel,
  weekly: reactiveWeeklyDietModel,
};

connectToPersistence(
  reactiveMealModel,
  reactiveDailyDietModel,
  reactiveWeeklyDietModel,
  reaction
);

window.React = { createElement: createElement };
window.myModel = model;

createRoot(document.getElementById("root")).render(<ReactRoot model={model} />);
