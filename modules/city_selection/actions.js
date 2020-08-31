import { CITY_LIST_REQUEST, CITY_LIST_SUCCESS, CITY_LIST_FAILURE, SET_CITY } from "./constants";
import { MOVIE_LIST_REQUEST } from '../movie_list/constants'

export function cityListRequest() {
    return {
        type: CITY_LIST_REQUEST
    }
}

export function cityListSuccess(data) {
    return {
        type: CITY_LIST_SUCCESS,
        data
    }
}

export function cityListFailure(error) {
    return {
        type: CITY_LIST_FAILURE,
        error
    }
}

export function setCity(city) {
    return {
        type: SET_CITY,
        city
    }
}

export function movieListRequest() {
    return {
        type: MOVIE_LIST_REQUEST
    }
}