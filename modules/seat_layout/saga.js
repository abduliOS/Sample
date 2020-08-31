import { put, takeEvery } from "redux-saga/effects";
import { SEAT_LAYOUT_REQUEST, RESERVE_BLOCK_SEAT, SEAT_LAYOUT_FAILURE, SHOW_TIMES_REQUEST } from "./constants";
import * as actions from "./actions";
import Utils from '../Utils'

function* showTime(requestObj) {

    console.log('showTime ' + JSON.stringify(requestObj))

    let params = requestObj.data
    // console.log('showTime ' + JSON.stringify(showTime))
    let showTimeParams = {
        movie_id: params.movie_id, showDate: params.showDate, venue_id: params.venue_id
    }

    let body = { city: yield Utils.getCity(), ...showTimeParams, header: { callingAPI: "string", channel: "string", transactionId: "string" } }
    let request = { method: 'POST', headers: yield Utils.getHeader(), body: JSON.stringify(body) };
    console.log('showTime request ' + JSON.stringify(request))
    let response = yield fetch(Utils.endpoint.movieShowsByVenue, request).then(res => res.json());
    console.log('showTime response ' + JSON.stringify(response))
    yield put(actions.showTimeResponse(response));

    let _requestObj = { showDetailsId: params.showPublishedId }
    yield put(actions.seatLayoutRequest(_requestObj))

    // if (response.venueData) {
    //     let venueData = response.venueData
    //     if (venueData.movies) {
    //         let shows = venueData.movies[0].shows
    //         // let showPublishedId = shows.length > 0 ? shows[0].showPublishedId : ''
    //         let requestObj = { showDetailsId: 4022 }
    //         yield put(actions.seatLayoutRequest(requestObj))
    //     }
    // }

}

function* seatLayout(requestObj) {

    let body = { location: yield Utils.getCity(), ...requestObj.data, header: { callingAPI: "string", channel: "string", transactionId: "string" } }
    let request = { method: 'POST', headers: yield Utils.getHeader(), body: JSON.stringify(body) };

    let response = yield fetch(Utils.endpoint.seatLayout, request).then(res => res.json());
    console.log('response ' + JSON.stringify(response))

    if (response.status) {
        if (response.status.statusCode == 1001) {
            yield put(actions.seatLayoutSuccess(response));
        } else {
            yield put(actions.seatLayoutFailure(response));
        }
    }

}

function* reserveBlockSeat(requestObj) {

    // let body = { location: yield Utils.getCity(), ...requestObj.data, header: { callingAPI: "string", channel: "string", transactionId: "string" } }

    let body = {
        city: yield Utils.getCity(),
        classId: requestObj.data.classId,
        movieId: requestObj.data.movieId,
        screenId: requestObj.data.screenId,
        seat_layout: {
            classes: {
                classPublishedId: requestObj.data.classPublishedId,
                labels: [{ seatsPublishedId: requestObj.data.seatsPublishedId }]
            }
        },
        showDetailsId: requestObj.showDetailsId,
        venueId: requestObj.venueId,
        header: { callingAPI: "string", channel: "string", transactionId: "string" }
    }

    let request = { method: 'POST', headers: yield Utils.getHeader(), body: JSON.stringify(body) };
    console.log('reserveBlockSeat request ' + JSON.stringify(request))
    let response = yield fetch(Utils.endpoint.reserveBlockSeats, request).then(res => res.json());
    console.log('reserveBlockSeat response ' + JSON.stringify(response))
    yield put(actions.reserveAndBlockSeatResponse(response));

}

export function* seatLayoutWatcher() {
    yield takeEvery(SEAT_LAYOUT_REQUEST, seatLayout);
    yield takeEvery(SHOW_TIMES_REQUEST, showTime);
    yield takeEvery(RESERVE_BLOCK_SEAT, reserveBlockSeat);
}

