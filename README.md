## How to Run

To run this project, follow these steps:

1. Clone the repository to your local machine.

2. Add the configuration files apiConfig.js and firebaseConfig.js under the folder src/config

3. Install the project dependencies.
   `   npm install`

4. Start the development server.
   `   npm run dev`

5. Open your web browser and visit `http://localhost:8080` to view the application.

That's it! You should now be able to run the project locally on your machine. If you encounter any issues, please refer to the project's documentation or seek assistance from the project maintainers.

#### The deployed application can be accessed through this link: https://dh2642-project-6e384.web.app/

## Project description

The idea behind the project is to develop an application that represents a diet planner, where the user can plan their meals for a week, a day, or a period of time and calculate calories as well as other nutritional information. This will basically allow users to search for their favorite foods, add disered quantities of them into customizable meals, and create a diet plan based on those meals. Each food is provided with proper information that the user would conceder when creating meals. Furthermore, nutritional information is calculated and summarized for each meal and plan in order to make the user be able to keep track of their calory consumption.

## What has been implemented

We have developed an application that represents a diet planner, where the user can plan their meals for a week, a day, or a period of time and calculate calories as well as other nutritional information. This application can be used by novice dieters as well as more experienced dieters.

The application is devided into 4 main views where each of which handles a core functionality:

- The overview, where the user can view their current diet plan, which is represented by clickable cards. Each card represents a specific day in the plan. From the overview, the user can also create a new plan, switch to other plans, or remove existing ones. A summary of nutrients for the current plan is also viewed in the bottom of the page.
- The daily view, that displays the current day with all related meals. From here, users can also switch to other days in the plan and view the meals of choosen day, or delete the diet. The content of this page is cards that represent all meals added to that day.
- The meals view, and here users can see all foods and nutrients included to a specific day (current day).
- The search view, where users can create a new meal, search and select an existing meal, and update meals by adding new foods to it or modifying the quantity of each food.

##### Extra functionalities

- Stats, where the user can find a statical representation of the meals nutrients.
- Grocery list, that keeps track of all foods added to the current diet plan in order to inform the user about grocery items they should buy.

## Tecknical details

Two types of API were used in this project for searching specific food information and for getting a specific food by its ID. Additionally, we have implemented persistent storage populated by real data from the API. For persisting the data, Firebase were used.

Furthermore, other APIs were used to generate images for each meal and each diet (day), as well as to implement the login functionality (Google login).

##### If you want to test the API used in this project to retrieve food data, you can do it using Postman https://martian-equinox-799517.postman.co/workspace/fatsecret.com~c41e8b39-5a66-4a70-8812-88d6df5f5ca2/collection/21977882-c2b00a87-ef7a-4742-a48f-b2fc07d9d330?action=share&creator=21977882.

In the application, we used third party components (costum components) from MUI, such as Button, TextField, Box, etc. That gives a better user experience and makes the application more consistent and better looking.

## Project structure

The project structure is as follows:

- `src/`: This directory contains all the source code for the project.

  - `config/`: Includes config files for firebase and the used API. OBS! if you don't have the apiConfig.js and firebaseConfig.js files, please ask one of the project maintainers to provide you with these files, otherwise you won't be able to run the application locally.
  - `models/`: This directory contains the code for the data model and handling the diet plan.
  - `persistence/`: This directory contains the code for persistent storage and saving the diet plan.
  - `presenters/`: This contains the different presenters used in the project.
  - `utils/`: This directory contains utility functions used throughout the application.
  - `views/`: this directory contains the all the views needed for the presenters.

- `public/`: This directory contains static assets such as images.

- `package.json`: This file contains the project's dependencies and scripts.

- `README.md`: This file contains the project documentation and instructions on how to run the project.

## Project contributors

- Ahmad Al Khateeb
- Jacopo Maragna
- Johan Edeland
- Nils Blomgren
