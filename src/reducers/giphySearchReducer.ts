import GiphyActions from "../constants/GiphyActions";
import {GIFObject} from "giphy-api";

export interface MetaData {
    offset: number;
    limit: number;
    total: number;
}

export interface GiphySearchState{
    searchText: string;
    gifList: GIFObject[];
    isLoading: boolean;
    error: boolean;
    meta: MetaData;
}

export const giphySearchState: GiphySearchState = {
    searchText: '',
    gifList: [],
    isLoading: false,
    error: false,
    meta:{
        offset: 0,
        limit: 20,
        total: 0 // unknown
    }
};

const giphySearchReducer = (state: GiphySearchState = giphySearchState, action: {type: string, payload: any}): GiphySearchState => {//TODO: fix typing
    switch (action.type) {
        case GiphyActions.LOAD_GIFS_BEGIN:
            return {...state, isLoading: true};
        case GiphyActions.LOAD_GIFS_SUCCESS:
            return {
                ...state,
                gifList: action.payload.gifList,
                meta: action.payload.meta,
                isLoading: false
            };
        case GiphyActions.LOAD_GIFS_FAIL:
            return {
                ...giphySearchState,
                error: true
            };
        case GiphyActions.SET_SEARCH_TEXT:
            return {
                ...giphySearchState, //reset state, (remove accumulated gifs, reset pagination...)
                searchText: action.payload
            };
        case GiphyActions.LOAD_MORE_GIFS:
            return {
                ...state,
                meta: {
                    ...state.meta,
                    offset: action.payload
                }
            };
        default:
            return state;
    }
};

export default giphySearchReducer;
