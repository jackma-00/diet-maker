import React from "react";
import { useState } from "react";
import {
  Box,
  Typography,
  CardActionArea,
  Card,
  CardMedia,
  CardContent,
  MenuItem,
  Dialog,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Pagination,
  CardActions,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RandomFood from "../randomFood.jpeg";
import { Link } from "react-router-dom";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

export default function DailyView({
  days,
  onSetCurrent,
  dayName,
  dayId,
  listOfMeals,
  meals,
  onAddMeal,
  onRemoveMeal,
  onSaveNew,
  onCardClick,
  onRemoveDay,
}) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [elementToAdd, setElementToAdd] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogText, setDialogText] = useState("");
  const handleDropwdown = (event) => {
    setElementToAdd(event.target.value);
  };
  const handleSaveFromDropdown = () => {
    if (elementToAdd === "") {
      return alert("Please select an item to add");
    }
    onAddMeal(elementToAdd);
    setShowDropdown(false);
    setElementToAdd("");
  };
  function onCardClickACB(mealId) {
    onCardClick(mealId);
  }

  const addNewDay = () => {
    setOpenDialog(true);
  };

  const handleSaveNewDay = () => {
    if (dialogText === "") {
      alert("Please enter a name for the day");
    } else {
      const checkDay = days.find((day) => {
        return day.dietName.toLowerCase() === dialogText.toLowerCase();
      });
      if (checkDay) {
        return alert("This day already exists");
      } else {
        onSaveNew(dialogText);
        setOpenDialog(false);
        setDialogText("");
      }
    }
  };

  const handlePaginationChange = (event, value) => {
    onSetCurrent(days[value - 1]);
  };

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete this day?`)) {
      onRemoveDay();
    }
  };

  return (
    <Box style={{ width: "100%" }}>
      <Typography variant="h6">Your current day:</Typography>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Button
          variant="outlined"
          style={{ color: "red", borderColor: "red" }}
          startIcon={<DeleteOutlineIcon />}
          onClick={() => handleDelete()}
        >
          Delete Day
        </Button>
      </Box>
      <Typography variant="h4">{dayName}</Typography>
      <Pagination
        count={Math.ceil(days.length)}
        variant="outlined"
        style={{ marginLeft: "auto" }}
        page={days.findIndex((day) => day.dietId === dayId) + 1}
        onChange={handlePaginationChange}
      />
      <Box display="flex" flexWrap="wrap">
        {listOfMeals?.map((meal, index) => (
          <Card key={index} className="styledCard">
            <Link
              to={`/meal`}
              style={{ textDecoration: "none", color: "black" }}
            >
              <CardActionArea onClick={() => onCardClickACB(meal[0])}>
                <CardMedia
                  component="img"
                  height="140"
                  image={meal[2] ? meal[2] : RandomFood}
                  alt="green iguana"
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
                    title={meal[1]}
                  >
                    {meal[1]}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Link>
            <CardActions>
              <Button
                style={{ position: "absolute", marginBottom: "2%" }}
                onClick={() => onRemoveMeal(index)}
              >
                Remove meal
                <DeleteOutlineIcon />
              </Button>
            </CardActions>
          </Card>
        ))}
        <Card
          className="styledCard"
          key={listOfMeals.length}
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <CardActionArea style={{ height: "100%", textAlign: "center" }}>
            <AddIcon fontSize="large" />
            <Typography gutterBottom component="div">
              Add a new meal to this day
            </Typography>
          </CardActionArea>
        </Card>
        {showDropdown && (
          <Dialog open={showDropdown} maxWidth="xs" fullWidth={true}>
            <DialogContent>
              <TextField
                select
                label={`Select an item to add to this day`}
                value={elementToAdd}
                onChange={(e) => handleDropwdown(e)}
                style={{ width: "100%" }}
              >
                {meals.length > 0 ? (
                  meals.map((element) => (
                    <MenuItem key={element.mealId} value={element.mealId}>
                      {element.mealName}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem disabled>No meals available yet</MenuItem>
                )}
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
        startIcon={<AddIcon />}
        variant="outlined"
        onClick={() => addNewDay()}
      >
        Create a new day
      </Button>
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogContent>
          <TextField
            label="Give your day a name here"
            value={dialogText}
            onChange={(e) => setDialogText(e.target.value)}
          ></TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={() => handleSaveNewDay()}>Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
