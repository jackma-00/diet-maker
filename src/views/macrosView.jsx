import React from "react";
import { Box, Typography, Card, CardMedia, CardContent } from "@mui/material";
import RandomNutrients from "../randomNeutrients.jpeg";

export default function MacrosView({ text, macros }) {
  if (!macros.weeklyNeutrients)
    return (
      <Box style={{ marginTop: "5%" }}>
        <Typography variant="h3">Nutrients</Typography>
        <Typography variant="h6">
          This is what you will consume during this {text}
        </Typography>
        <Box display="flex" flexWrap="wrap">
          {Object.keys(macros).map((nutrient, index) => (
            <Card className="styledCard" key={index}>
              <CardMedia
                component="img"
                height="140"
                image={RandomNutrients}
                alt="nutrient image"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {nutrient}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {nutrient === "calories"
                    ? Math.ceil(macros[nutrient]) + " kcal"
                    : Math.ceil(macros[nutrient]) + " grams"}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>
    );

  return (
    <Box style={{ marginTop: "5%" }}>
      <Typography variant="h3">Nutrients</Typography>
      <Typography variant="h6">This is what you will consume</Typography>
      <Box display="flex" flexWrap="wrap">
        {macros.weeklyNeutrients.map((nutrient, index) => (
          <Card className="styledCard" key={index}>
            <CardMedia
              component="img"
              height="140"
              image={RandomNutrients}
              alt="nutrient image"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {nutrient}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {nutrient === "calories"
                  ? Math.ceil(macros.weeklyNeutrients[nutrient]) + " kcal"
                  : Math.ceil(macros.weeklyNeutrients[nutrient]) + " grams"}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
}
