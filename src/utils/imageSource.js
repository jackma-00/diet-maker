
import axios from 'axios';
import { GOOGLE_API_KEY, GOOGLE_CX } from '../config/apiConfig';


const google_url = 'https://www.googleapis.com/customsearch/v1?key=';;

export async function googleFoodImg(foodName) {
    const response = await axios.get(google_url + GOOGLE_API_KEY[Math.floor(Math.random() * GOOGLE_API_KEY.length)] + '&cx=' +GOOGLE_CX+ '&q=food+' + foodName);
    const data = response.data;

    if (!data.items){
        return undefined;
    }

    return data.items[0].pagemap.cse_image[0].src
}


export async function googleMealImg(mealName) {
    
    const response = await axios.get(google_url + GOOGLE_API_KEY[Math.floor(Math.random() * GOOGLE_API_KEY.length)] + '&cx=' +GOOGLE_CX+ '&q=meal+' + mealName);
    const data = response.data;

    if (!data.items){
        return undefined;
    }

    return data.items[0].pagemap.cse_image[0].src
}

export async function googleDailyImg(dailyName) {
    
    const response = await axios.get(google_url + GOOGLE_API_KEY[Math.floor(Math.random() * GOOGLE_API_KEY.length)] + '&cx=' +GOOGLE_CX+ '&q=daily+diet+' + dailyName);
    const data = response.data;
    
    if (!data.items){
        return undefined;
    }

    return data.items[0].pagemap.cse_image[0].src
}