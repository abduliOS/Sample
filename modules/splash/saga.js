import { put, takeEvery } from "redux-saga/effects";
import { GET_TOKEN } from "./constants";
import * as AppConstants from '../AppConstants'
import * as actions from "./actions";
import { AsyncStorage } from 'react-native';
import Utils from '../Utils'

function* getToken() {

    let body = {
        header: {
            callingAPI: "string",
            channel: "string",
            transactionId: "string"
        },
        userId: '_ANONYMOUS_USER'
    }

    let request = {
        method: 'POST',
        headers: yield Utils.getHeader(),
        body: JSON.stringify(body)
    };
    console.log('getToken Request ' + JSON.stringify(request))
    let response = yield fetch(Utils.endpoint.authenticateOTP, request).then(res => res.json());
    console.log('getToken Response ' + JSON.stringify(response))

    if (response.token) {

        let userToken = response.token ? response.token : ''
        let userRefreshToken = response.refreshToken ? response.refreshToken : ''

        yield AsyncStorage.setItem(AppConstants.USER_TOKEN, userToken)
        yield AsyncStorage.setItem(AppConstants.USER_REFRESH_TOKEN, userRefreshToken)
        // yield AsyncStorage.setItem(AppConstants.IS_LOGGED_IN, "true")
        yield AsyncStorage.setItem(AppConstants.LOGIN_TYPE, AppConstants.ANONYMOUS_LOGIN)

        yield put(actions.getTokenSuccess(response));

    }

}

export function* appWatchers() {
    yield takeEvery(GET_TOKEN, getToken);
}


