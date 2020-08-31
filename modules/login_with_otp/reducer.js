import { SEND_OTP, SUBMIT_OTP, SEND_OTP_RESPONSE, SUBMIT_OTP_RESPONSE, SET_AUTHENTICATION, CLEAR_LOGIN } from "./constants";
import * as AppConstants from '../AppConstants'

const defaultState = {
    isLoading: false,
    statusCode: 0,
    statusDesc: '',
    isAuthenticated: false
}

export default (prevState = defaultState, action) => {
    switch (action.type) {

        case SEND_OTP:
            return {
                ...prevState,
                isLoading: true,
                statusCode: 0,
                statusDesc: '',
                isAuthenticated: false
            };

        case SUBMIT_OTP:
            return {
                ...prevState,
                isLoading: true,
                statusCode: 0,
                statusDesc: '',
                isAuthenticated: false
            };

        case SEND_OTP_RESPONSE:

            return {
                ...prevState,
                isLoading: false,
                statusCode: action.data.status.statusCode,
                statusDesc: action.data.status.statusDescription
            };

        case SUBMIT_OTP_RESPONSE:

            const status = action.data.status
            let isAuthenticated = status.statusCode == 1001 ? true : false

            return {
                ...prevState,
                isLoading: false,
                statusCode: action.data.status.statusCode,
                statusDesc: action.data.status.statusDescription,
                isAuthenticated: isAuthenticated
            };

        case SET_AUTHENTICATION:

            const loginType = action.data
            let isAuth = loginType == AppConstants.USER_LOGIN ? true : false
            console.log('isAuth' + isAuth)

            return {
                ...prevState,
                isAuthenticated: isAuth
            };

        case CLEAR_LOGIN:

            return {
                ...prevState,
                statusCode: 0,
                statusDesc: '',
                isAuthenticated: false
            };

        default:
            return {
                ...prevState
            };
    }
}