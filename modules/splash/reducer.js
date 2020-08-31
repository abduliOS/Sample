import { GET_TOKEN, GET_TOKEN_SUCCESS } from "./constants";

const defaultState = {
    isLoading: false,
    isTokenValid: false
}

export default (prevState = defaultState, action) => {
    switch (action.type) {

        case GET_TOKEN:
            return {
                ...prevState,
                isLoading: true,
                isTokenValid: false
            };

        case GET_TOKEN_SUCCESS:
            return {
                ...prevState,
                isLoading: false,
                isTokenValid: true
            };

        default:
            return {
                ...prevState
            };
    }
}