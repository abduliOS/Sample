import { CAST_CREW_REQUEST, CAST_CREW_SUCCESS,  CAST_CREW_FAILURE, RELATED_MOVIES, RELATED_MOVIES_RESPONSE, CRITICS_REVIEW_REQUEST, USER_REVIEW_REQUEST, CRITICS_REVIEW_SUCCESS, USER_REVIEW_SUCCESS } from "./constants";

export function castCrewRequest(data) {
    return {
        type: CAST_CREW_REQUEST,
        data
    }
}

export function castCrewSuccess(data) {
    return {
        type: CAST_CREW_SUCCESS,
        data
    }
}

export function castCrewFailure(error) {
    return {
        type: CAST_CREW_FAILURE,
        error
    }
}

export function relatedMoviesRequest(data) {
    return {
        type: RELATED_MOVIES,
        data
    }
}

export function relatedMoviesResponse(data) {
    return {
        type: RELATED_MOVIES_RESPONSE,
        data
    }
}

export function criticsReviewRequest(data) {
    return {
        type: CRITICS_REVIEW_REQUEST,
        data
    }
}

export function criticsReviewSuccess(data) {
    return {
        type: CRITICS_REVIEW_SUCCESS,
        data
    }
}

export function userReviewRequest(data) {
    return {
        type: USER_REVIEW_REQUEST,
        data
    }
}

export function userReviewSuccess(data) {
    return {
        type: USER_REVIEW_SUCCESS,
        data
    }
}