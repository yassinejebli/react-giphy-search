import GiphyActions from "../constants/GiphyActions";
import {getGifs, getTrendingGifs} from "../api/giphyAPI";
import {serializeQuery} from "../utils/urlUtils";
import {MetaData, GiphySearchState} from "../reducers/giphySearchReducer";
import {AnyAction} from "redux";
import {ThunkDispatch} from "redux-thunk";
import {GIFObject, MultiResponse} from "giphy-api";

export const loadGifsBegin = () => {
    return {
        type: GiphyActions.LOAD_GIFS_BEGIN
    };
};

export const loadGifsSuccess = (gifList: GIFObject[], meta: MetaData) => {
    return {
        type: GiphyActions.LOAD_GIFS_SUCCESS,
        payload: {
            gifList,
            meta
        }
    };
};

const loadGifsFail = () => {
    return {
        type: GiphyActions.LOAD_GIFS_FAIL
    };
};

export const filterGifs = (searchText: string) => {
    return (dispatch: ThunkDispatch<GiphySearchState, {}, AnyAction>) => {
        dispatch({
            type: GiphyActions.SET_SEARCH_TEXT,
            payload: searchText
        });
        dispatch(loadGifs());
    };
};

export const loadMoreGifs = () => {
    return (dispatch: ThunkDispatch<GiphySearchState, {}, AnyAction>, getState: () => GiphySearchState) => {
        const {meta: {offset, limit}} = getState();
        dispatch({
            type: GiphyActions.LOAD_MORE_GIFS,
            payload: offset+limit+1 // new offset (next page)
        });
        dispatch(loadGifs());
    };
};

export const loadGifs = () => {
    return (dispatch: ThunkDispatch<GiphySearchState, {}, AnyAction>, getState: () => GiphySearchState) => {
        const {searchText, meta: {limit, offset}, gifList} = getState();

        dispatch(loadGifsBegin());
        getGifs(serializeQuery({
            offset,
            limit,
            q: searchText
        })).then((response: MultiResponse) => {
            dispatch(loadGifsSuccess([...gifList, ...response.data], {
                offset,
                limit,
                total: response.pagination.total_count
            }));
        }).catch((err: any) => {//TODO: fix typing
            console.error(err);
            dispatch(loadGifsFail());
        });
    };
};

export const loadTrendingGifs = () => {
    return (dispatch: ThunkDispatch<GiphySearchState, {}, AnyAction>, getState: () => GiphySearchState) => {
        dispatch(loadGifsBegin());
        getTrendingGifs().then((response: MultiResponse) => {
            dispatch(loadGifsSuccess(response.data, {
                offset: 0,
                limit: 25,
                total: 25
            }));
        }).catch((err: any) => {//TODO: fix typing
            console.error(err);
            dispatch(loadGifsFail());
        });
    };
};
