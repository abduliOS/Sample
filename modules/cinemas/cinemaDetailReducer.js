import { VENUE_DATES_REQUEST, VENUE_DATES_RESPONSE, SHOW_TIME_REQUEST, SHOW_TIME_RESPONSE } from "./constants";

const defaultState = {
    isLoading: false,
    showDates: [],
    showDatesStatus: null,
    movieList: [],
    movieListStatus: null
}

export default (prevState = defaultState, action) => {
    switch (action.type) {

        case VENUE_DATES_REQUEST:

            return {
                ...prevState,
                isLoading: true
            };

        case VENUE_DATES_RESPONSE:

            let sdResponse = action.data
            let showDates = sdResponse.showDate ? sdResponse.showDate : []
            let showDatesStatus = sdResponse.status ? sdResponse.status : null

            return {
                ...prevState,
                isLoading: false,
                showDates: showDates,
                showDatesStatus: showDatesStatus
            };

        case SHOW_TIME_REQUEST:

            return {
                ...prevState,
                isLoading: true
            };

        case SHOW_TIME_RESPONSE:

            let venueData = action.data.venue ? action.data.venue : null
            let movieList = venueData != null ? venueData.movies : []
            let movieListStatus = action.data.status ? action.data.status : null

            return {
                ...prevState,
                isLoading: false,
                movieList: movieList,
                movieListStatus: movieListStatus
            };

        default:
            return {
                ...prevState
            };
    }
}