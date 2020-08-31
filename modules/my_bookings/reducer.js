import { BOOKING_LIST_REQUEST, BOOKING_LIST_RESPONSE, CANCEL_TICKET_REQUEST, CANCEL_TICKET_RESPONSE } from "./constants";

const defaultState = {
    isLoading: false,
    bookingList: [],
    upcomingBookingList: [],
    pastBookingList: []
}

export default (prevState = defaultState, action) => {
    switch (action.type) {

        case BOOKING_LIST_REQUEST:
            return {
                ...prevState,
                isLoading: true
            };

        case BOOKING_LIST_RESPONSE:

            let upcomingBookingList = []
            let pastBookingList = []

            let blRes = action.data
            let bookingList = blRes.history_details ? blRes.history_details : []
            bookingList.map(item => {

                if (item.cancellationEligibility) {
                    upcomingBookingList.push(item)
                } else {
                    pastBookingList.push(item)
                }

            })

            return {
                ...prevState,
                isLoading: false,
                bookingList: bookingList,
                upcomingBookingList: upcomingBookingList,
                pastBookingList: pastBookingList
            };

        case CANCEL_TICKET_REQUEST:
            return {
                ...prevState,
                isLoading: true
            };

        case CANCEL_TICKET_RESPONSE:
            return {
                ...prevState,
                isLoading: false
            };

        default:
            return {
                ...prevState
            };
    }
}