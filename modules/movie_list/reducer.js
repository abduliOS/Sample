import { MOVIE_LIST_REQUEST, MOVIE_LIST_SUCCESS, MOVIE_LIST_FAILURE, MOVIE_LIST_RESPONSE, SEARCH_MOVIE, UPCOMING_MOVIES_REQUEST, UPCOMING_MOVIES_RESPONSE } from "./constants";

const defaultState = {
    data: [],
    filteredData: [],
    isLoading: false,
    status: '',
    isSuccess: null,
    upcomingMovies: [],
    upcomingStatus: null
}

export default (prevState = defaultState, action) => {
    switch (action.type) {

        case MOVIE_LIST_REQUEST:
            return {
                ...prevState,
                isLoading: true,
                data: [],
                filteredData: []
            };

        case MOVIE_LIST_SUCCESS:
            return {
                ...prevState,
                data: action.data.nowShowingMovies,
                filteredData: action.data.nowShowingMovies,
                isLoading: false
            };

        case MOVIE_LIST_FAILURE:
            return {
                ...prevState,
                data: action.data.data.cities,
                isLoading: false
            };

        case MOVIE_LIST_RESPONSE:

            let response = action.data
            let status = response.status ? response.status : ''
            let isSuccess = status.success ? status.success : false

            return {
                ...prevState,
                data: isSuccess ? action.data.nowShowingMovies : [],
                filteredData: isSuccess ? action.data.nowShowingMovies : [],
                status: status,
                isLoading: false,
                isSuccess: isSuccess
            };

        case SEARCH_MOVIE:

            let searchKey = action.searchKey
            let filteredList = []
            if (prevState.data.length > 0) {
                filteredList = prevState.data.filter((item) => {
                    return item.movieName.toLowerCase().match(searchKey.toLowerCase())
                })
            }

            return {
                ...prevState,
                filteredData: filteredList
            };

        case UPCOMING_MOVIES_REQUEST:

            return {
                ...prevState,
                isLoading: true,
                upcomingMovies: [],
                upcomingStatus: null
            };

        case UPCOMING_MOVIES_RESPONSE:

            let ucmResponse = action.data
            let ucmStatus = ucmResponse.status ? ucmResponse.status : null
            let ucmList = ucmResponse.movies ? ucmResponse.movies : []

            return {
                ...prevState,
                isLoading: false,
                upcomingMovies: ucmList,
                upcomingStatus: ucmStatus
            };

        default:
            return {
                ...prevState
            };
    }
}