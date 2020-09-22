import {MultiResponse} from "giphy-api";
import {giphy_api_key} from "../config/config";

export const getGifs = (query: string): Promise<MultiResponse> => {
    return fetch(`https://api.giphy.com/v1/gifs/search?api_key=${giphy_api_key}&${query}`)
        .then(response => response.json());
};

export const getTrendingGifs = (): Promise<MultiResponse> => {
    return fetch(`https://api.giphy.com/v1/gifs/trending?api_key=${giphy_api_key}`)
        .then(response => response.json());
};
