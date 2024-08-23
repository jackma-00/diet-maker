import React from "react";
import {
  Box,
  Typography,
  CardActionArea,
  Card,
  CardMedia,
  CardContent,
  Pagination,
  TextField,
  Button,
  MenuItem,
  Dialog,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import RandomFood from "../randomFood.jpeg";

export default function OverviewView({ weeks, onSetCurrent, weekNumber, weekId, listOfDays, diets, linkToNextView, onAddDiet, onCreateNew, onCardClick, onRemoveWeek }) {
  const [dietName, setDietName] = useState("");
  const [currentPage, setCurrentPage] = useState(weekNumber);
  const [editMode, setEditMode] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [elementToAdd, setElementToAdd] = useState("");
  const [elementToShow, setElementToShow] = useState(listOfDays);
  useEffect(() => {
    setElementToShow(listOfDays.slice(0,7));
  }, [listOfDays]);

  const saveNew = () => {
    onCreateNew(weekNumber+1, dietName)
    setEditMode(false);
    setCurrentPage(weekNumber+1);
  };

  const handlePaginationChange = (event, value) => {
    setCurrentPage(value);
    onSetCurrent(weeks[value - 1]);
  };

  const handleDelete = () => {
    if (
      window.confirm(`Are you sure you want to delete this plan?`)
    ) {
      setCurrentPage(weekNumber-1);
      onRemoveWeek(weekId);
    }
  };

  const handleDropwdown = (event) => {
    setElementToAdd(event.target.value);
  };

  const handleSaveFromDropdown = () => {
    if (elementToAdd === "") {
      return alert("Please select an item to add");
    }
    const lastElement = elementToShow[elementToShow.length - 1];
    let nextDayOfWeek = "Monday"; //edge case if there are no elements in the list, then start from monday
    if (lastElement !== undefined) {
      const dayOfWeek = lastElement[0];
      nextDayOfWeek = getNextDayOfWeek(dayOfWeek);
    }
    onAddDiet(nextDayOfWeek, elementToAdd);
    setShowDropdown(false);
    setElementToAdd("");
  };

  const getNextDayOfWeek = (currentDay) => {
    const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const currentIndex = daysOfWeek.indexOf(currentDay);
    const nextIndex = (currentIndex + 1) % 7;
    return daysOfWeek[nextIndex];
  };

  function onCardClickACB(dietId) {
    onCardClick(dietId);
  }

  return (
    <Box>
      <Typography variant="h6">Your current plan:</Typography>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Button
          variant="outlined"
          style={{ color: "red", borderColor: "red" }}
          startIcon={<DeleteOutlineIcon />}
          onClick={() => handleDelete()}
        >
          Delete plan
        </Button>
      </Box>
        <>
          <Typography variant="h6" style={{ marginRight: "auto" }}>
            Week {currentPage}
          </Typography>
          <Pagination
            count={Math.ceil(weeks.length)}
            variant="outlined"
            style={{ marginLeft: "auto" }}
            page={currentPage}
            onChange={handlePaginationChange}
          />
        </>
      <Box display="flex" flexWrap="wrap">
        {elementToShow.map((element, index) => (
          <Card key={index} className="styledCard">
            <Link
              to={`${linkToNextView}`}
              style={{ textDecoration: "none", color: "black" }}
            >
              <CardActionArea onClick={() => onCardClickACB(element[1])}>
                <CardMedia
                  component="img"
                  height="140"
                  image={element[3] ? element[3] : RandomFood}
                  alt="picture of meal"
                />
                <CardContent>
                  <Typography
                    gutterBottom
                    component="div"
                    style={{
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      fontWeight: "bold",
                    }}
                    
                    title={element[0]}
                  >
                    {element[0]}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {element[2]}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Link>
          </Card>
        ))}
        {elementToShow.length < 7 && (
          <Card
            className="styledCard"
            key={elementToShow.length}
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <CardActionArea style={{ height: "100%", textAlign: "center" }}>
              <AddIcon fontSize="large" />
              <Typography gutterBottom component="div">
                Add a new day to this plan
              </Typography>
            </CardActionArea>
          </Card>
        )}
        {showDropdown && (
          <Dialog open={showDropdown} maxWidth="xs" fullWidth={true}>
            <DialogContent>
              <TextField
                select
                label={`Select an item to add to this plan`}
                value={elementToAdd}
                onChange={(e) => handleDropwdown(e)}
                style={{ width: "100%" }}
              >
                {
                diets.length > 0 ?
                diets.map((element) => (
                    <MenuItem key={element.dietId} value={element.dietId}>
                      {element.dietName}
                    </MenuItem>
                  ))
                  : <MenuItem disabled>No days available yet</MenuItem>
                }
              </TextField>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setShowDropdown(!showDropdown)}>
                Cancel
              </Button>
              <Button onClick={() => handleSaveFromDropdown()} color="primary">
                Save
              </Button>
            </DialogActions>
          </Dialog>
        )}
      </Box>
      <Button
        variant="outlined"
        startIcon={editMode ? <RemoveIcon /> : <AddIcon />}
        onClick={saveNew}
      >
        {editMode
          ? `Cancel creating a new plan`
          : `Create a new plan`}
      </Button>
      {editMode && (
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          style={{ marginTop: "1%" }}
        >
          <Button
            variant="outlined"
            style={{ color: "green", borderColor: "green" }}
            disabled={dietName.length < 1}
            onClick={saveNew}
          >
            Save plan
          </Button>
        </Box>
      )}
    </Box>
  );
}
