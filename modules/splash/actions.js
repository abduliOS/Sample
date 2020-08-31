import { GET_TOKEN, GET_TOKEN_SUCCESS, SET_AUTHENTICATION } from "./constants";
import { SET_CITY } from '../city_selection/constants'
import { GET_USER_PROFILE_RESPONSE } from '../profiles/constants'

export function getToken() {
    return {
        type: GET_TOKEN
    }
}

export function getTokenSuccess(data) {
    return {
        type: GET_TOKEN_SUCCESS,
        data
    }
}

export function setCity(city) {
    return {
        type: SET_CITY,
        city
    }
}

export function setAuthentication(data) {
    return {
        type: SET_AUTHENTICATION,
        data
    }
}

export function setProfile(data) {
    return {
        type: GET_USER_PROFILE_RESPONSE,
        data
    }
}
