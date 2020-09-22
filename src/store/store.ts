import {createStore, applyMiddleware} from "redux";
import giphySearchReducer from "../reducers/giphySearchReducer";
import thunk from "redux-thunk";

export const store = createStore(
    giphySearchReducer,
    applyMiddleware(thunk)
);
