import { MOVIE_DATE_REQUEST } from "./constants";

const defaultState = {
    isLoading: false,
    status: '',
    isSuccess: null
}

export default (prevState = defaultState, action) => {
    switch (action.type) {

        case MOVIE_DATE_REQUEST:
            return {
                ...prevState,
                isLoading: true
            };

        default:
            return {
                ...prevState
            };
    }
}