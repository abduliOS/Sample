import { SEAT_LAYOUT_REQUEST, SEAT_LAYOUT_SUCCESS, SEAT_LAYOUT_FAILURE, SHOW_TIMES_REQUEST, SHOW_TIMES_RESPONSE, RESERVE_BLOCK_SEAT, RESERVE_BLOCK_SEAT_RESPONSE } from "./constants";

const defaultState = {
    showTimes: [],
    showTimesStatus: null,
    isLoading: false,
    seatClasses: [],
    status: '',
    reserveBlockStatus: null
}

export default (prevState = defaultState, action) => {
    switch (action.type) {

        case SEAT_LAYOUT_REQUEST:
            return {
                ...prevState,
                isLoading: true,
                status: '',
                seatClasses: []
            };

        case SEAT_LAYOUT_SUCCESS:

            return {
                ...prevState,
                isLoading: false,
                status: action.data.status,
                seatClasses: action.data.seat_layout.classes
            };

        case SEAT_LAYOUT_FAILURE:
            return {
                ...prevState,
                isLoading: false,
                status: action.data.status
            };

        case SHOW_TIMES_REQUEST:
            return {
                ...prevState,
                isLoading: true
            };

        case SHOW_TIMES_RESPONSE:

            console.log(SHOW_TIMES_RESPONSE + JSON.stringify(action))

            let showTimes = []
            let responseData = action.data
            if (responseData.venue) {
                let movieData = responseData.venue.movies ? responseData.venue.movies : []
                if (movieData.length > 0) {
                    showTimes = movieData[0].shows
                }
            }

            let status = action.data.status ? action.data.status : null

            return {
                ...prevState,
                isLoading: true,
                showTimes: showTimes,
                showTimesStatus: status
            };

        case RESERVE_BLOCK_SEAT:

            return {
                ...prevState,
                isLoading: true
            };

        case RESERVE_BLOCK_SEAT:

            return {
                ...prevState,
                isLoading: false,
                reserveBlockStatus: action.data
            };

        default:
            return {
                ...prevState
            };
    }
}


