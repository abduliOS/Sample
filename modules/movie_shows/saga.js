import { put, takeEvery } from "redux-saga/effects";
import { MOVIE_SHOWS_REQUEST, MOVIE_DATE_REQUEST, TIME_SLOT_REQUEST, EXPERIENCE_LIST_REQUEST, SCHEDULE_BOOKING_REQUEST } from "./constants";
import * as actions from "./actions";
import Utils from '../Utils'

function* movieDateRequest(data) {

    let body = { header: { callingAPI: "string", channel: "string", transactionId: "string" }, movie_id: data.movieId, city: yield Utils.getCity() }
    let request = { method: 'POST', headers: yield Utils.getHeader(), body: JSON.stringify(body) };
    let response = yield fetch(Utils.endpoint.movieDates, request).then(res => res.json());
    yield put(actions.movieDatesResponse(response));

    if (response.showDate) {
        let showDateList = response.showDate
        if (showDateList.length > 0) {
            let reqObj = {
                showDate: showDateList[0].showDate,
                movie_id: data.movieId,
                // movie_id: 17,
                city: yield Utils.getCity()
            }
            yield put(actions.movieShowsRequest(reqObj));
        }
    }

}

function* movieShows(data) {

    let body = { header: { callingAPI: "string", channel: "string", transactionId: "string" }, ...data.data, city: yield Utils.getCity() }

    let request = { method: 'POST', headers: yield Utils.getHeader(), body: JSON.stringify(body) };
    let response = yield fetch(Utils.endpoint.movieShows, request).then(res => res.json());

    if (response.status) {
        if (response.status.statusCode == 2001) {
            yield put(actions.movieShowsSuccess(response));
        } else {
            yield put(actions.movieShowsFailure(response));
        }
    }

}

function* timeSlot() {

    let body = { header: { callingAPI: "string", channel: "string", transactionId: "string" } }
    let request = { method: 'POST', headers: yield Utils.getHeader(), body: JSON.stringify(body) };
    let response = yield fetch(Utils.endpoint.timeSlot, request).then(res => res.json());
    yield put(actions.timeSlotResponse(response));

}

function* experienceList(data) {

    let body = { header: { callingAPI: "string", channel: "string", transactionId: "string" }, venueId: data.data }
    let request = { method: 'POST', headers: yield Utils.getHeader(), body: JSON.stringify(body) };
    let response = yield fetch(Utils.endpoint.experienceList, request).then(res => res.json());
    yield put(actions.experienceListResponse(response));

}

function* scheduleBooking(data) {

    let params = data.data

    let body = {
        header: { callingAPI: "string", channel: "string", transactionId: "string" },
        preferences: {
            bookingStatus: 'New',
            bookingType: 'MOBILE',
            city: yield Utils.getCity(),
            classId: params.classId,
            movieId: params.movieId,
            screenId: params.screenId,
            seatCount: params.seatCount,
            showDate: params.showDate,
            timeSlotId: params.timeSlotId,
            venueId: params.venueId
        }
    }
    let request = { method: 'POST', headers: yield Utils.getHeader(), body: JSON.stringify(body) };
    let response = yield fetch(Utils.endpoint.scheduleBooking, request).then(res => res.json());
    yield put(actions.scheduleBookingResponse(response));

}

export function* movieShowsWatcher() {
    yield takeEvery(MOVIE_SHOWS_REQUEST, movieShows);
    yield takeEvery(MOVIE_DATE_REQUEST, movieDateRequest);
    yield takeEvery(TIME_SLOT_REQUEST, timeSlot);
    yield takeEvery(EXPERIENCE_LIST_REQUEST, experienceList);
    yield takeEvery(SCHEDULE_BOOKING_REQUEST, scheduleBooking);
}
