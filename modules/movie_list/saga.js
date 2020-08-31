import { AsyncStorage } from 'react-native';
import { put, takeEvery } from "redux-saga/effects";
import { MOVIE_LIST_REQUEST, UPCOMING_MOVIES_REQUEST, MOVIE_LIST_FAILURE } from "./constants";
import * as AppConstants from '../AppConstants'
import * as actions from "./actions";
import Utils from '../Utils'

function* movieList() {

    let loginType = yield AsyncStorage.getItem(AppConstants.LOGIN_TYPE)
    console.log('movieList loginType ' + loginType)
    if (loginType == AppConstants.USER_LOGIN) {

        let body = { city: yield Utils.getCity(), header: { callingAPI: "string", channel: "BOOKING-ANDROID", transactionId: "string" } }
        let request = { method: 'POST', headers: yield Utils.getHeader(), body: JSON.stringify(body) };
        console.log('movieList request' + JSON.stringify(request))
        let response = yield fetch(Utils.endpoint.movieList, request).then(res => res.json());
        console.log('movieList ' + JSON.stringify(response))
        yield put(actions.movieListResponse(response));

    } else {

        let getTokenBody = { header: { callingAPI: "string", channel: "string", transactionId: "string" }, userId: '_ANONYMOUS_USER' }
        let getTokenRequest = { method: 'POST', body: JSON.stringify(getTokenBody) };
        let getTokenResponse = yield fetch(Utils.endpoint.authenticateOTP, getTokenRequest).then(res => res.json());
        console.log('getTokenResponse' + JSON.stringify(getTokenResponse))
        if (getTokenResponse.token) {

            // yield Utils.saveAnonymsToken(getTokenResponse);
            yield AsyncStorage.setItem(AppConstants.ANONYMOUS_TOKEN_DATA, JSON.stringify(getTokenResponse))
            yield AsyncStorage.setItem(AppConstants.LOGIN_TYPE, AppConstants.ANONYMOUS_LOGIN)

            let body = { city: yield Utils.getCity(), header: { callingAPI: "string", channel: "BOOKING-ANDROID", transactionId: "string" } }
            let request = { method: 'POST', headers: yield Utils.getHeader(), body: JSON.stringify(body) };
            console.log('movieList request' + JSON.stringify(request))
            let response = yield fetch(Utils.endpoint.movieList, request).then(res => res.json());
            console.log('movieList ' + JSON.stringify(response))
            yield put(actions.movieListResponse(response));

        }

    }

}

function* upcomingMovieList() {

    let body = { header: { callingAPI: "string", channel: "BOOKING-ANDROID", transactionId: "string" } }
    let request = { method: 'POST', headers: yield Utils.getHeader(), body: JSON.stringify(body) };
    console.log('movieList request' + JSON.stringify(request))
    let response = yield fetch(Utils.endpoint.upcomingMovies, request).then(res => res.json());
    console.log('movieList ' + JSON.stringify(response))
    yield put(actions.upcomingMoviesResponse(response));

}

export function* movieListWatcher() {
    yield takeEvery(MOVIE_LIST_REQUEST, movieList);
    yield takeEvery(UPCOMING_MOVIES_REQUEST, upcomingMovieList);
}
