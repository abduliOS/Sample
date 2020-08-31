import { CINEMAS_LIST_REQUEST, CINEMAS_LIST_RESPONSE, SEARCH_CINEMAS, VENUE_DATES_REQUEST, VENUE_DATES_RESPONSE, SHOW_TIME_REQUEST, SHOW_TIME_RESPONSE } from "./constants";

export function cinemaListRequest(data) {
    return {
        type: CINEMAS_LIST_REQUEST,
        data
    }
}

export function cinemaListResponse(data) {
    return {
        type: CINEMAS_LIST_RESPONSE,
        data
    }
}

export function searchCinemas(searchKey) {
    return {
        type: SEARCH_CINEMAS,
        searchKey
    }
}

export function venueDatesRequest(venueId) {
    return {
        type: VENUE_DATES_REQUEST,
        venueId
    }
}

export function venueDatesResponse(data) {
    return {
        type: VENUE_DATES_RESPONSE,
        data
    }
}

export function showTimeRequest(data) {
    return {
        type: SHOW_TIME_REQUEST,
        data
    }
}

export function showTimeResponse(data) {
    return {
        type: SHOW_TIME_RESPONSE,
        data
    }
}