import { CITY_LIST_REQUEST, CITY_LIST_SUCCESS, CITY_LIST_FAILURE, SET_CITY } from "./constants";

const defaultState = {
    data: [],
    popularCities: [],
    otherCities: [],
    selectedCity: ''
}

export default (prevState = defaultState, action) => {
    switch (action.type) {

        case CITY_LIST_REQUEST:
            return {
                ...prevState,
                isLoading: true
            };

        case CITY_LIST_SUCCESS:

            console.log('action ' + JSON.stringify(action))

            return {
                ...prevState,
                // data: action.data.data.cities,
                popularCities: action.data.popularCities,
                otherCities: action.data.otherCities,
                isLoading: false
            };

        case SET_CITY:

            return {
                ...prevState,
                selectedCity: action.city
            };

        default:
            return {
                ...prevState
            };
    }
}