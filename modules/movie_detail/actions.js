import { ADD_REVIEW_REQUEST, ADD_REVIEW_RESPONSE } from "./constants";

export function addReviewRequest(data) {
    return {
        type: ADD_REVIEW_REQUEST,
        data
    }
}

export function addReviewResponse(data) {
    return {
        type: ADD_REVIEW_RESPONSE,
        data
    }
}