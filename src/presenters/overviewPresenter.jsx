import { observer } from "mobx-react-lite";
import MacrosView from "../views/macrosView";
import OverviewView from "../views/overviewView";
import calculateTotalWeekMacros from "../utils/macros";
import { Button, Typography, Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { groceryList } from "../utils/groceryList";

const Overview = observer(function OverviewRender(props) {
  if (!props.model.weekly.ready) {
    return <img src={"https://brfenergi.se/iprog/loading.gif"}></img>;
  }

  if (!props.model.weekly.currentWeek) {
    return (
      <Box>
        <Typography variant="h4">
          You are about to create your first week
        </Typography>
        <Typography variant="body1">
          Click the button below to create a week
        </Typography>
        <Button
          startIcon={<AddIcon />}
          variant="outlined"
          size="medium"
          style={{ margin: "10px" }}
          onClick={createNewWeekACB}
        >
          Create your first week
        </Button>
      </Box>
    );
  } else if (props.model.meal.meals > 0) {
    const groceryListObj = groceryList(
      props.model.weekly.currentWeek.listOfDays,
      props.model.daily.diets,
      props.model.meal.meals
    );
    props.setGroceryListSize(Object.keys(groceryListObj).length);
  }
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <OverviewView
        weeks={props.model.weekly.weeks}
        onSetCurrent={setCurrentWeekACB}
        weekNumber={props.model.weekly.currentWeek?.weekNumber}
        weekId={props.model.weekly.currentWeek?.weekId}
        listOfDays={
          props.model.weekly.currentWeek
            ? props.model.weekly.currentWeek.listOfDays.map(getNameOfDietsCB)
            : []
        }
        diets={props.model.daily.diets}
        linkToNextView={"/daily"}
        onAddDiet={addDietACB}
        onCreateNew={createNewWeekACB}
        onCardClick={setCurrentDayACB}
        onRemoveWeek={removeWeekACB}
      />
      <MacrosView
        text="plan"
        macros={calculateTotalWeekMacros(
          props.model.weekly.currentWeek.listOfDays,
          props.model.daily.diets,
          props.model.meal.meals
        )}
      />
    </div>
  );
  /**
   * Retrieves the name of a diet based on the given day and diet ID.
   *
   * @param {Array} params - An array containing the day and diet ID.
   * @returns {Array} - An array containing the day, diet ID, and diet name.
   */
  function getNameOfDietsCB(day) {
    const diet = props.model.daily.diets.find(
      (diet) => diet.dietId === day.dietId
    );
    return [day.day, day.dietId, diet.dietName, diet.img];
  }
  /**
   * Adds a diet to the week.
   *
   * @param {string} day - The day of the week.
   * @param {string} dietId - The ID of the diet to add.
   */
  function addDietACB(day, dietId) {
    props.model.weekly.addToWeek(day, dietId);
  }
  /**
   * Creates a new week using the weekly model.
   */
  function createNewWeekACB() {
    const newWeek = props.model.weekly.createNewWeek();
    props.model.weekly.addWeek(newWeek);
    props.model.weekly.setCurrentWeek(newWeek);
  }
  /**
   * Sets the current day's diet based on the provided dietId.
   *
   * @param {string} dietId - The ID of the diet to set as the current diet.
   */
  function setCurrentDayACB(dietId) {
    const diet = props.model.daily.diets.find((diet) => diet.dietId === dietId);
    props.model.daily.setCurrentDiet(diet);
  }
  /**
   * Sets the current week for the model.
   *
   * @param {number} week - The week to set as the current week.
   */
  function setCurrentWeekACB(week) {
    props.model.weekly.setCurrentWeek(week);
  }

  function removeWeekACB(weekId) {
    props.setGroceryListSize(0);
    props.model.weekly.removeWeek(weekId);
  }
});

export { Overview };
