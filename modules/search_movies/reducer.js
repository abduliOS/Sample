import { MOVIE_LIST_REQUEST, MOVIE_LIST_SUCCESS,  MOVIE_LIST_FAILURE } from "./constants";

const defaultState = {
     data: []
}

export default (prevState = defaultState, action) => {
    switch (action.type) {

        case MOVIE_LIST_REQUEST:
            return {
                ...prevState,
                isLoading:true
            };

        case MOVIE_LIST_SUCCESS:
            return {
                ...prevState,
                data: action.data.data.nowShowingMovies,
                isLoading: false
            };    

        case MOVIE_LIST_FAILURE:
            return {
                ...prevState,
                data: action.data.data.cities,
                isLoading: false
            };        
            
        default:
            return {
                ...prevState
            };
    }
}