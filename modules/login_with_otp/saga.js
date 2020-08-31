import { put, takeEvery } from "redux-saga/effects";
import { SEND_OTP, SUBMIT_OTP } from "./constants";
import * as AppConstants from '../AppConstants'
import * as actions from "./actions";
import { AsyncStorage } from 'react-native';
import Utils from '../Utils'

function* sendOTP(data) {

    let body = { header: { callingAPI: "string", channel: "string", transactionId: "string" }, ...data.data }
    let request = { method: 'POST', headers: yield Utils.getHeader(), body: JSON.stringify(body) };
    console.log('sendOTP Request ' + JSON.stringify(request))

    let response = yield fetch(Utils.endpoint.sendOTP, request).then(res => res.json());
    console.log('sendOTP Response ' + JSON.stringify(response))

    yield put(actions.sendOTPResponse(response));

}

function* submitOTP(data) {

    const mobileNo = data.data.userId
    console.log('mobileNo ' + mobileNo)

    let body = { header: { callingAPI: "string", channel: "string", transactionId: "string" }, ...data.data }
    let request = { method: 'POST', headers: yield Utils.getHeader(), body: JSON.stringify(body) };
    console.log('submitOTP Request ' + JSON.stringify(request))
    let response = yield fetch(Utils.endpoint.authenticateOTP, request).then(res => res.json());
    console.log('submitOTP response ' + JSON.stringify(response))

    if (response.token && response.token != null) {

        let userToken = response.token ? response.token : ''
        let userRefreshToken = response.refreshToken ? response.refreshToken : ''

        yield AsyncStorage.setItem(AppConstants.USER_TOKEN, userToken)
        yield AsyncStorage.setItem(AppConstants.USER_REFRESH_TOKEN, userRefreshToken)
        // yield AsyncStorage.setItem(AppConstants.IS_LOGGED_IN, "true")
        yield AsyncStorage.setItem(AppConstants.LOGIN_TYPE, AppConstants.USER_LOGIN)
        yield AsyncStorage.setItem(AppConstants.USER_MOBILE_NO, mobileNo)
        yield put(actions.fetchProfile());

    }

    yield put(actions.submitOTPResponse(response));

}

export function* otpLoginWatchers() {
    yield takeEvery(SEND_OTP, sendOTP);
    yield takeEvery(SUBMIT_OTP, submitOTP);
}


