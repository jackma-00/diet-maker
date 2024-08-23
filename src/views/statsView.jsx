import React from "react";
import { Box, Typography } from "@mui/material";
import { PieChart } from "@mui/x-charts/PieChart";
import { BarChart } from "@mui/x-charts/BarChart";

const StatsView = ({ pieData, data }) => {
  return (
    <Box className="statsBox">
      <Box className="statsBoxChild">
        <Typography variant="h4">
          Total nutrients (micros) in your current week
        </Typography>

        {pieData.every((obj) => obj.value === 0) ? (
          <Typography variant="body1">
            No weeks created yet... Or change to a week in overview that has
            items in it
          </Typography>
        ) : (
          <>
            <Typography variant="h6">Showed in grams</Typography>
            <PieChart
              series={[
                {
                  data: pieData,
                  highlightScope: { faded: "global", highlighted: "item" },
                  faded: {
                    innerRadius: 30,
                    additionalRadius: -30,
                    color: "gray",
                  },
                },
              ]}
              width={800}
              height={450}
            />
          </>
        )}
      </Box>
      <Box className="statsBoxChild">
        <Typography variant="h4">You have stored a total of:</Typography>
        <BarChart
          xAxis={[{ scaleType: "band", data: ["Weeks", "Days", "Meals"] }]}
          series={[
            { data: [data.model.weekly.weeks.length, ,] },
            { data: [, data.model.daily.diets.length] },
            { data: [, , data.model.meal.meals.length] },
          ]}
          width={600}
          height={300}
        />
      </Box>
    </Box>
  );
};

export default StatsView;
