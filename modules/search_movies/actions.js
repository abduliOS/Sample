import { MOVIE_LIST_REQUEST, MOVIE_LIST_SUCCESS,  MOVIE_LIST_FAILURE } from "./constants";

export function movieListRequest() {
    return {
        type: MOVIE_LIST_REQUEST
    }
}

export function movieListSuccess(data) {
    return {
        type: MOVIE_LIST_SUCCESS,
        data
    }
}

export function movieListFailure(error) {
    return {
        type: MOVIE_LIST_FAILURE,
        error
    }
}