import { MOVIE_SHOWS_REQUEST, MOVIE_SHOWS_SUCCESS, MOVIE_SHOWS_FAILURE, MOVIE_DATE_REQUEST, MOVIE_DATE_RESPONSE, TIME_SLOT_REQUEST, TIME_SLOT_RESPONSE, EXPERIENCE_LIST_REQUEST, EXPERIENCE_LIST_RESPONSE, SCHEDULE_BOOKING_REQUEST, SCHEDULE_BOOKING_RESPONSE } from "./constants";

const defaultState = {
    isLoading: false,
    showDates: [],
    showDateStatus: null,
    venues: [],
    status: '',
    timeSlot: [],
    experienceList: []
}

export default (prevState = defaultState, action) => {

    console.log(JSON.stringify(action))

    switch (action.type) {

        case MOVIE_SHOWS_REQUEST:
            return {
                ...prevState,
                isLoading: true,
                venues: [],
                status: ''
            };

        case MOVIE_SHOWS_SUCCESS:

            console.log('shows success ' + JSON.stringify(action))

            // let showDate = action.data.movie.showDate.length > 0 ? action.data.movie.showDate : prevState.showDate
            let showDate = ""

            return {
                ...prevState,
                showDate: showDate,
                venues: action.data.movie.venues,
                isLoading: false,
                status: action.data.status
            };

        case MOVIE_SHOWS_FAILURE:
            return {
                ...prevState,
                isLoading: false,
                status: action.error.status,
                venues: []
            };

        case MOVIE_DATE_REQUEST:
            return {
                ...prevState,
                isLoading: true
            };

        case MOVIE_DATE_RESPONSE:

            let movieDateResponse = action.data
            let showDates = movieDateResponse.showDate ? movieDateResponse.showDate : []
            let showDateStatus = movieDateResponse.status ? movieDateResponse.status : null

            return {
                ...prevState,
                isLoading: false,
                showDates: showDates,
                showDateStatus: showDateStatus
            };

        case TIME_SLOT_REQUEST:
            return {
                ...prevState,
                isLoading: true
            };

        case TIME_SLOT_RESPONSE:

            let timeSlotRes = action.data
            let timeSlot = timeSlotRes.timeSlot ? timeSlotRes.timeSlot : []
            console.log('timeSlot -- ' + JSON.stringify(timeSlot))

            return {
                ...prevState,
                isLoading: false,
                timeSlot: timeSlot
            };

        case EXPERIENCE_LIST_REQUEST:
            return {
                ...prevState,
                isLoading: true
            };

        case EXPERIENCE_LIST_RESPONSE:

            let experienceRes = action.data
            let experienceList = experienceRes.experiences ? experienceRes.experiences : []

            return {
                ...prevState,
                isLoading: false,
                experienceList: experienceList
            };

        case SCHEDULE_BOOKING_REQUEST:

            return {
                ...prevState,
                isLoading: true
            };

        case SCHEDULE_BOOKING_RESPONSE:
            
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