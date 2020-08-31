import { BOOKING_LIST_REQUEST, BOOKING_LIST_RESPONSE, CANCEL_TICKET_REQUEST, CANCEL_TICKET_RESPONSE } from "./constants";

export function bookingListRequest() {
    return {
        type: BOOKING_LIST_REQUEST
    }
}

export function bookingListResponse(data) {
    return {
        type: BOOKING_LIST_RESPONSE,
        data
    }
}

export function cancelTicketRequest(bookingId) {
    return {
        type: CANCEL_TICKET_REQUEST,
        bookingId
    }
}

export function cancelTicketResponse(data) {
    return {
        type: CANCEL_TICKET_RESPONSE,
        data
    }
}