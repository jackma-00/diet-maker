import { observer } from "mobx-react-lite";
import { groceryList } from "../utils/groceryList";
import GroceryView from "../views/groceryView";

const GroceryListPresenter = observer(function GroceryPresenter(props) {
  function generateListACB(listOfDays, diets, meals) {
    const groceryListObj = groceryList(listOfDays, diets, meals);
    props.setGroceryListSize(Object.keys(groceryListObj).length);
    return groceryListObj;
  }

  return (
    <div style={{ display: "flex", flexDirection: "column " }}>
      {promiseNoData(props.model)}
    </div>
  );

  function promiseNoData(model) {
    if (!model.weekly.ready) {
      return <img src={"https://brfenergi.se/iprog/loading.gif"}></img>;
    } else if (model.weekly.ready && model.weekly.currentWeek) {
      return (
        <GroceryView
          groceryList={generateListACB(
            model.weekly.currentWeek.listOfDays,
            model.daily.diets,
            model.meal.meals
          )}
        />
      );
    } else if (
      model.weekly.ready &&
      ((!model.weekly.weeks.length && !model.weekly.currentWeek) ||
        !model.weekly.currentWeek.listOfDays)
    ) {
      return <div>No data to show</div>;
    }
  }
});

export { GroceryListPresenter };
