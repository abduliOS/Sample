import { MOVIE_LIST_REQUEST, MOVIE_LIST_SUCCESS, MOVIE_LIST_FAILURE, MOVIE_LIST_RESPONSE, SEARCH_MOVIE, UPCOMING_MOVIES_REQUEST, UPCOMING_MOVIES_RESPONSE } from "./constants";
import { SET_CITY } from '../city_selection/constants'

export function movieListRequest(city) {
    return {
        type: MOVIE_LIST_REQUEST,
        city
    }
}

export function movieListResponse(data) {
    return {
        type: MOVIE_LIST_RESPONSE,
        data
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

export function searchMovie(searchKey) {
    return {
        type: SEARCH_MOVIE,
        searchKey
    }
}

export function upcomingMoviesRequest(data) {
    return {
        type: UPCOMING_MOVIES_REQUEST,
        data
    }
}

export function upcomingMoviesResponse(data) {
    return {
        type: UPCOMING_MOVIES_RESPONSE,
        data
    }
}

export function setCity(city) {
    return {
        type: SET_CITY,
        city
    }
}