import {
  CLIENT_ID,
  CLIENT_SECRET,
  ACCESS_TOKEN_URL,
  API_URL,
  NN,
  API_KEY,
  PROXY_URL,
} from "../config/apiConfig.js";

const options = {
  method: "POST",
  url: PROXY_URL + ACCESS_TOKEN_URL,
  headers: {
    "content-type": "application/x-www-form-urlencoded",
    Authorization:
      "Basic " + btoa(CLIENT_ID + ":" + CLIENT_SECRET).toString("base64"),
    "X-DH2642-Key": API_KEY,
    "X-DH2642-Group": NN,
  },
  body: new URLSearchParams({
    grant_type: "client_credentials",
    scope: "basic",
  }),
};

export function fetchAccessToken() {
  return fetch(options.url, options)
    .then((response) => response.json())
    .then((data) => {
      return {
        access_token: data.access_token,
        expires_in: data.expires_in,
      };
    })
    .catch((error) => console.error("Error:", error));
}

export function searchFood(accessToken, searchExpression) {
  const headers = {
    "content-type": "application/json",
    Authorization: "Bearer " + accessToken,
    "X-DH2642-Key": API_KEY,
    "X-DH2642-Group": NN,
  };
  const parameters = {
    method: "foods.search",
    search_expression: searchExpression,
    format: "json",
  };
  return fetch(PROXY_URL + API_URL + "?" + new URLSearchParams(parameters), {
    method: "POST",
    headers: headers,
  })
    .then((response) => response.json())
    .then((data) => {
      return {
        foods: {
          food: data.foods.food.filter((item) =>
            item.food_description.includes("Per 100g")
          ),
          max_results: data.foods.max_results,
          page_number: data.foods.page_number,
          total_results: data.foods.total_results,
        },
      };
    })
    .then(function resolveDataACB(res) {
      return res;
    })
    .catch((error) => console.error("Error:", error));
}

export function getFoodById(accessToken, foodId) {
  function gotResponseACB(response) {
    return response.json();
  }
  function returnFoodACB(data) {
    return data.food;
  }

  const headers = {
    "content-type": "application/json",
    Authorization: "Bearer " + accessToken,
    "X-DH2642-Key": API_KEY,
    "X-DH2642-Group": NN,
  };
  const parameters = {
    method: "food.get.v4",
    food_id: foodId,
    format: "json",
  };
  return fetch(PROXY_URL + API_URL + "?" + new URLSearchParams(parameters), {
    method: "GET",
    headers: headers,
  })
    .then(gotResponseACB)
    .then(returnFoodACB);
}

/**
 * Example usage of the API functions.
 
// retrieve access token and expiration time
let tokenResponse = await fetchAccessToken();
let accessToken = tokenResponse.access_token;
let expiresIn = tokenResponse.expires_in;
let lastFetchTime = Date.now();

// check if token is expired
if (!accessToken || Date.now() - lastFetchTime > expiresIn) {
  tokenResponse = await fetchAccessToken();
  accessToken = tokenResponse.access_token;
  expiresIn = tokenResponse.expires_in;
  lastFetchTime = Date.now();
}

// fetch data
searchFood(accessToken, "toast").then((data) => console.log(data));
getFoodById(accessToken, "1641").then((data) => console.log(data.food.servings));
*/
