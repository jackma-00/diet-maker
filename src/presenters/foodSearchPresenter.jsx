import FoodSearchView from "../views/foodSearchView";
import FoodSearchResultView from "../views/foodSearchResultView";
import { observer } from "mobx-react-lite";

import { FoodObjects } from "../model/meals";

export const FoodSearch = observer(function FoodSearchRender({
  model,
  addFood,
}) {
  function setSearchQuery(searchQuery) {
    model.meal.setSearchExpression(searchQuery);
  }

  function searcFoodtACB() {
    model.meal.doSearch(model.meal.searchExpression);
  }

  function addFoodToMealACB(food) {
    addFood(food);
  }

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <FoodSearchView
        data={FoodObjects}
        searchFood={searcFoodtACB}
        setSearchQuery={setSearchQuery}
        searchInputEmpty={model.meal.searchExpression}
      />

      {searchResults(model.meal.searchFoodResultsPromiseState)}
    </div>
  );

  function searchResults(searchFoodResultsPromiseState) {
    return (
      promiseNoData(searchFoodResultsPromiseState) || (
        <FoodSearchResultView
          addFood={addFoodToMealACB}
          searchResults={searchFoodResultsPromiseState.data}
        />
      )
    );
  }

  function promiseNoData(promiseState) {
    if (!promiseState || !promiseState.promise) {
      return <div>Content will be displayed here</div>;
    } else if (
      promiseState.promise &&
      !promiseState.data &&
      !promiseState.error
    ) {
      return (
        <img
          src="https://brfenergi.se/iprog/loading.gif"
          width="100"
          alt="Loading"
        />
      );
    } else if (promiseState.error) {
      return <div>{promiseState.error}</div>;
    } else {
      return false;
    }
  }
});
