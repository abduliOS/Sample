import { SEAT_LAYOUT_REQUEST, SEAT_LAYOUT_SUCCESS, SEAT_LAYOUT_FAILURE, SHOW_TIMES_REQUEST, SHOW_TIMES_RESPONSE, RESERVE_BLOCK_SEAT, RESERVE_BLOCK_SEAT_RESPONSE } from "./constants";

export function seatLayoutRequest(data) {
    return {
        type: SEAT_LAYOUT_REQUEST,
        data
    }
}

export function seatLayoutSuccess(data) {
    return {
        type: SEAT_LAYOUT_SUCCESS,
        data
    }
}

export function seatLayoutFailure(error) {
    return {
        type: SEAT_LAYOUT_FAILURE,
        error
    }
}

export function showTimeRequest(data) {
    return {
        type: SHOW_TIMES_REQUEST,
        data
    }
}

export function showTimeResponse(data) {
    return {
        type: SHOW_TIMES_RESPONSE,
        data
    }
}

export function reserveAndBlockSeat(data) {
    return {
        type: RESERVE_BLOCK_SEAT,
        data
    }
}

export function reserveAndBlockSeatResponse(data) {
    return {
        type: RESERVE_BLOCK_SEAT_RESPONSE,
        data
    }
}