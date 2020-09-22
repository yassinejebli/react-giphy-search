import {SearchOptions} from "giphy-api";

export const serializeQuery = (query: Omit<SearchOptions, 'rating'>) => {
    return Object.keys(query)
        .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent((query as any)[key])}`) // TODO: fix typing
        .join('&');
};
