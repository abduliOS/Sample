import { MOVIE_SHOWS_REQUEST, MOVIE_SHOWS_SUCCESS, MOVIE_SHOWS_FAILURE, MOVIE_DATE_REQUEST, MOVIE_DATE_RESPONSE, TIME_SLOT_REQUEST, TIME_SLOT_RESPONSE, CINEMAS_LIST_REQUEST, CINEMAS_LIST_RESPONSE, EXPERIENCE_LIST_REQUEST, EXPERIENCE_LIST_RESPONSE, SCHEDULE_BOOKING_REQUEST, SCHEDULE_BOOKING_RESPONSE } from "./constants";

export function movieShowsRequest(data) {
    return {
        type: MOVIE_SHOWS_REQUEST,
        data
    }
}

export function movieShowsSuccess(data) {
    return {
        type: MOVIE_SHOWS_SUCCESS,
        data
    }
}

export function movieShowsFailure(error) {
    return {
        type: MOVIE_SHOWS_FAILURE,
        error
    }
}

export function movieDatesRequest(movieId) {
    return {
        type: MOVIE_DATE_REQUEST,
        movieId
    }
}

export function movieDatesResponse(data) {
    return {
        type: MOVIE_DATE_RESPONSE,
        data
    }
}

export function timeSlotRequest() {
    return {
        type: TIME_SLOT_REQUEST
    }
}

export function timeSlotResponse(data) {
    return {
        type: TIME_SLOT_RESPONSE,
        data
    }
}

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

export function experienceListRequest(data) {
    return {
        type: EXPERIENCE_LIST_REQUEST,
        data
    }
}

export function experienceListResponse(data) {
    return {
        type: EXPERIENCE_LIST_RESPONSE,
        data
    }
}

export function scheduleBookingRequest(data) {
    return {
        type: SCHEDULE_BOOKING_REQUEST,
        data
    }
}

export function scheduleBookingResponse(data) {
    return {
        type: SCHEDULE_BOOKING_RESPONSE,
        data
    }
}