import { SEND_OTP, SUBMIT_OTP, SEND_OTP_RESPONSE, SUBMIT_OTP_RESPONSE, CLEAR_LOGIN } from "./constants";
import { GET_USER_PROFILE } from '../profiles/constants'

export function sendOTP(data) {
    return {
        type: SEND_OTP,
        data
    }
}

export function sendOTPResponse(data) {
    return {
        type: SEND_OTP_RESPONSE,
        data
    }
}

export function submitOTP(data) {
    return {
        type: SUBMIT_OTP,
        data
    }
}

export function submitOTPResponse(data) {
    return {
        type: SUBMIT_OTP_RESPONSE,
        data
    }
}

export function clearLogin() {
    return {
        type: CLEAR_LOGIN
    }
}

export function fetchProfile() {
    return {
        type: GET_USER_PROFILE
    }
}
