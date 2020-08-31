import { CAST_CREW_REQUEST, CAST_CREW_SUCCESS, CAST_CREW_FAILURE, RELATED_MOVIES_RESPONSE, USER_REVIEW_SUCCESS, CRITICS_REVIEW_SUCCESS } from "./constants";

const defaultState = {
    casts: [],
    crews: [],
    relatedMovies: [],
    userReviews: [],
    criticsReviews: [],
    castStatus: ''
}

export default (prevState = defaultState, action) => {
    switch (action.type) {

        case CAST_CREW_REQUEST:
            return {
                ...prevState,
                isLoading: true,
                castStatus: ''
            };

        case CAST_CREW_SUCCESS:

            return {
                ...prevState,
                casts: action.data.casts,
                crews: action.data.crews,
                isLoading: false
            };

        case CAST_CREW_FAILURE:

            return {
                ...prevState,
                isLoading: false,
                castStatus: action.error.status
            };

        case RELATED_MOVIES_RESPONSE:

            let rmResponse = action.data
            let relatedMovies = rmResponse.nowShowingMovies ? rmResponse.nowShowingMovies : []

            return {
                ...prevState,
                relatedMovies: relatedMovies,
                isLoading: false
            };

        case USER_REVIEW_SUCCESS:

            return {
                ...prevState,
                isLoading: false,
                userReviews: action.data.reviews
            };

        case CRITICS_REVIEW_SUCCESS:

            return {
                ...prevState,
                isLoading: false,
                criticsReviews: action.data.reviews
            };

        default:
            return {
                ...prevState
            };
    }
}