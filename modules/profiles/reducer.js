import { GET_USER_PROFILE, SET_USER_PROFILE, GET_USER_PROFILE_RESPONSE, GENRE_LIST_REQUEST, GENRE_LIST_RESPONSE, VENUE_LIST_REQUEST, VENUE_LIST_RESPONSE, ADD_VENUE_REQUEST, ADD_VENUE_RESPONSE, USER_VENUES_REQUEST, USER_VENUES_RESPONSE, REMOVE_VENUE_REQUEST, REMOVE_VENUE_RESPONSE, ADD_GENRE_REQUEST, ADD_GENRE_RESPONSE, USER_GENRES_REQUEST, USER_GENRES_RESPONSE, REMOVE_GENRE_REQUEST, REMOVE_GENRE_RESPONSE } from "./constants";

const defaultState = {
    isLoading: false,
    profileData: null,
    genresList: [],
    venuesList: [],
    userVenues: [],
    userGenres: [],
    userCredentialId: null,
    userVenuePreferenceId: null,
    userPreferenceGenreId: null
}

export default (prevState = defaultState, action) => {
    switch (action.type) {

        case GET_USER_PROFILE:
            return {
                ...prevState,
                isLoading: true
            };

        case SET_USER_PROFILE:
            return {
                ...prevState,
                isLoading: true
            };

        case GET_USER_PROFILE_RESPONSE:
            return {
                ...prevState,
                isLoading: false,
                profileData: action.data
            };

        case GENRE_LIST_REQUEST:

            return {
                ...prevState,
                isLoading: true
            };

        case GENRE_LIST_RESPONSE:

            let genreRes = action.data
            let genresList = genreRes.genres ? genreRes.genres : []

            let genresFilteredList = []
            let userGenresIdList = []
            let userGenresTemp = prevState.userGenres
            userGenresTemp.map(item => { userGenresIdList.push(item.genres[0].genreId) })
            genresList.map(item => {
                if (userGenresIdList.indexOf(item.genreId) == -1) { genresFilteredList.push(item) }
            })

            return {
                ...prevState,
                isLoading: false,
                genresList: genresFilteredList
            };

        case VENUE_LIST_REQUEST:

            return {
                ...prevState,
                isLoading: true
            };

        case VENUE_LIST_RESPONSE:

            let venuesRes = action.data
            let venuesList = venuesRes.venues ? venuesRes.venues : []

            let venuesFilteredList = []
            let userVenuesIdList = []
            let userVenuesTemp = prevState.userVenues
            userVenuesTemp.map(item => { userVenuesIdList.push(item.venues[0].venueId) })
            venuesList.map(item => {
                if (userVenuesIdList.indexOf(item.venueId) == -1) { venuesFilteredList.push(item) }
            })

            return {
                ...prevState,
                isLoading: false,
                venuesList: venuesFilteredList
            };

        case ADD_VENUE_REQUEST:

            return {
                ...prevState,
                isLoading: true
            };

        case ADD_VENUE_RESPONSE:

            return {
                ...prevState,
                isLoading: false
            };

        case USER_VENUES_REQUEST:

            return {
                ...prevState,
                isLoading: true
            };

        case USER_VENUES_RESPONSE:

            let userVenuesRes = action.data
            let userVenues = userVenuesRes.venue ? userVenuesRes.venue : []
            let userVenuePreferenceId = userVenuesRes.userVenuePreferenceId ? userVenuesRes.userVenuePreferenceId : null
            let userCredentialId = userVenuesRes.userCredentialId ? userVenuesRes.userCredentialId : null

            return {
                ...prevState,
                isLoading: false,
                userVenues: userVenues,
                userVenuePreferenceId: userVenuePreferenceId,
                userCredentialId: userCredentialId
            };

        case REMOVE_VENUE_REQUEST:

            return {
                ...prevState,
                isLoading: true
            };

        case REMOVE_VENUE_RESPONSE:

            return {
                ...prevState,
                isLoading: false
            };

        case REMOVE_GENRE_REQUEST:

            return {
                ...prevState,
                isLoading: true
            };

        case REMOVE_GENRE_RESPONSE:

            return {
                ...prevState,
                isLoading: false
            };

        case ADD_GENRE_REQUEST:

            return {
                ...prevState,
                isLoading: true
            };

        case ADD_GENRE_RESPONSE:

            return {
                ...prevState,
                isLoading: false
            };

        case USER_GENRES_REQUEST:

            return {
                ...prevState,
                isLoading: true
            };

        case USER_GENRES_RESPONSE:

            let userGenresRes = action.data
            let userGenres = userGenresRes.genres ? userGenresRes.genres : []
            let userPreferenceGenreId = userGenresRes.userPreferenceGenreId ? userGenresRes.userPreferenceGenreId : null

            return {
                ...prevState,
                isLoading: false,
                userGenres: userGenres,
                userPreferenceGenreId: userPreferenceGenreId
            };

        default:
            return {
                ...prevState
            };
    }
}