import { CINEMAS_LIST_REQUEST, CINEMAS_LIST_RESPONSE, SEARCH_CINEMAS } from "./constants";

const defaultState = {
    isLoading: false,
    venuesList: [],
    venuesFilteredList: [],
    venuesStatus: null
}

export default (prevState = defaultState, action) => {
    switch (action.type) {

        case CINEMAS_LIST_REQUEST:
            return {
                ...prevState,
                isLoading: true
            };

        case CINEMAS_LIST_RESPONSE:

            let venueData = action.data
            let venuesStatus = venueData.status ? venueData.status : null
            let venuesList = venueData.venues ? venueData.venues : []

            return {
                ...prevState,
                isLoading: false,
                venuesList: venuesList,
                venuesFilteredList: venuesList,
                venuesStatus: venuesStatus
            };

        case SEARCH_CINEMAS:

            let searchKey = action.searchKey
            let filteredList = []
            if (prevState.venuesList.length > 0) {
                filteredList = prevState.venuesList.filter((item) => {
                    return item.venueName.toLowerCase().match(searchKey.toLowerCase())
                })
            }
            return {
                ...prevState,
                venuesFilteredList: filteredList
            };

        default:
            return {
                ...prevState
            };
    }
}