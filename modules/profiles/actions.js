import { GET_USER_PROFILE, SET_USER_PROFILE, GET_USER_PROFILE_RESPONSE, GENRE_LIST_REQUEST, GENRE_LIST_RESPONSE, VENUE_LIST_REQUEST, VENUE_LIST_RESPONSE, ADD_VENUE_REQUEST, ADD_VENUE_RESPONSE, USER_VENUES_REQUEST, USER_VENUES_RESPONSE, REMOVE_VENUE_REQUEST, REMOVE_VENUE_RESPONSE, ADD_GENRE_REQUEST, ADD_GENRE_RESPONSE, USER_GENRES_REQUEST, USER_GENRES_RESPONSE, REMOVE_GENRE_REQUEST, REMOVE_GENRE_RESPONSE } from "./constants";

export function fetchProfile() {
    return {
        type: GET_USER_PROFILE
    }
}

export function fetchProfileResponse(data) {
    return {
        type: GET_USER_PROFILE_RESPONSE,
        data
    }
}

export function updateProfile(data) {
    return {
        type: SET_USER_PROFILE,
        data
    }
}

export function genreListRequest() {
    return {
        type: GENRE_LIST_REQUEST
    }
}

export function genreListResponse(data) {
    return {
        type: GENRE_LIST_RESPONSE,
        data
    }
}

export function venuesListRequest() {
    return {
        type: VENUE_LIST_REQUEST
    }
}

export function venueListResponse(data) {
    return {
        type: VENUE_LIST_RESPONSE,
        data
    }
}

export function addVenueRequest(data) {
    return {
        type: ADD_VENUE_REQUEST,
        data
    }
}

export function addVenueResponse(data) {
    return {
        type: ADD_VENUE_RESPONSE,
        data
    }
}

export function userVenuesRequest() {
    return {
        type: USER_VENUES_REQUEST
    }
}

export function userVenuesResponse(data) {
    return {
        type: USER_VENUES_RESPONSE,
        data
    }
}

export function userGenresRequest() {
    return {
        type: USER_GENRES_REQUEST
    }
}

export function userGenresResponse(data) {
    return {
        type: USER_GENRES_RESPONSE,
        data
    }
}

export function removeVenueRequest(data) {
    return {
        type: REMOVE_VENUE_REQUEST,
        data
    }
}

export function removeVenueResponse(data) {
    return {
        type: REMOVE_VENUE_RESPONSE,
        data
    }
}

export function removeGenreRequest(data) {
    return {
        type: REMOVE_GENRE_REQUEST,
        data
    }
}

export function removeGenreResponse(data) {
    return {
        type: REMOVE_GENRE_RESPONSE,
        data
    }
}


export function addGenreRequest(data) {
    return {
        type: ADD_GENRE_REQUEST,
        data
    }
}

export function addGenreResponse(data) {
    return {
        type: ADD_GENRE_RESPONSE,
        data
    }
}