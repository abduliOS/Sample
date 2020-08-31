import { AsyncStorage } from 'react-native';
import { put, takeEvery } from "redux-saga/effects";
import { CINEMAS_LIST_REQUEST, VENUE_DATES_REQUEST, SHOW_TIME_REQUEST } from "./constants";
import * as AppConstants from '../AppConstants'
import * as actions from "./actions";
import Utils from '../Utils'

function* cinemasList() {

    let body = { city: yield Utils.getCity(), header: { callingAPI: "string", channel: "string", transactionId: "string" } }
    let request = { method: 'POST', headers: yield Utils.getHeader(), body: JSON.stringify(body) };
    console.log('cinemasList Request' + JSON.stringify(request))
    let response = yield fetch(Utils.endpoint.venuesByCity, request).then(res => res.json());
    console.log('cinemasList Response' + JSON.stringify(response))
    yield put(actions.cinemaListResponse(response));

}

function* venueDates(data) {

    let venueId = data.venueId

    let body = { city: yield Utils.getCity(), header: { callingAPI: "string", channel: "string", transactionId: "string" }, venue_id: venueId }
    let request = { method: 'POST', headers: yield Utils.getHeader(), body: JSON.stringify(body) };
    console.log('venueDates Request' + JSON.stringify(request))
    let response = yield fetch(Utils.endpoint.venuesDate, request).then(res => res.json());
    console.log('venueDates Response' + JSON.stringify(response))
    yield put(actions.venueDatesResponse(response));

    if (response.showDate) {
        let showDates = response.showDate
        if (showDates.length > 0) {

            let obj = {
                venueId: venueId,
                showDate: showDates[0].showDate
            }

            yield put(actions.showTimeRequest(obj));

        }
    }

}

function* showTime(data) {

    console.log('showTime ' + JSON.stringify(data))

    let venueId = data.data.venueId
    let showDate = data.data.showDate

    let body = { city: yield Utils.getCity(), header: { callingAPI: "string", channel: "string", transactionId: "string" }, venue_id: venueId, showDate: showDate }
    let request = { method: 'POST', headers: yield Utils.getHeader(), body: JSON.stringify(body) };
    console.log('showTime Request' + JSON.stringify(request))
    let response = yield fetch(Utils.endpoint.venuesShowTimes, request).then(res => res.json());
    console.log('showTime Response' + JSON.stringify(response))
    yield put(actions.showTimeResponse(response));

}

export function* cinemasWatcher() {
    yield takeEvery(CINEMAS_LIST_REQUEST, cinemasList);
    yield takeEvery(VENUE_DATES_REQUEST, venueDates);
    yield takeEvery(SHOW_TIME_REQUEST, showTime);
}
