import { LOGIN_REQUEST } from "./constants";

const defaultState = {
    isLoading: false
}

export default (prevState = defaultState, action) => {
    switch (action.type) {

        case LOGIN_REQUEST:
            return {
                ...prevState,
                isLoading:true
            };   
            
        default:
            return {
                ...prevState
            };
    }
}