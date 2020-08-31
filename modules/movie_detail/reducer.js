import { ADD_REVIEW_REQUEST, ADD_REVIEW_RESPONSE } from "./constants";

const defaultState = {
    isLoading: false,
}

export default (prevState = defaultState, action) => {
    switch (action.type) {

        case ADD_REVIEW_REQUEST:
            return {
                ...prevState,
                isLoading: true
            };

        case ADD_REVIEW_RESPONSE:
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