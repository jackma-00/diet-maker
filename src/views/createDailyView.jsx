import React, { useState } from "react";
import {
  Button,
  TextField,
  Box,
  Dialog,
  DialogContent,
  DialogActions,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const CreateDailyView = ({ onSave }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogText, setDialogText] = useState("");

  const addNewDay = () => {
    setOpenDialog(true);
  };

  const handleSaveNewDay = () => {
    if (dialogText === "") {
      alert("Please enter a name for the day");
    } else {
      onSave(dialogText);
      setOpenDialog(false);
      setDialogText("");
    }
  };

  return (
    <Box display="flex" flexDirection="column">
      <Typography variant="h4">
        You are about to create your first day
      </Typography>
      <Typography variant="body1">
        Click the button below to create a day
      </Typography>
      <Button
        style={{ width: "200px" }}
        startIcon={<AddIcon />}
        variant="outlined"
        onClick={() => addNewDay()}
      >
        Create a new day
      </Button>
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogContent>
          <TextField
            style={{ marginBottom: "10px" }}
            label="Enter the name here"
            value={dialogText}
            onChange={(e) => setDialogText(e.target.value)}
          ></TextField>
          <Typography variant="body2">For example:</Typography>
          <Typography variant="body2">Light day, havy carbs, feast</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleSaveNewDay()}>Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CreateDailyView;
