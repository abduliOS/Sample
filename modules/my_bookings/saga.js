import { put, takeEvery } from "redux-saga/effects";
import { BOOKING_LIST_REQUEST, CANCEL_TICKET_REQUEST } from "./constants";
import * as actions from "./actions";
import Utils from '../Utils'

function* bookingList() {

    let body = { header: { callingAPI: "string", channel: "string", transactionId: "string" }, location: yield Utils.getCity() }
    let request = { method: 'POST', headers: yield Utils.getHeader(), body: JSON.stringify(body) };
    let response = yield fetch(Utils.endpoint.bookingHistory, request).then(res => res.json());
    console.log('bookingList ' + JSON.stringify(response))
    yield put(actions.bookingListResponse(response));

}

function* cancelTicket(data) {

    console.log('cancelTicket ' + JSON.stringify(data))

    let bookingId = data.bookingId

    let body = { header: { callingAPI: "string", channel: "string", transactionId: "string" }, booking_id: bookingId }
    let request = { method: 'POST', headers: yield Utils.getHeader(), body: JSON.stringify(body) };
    let response = yield fetch(Utils.endpoint.cancelTicket, request).then(res => res.json());
    console.log('cancelTicket ' + JSON.stringify(response))
    yield put(actions.cancelTicketResponse(response));

}

export function* myBookingsWatcher() {
    yield takeEvery(BOOKING_LIST_REQUEST, bookingList);
    yield takeEvery(CANCEL_TICKET_REQUEST, cancelTicket);
}
