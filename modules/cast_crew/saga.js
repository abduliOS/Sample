import { put, takeEvery } from "redux-saga/effects";
import { CAST_CREW_REQUEST, CAST_CREW_SUCCESS, RELATED_MOVIES, CRITICS_REVIEW_REQUEST, USER_REVIEW_REQUEST } from "./constants";
import * as actions from "./actions";
import Utils from '../Utils'

function* castCrewList(data) {

    let body = { header: { callingAPI: "string", channel: "string", transactionId: "string" }, ...data.data }
    let request = { method: 'POST', headers: yield Utils.getHeader(), body: JSON.stringify(body) };
    let response = yield fetch(Utils.endpoint.castCrew, request).then(res => res.json());

    if (response.status) {
        if (response.status.statusCode == 1001) {
            yield put(actions.castCrewSuccess(response));
        } else {
            yield put(actions.castCrewFailure(response));
        }
    }

}

function* relatedMovies(data) {

    let body = { header: { callingAPI: "string", channel: "string", transactionId: "string" }, ...data.data, city: yield Utils.getCity() }
    let request = { method: 'POST', headers: yield Utils.getHeader(), body: JSON.stringify(body) };
    let response = yield fetch(Utils.endpoint.relatedMovies, request).then(res => res.json());
    yield put(actions.relatedMoviesResponse(response));

}

function* criticsReview(data) {

    let body = { header: { callingAPI: "string", channel: "string", transactionId: "string" }, ...data.data }
    let request = { method: 'POST', headers: yield Utils.getHeader(), body: JSON.stringify(body) };
    let response = yield fetch(Utils.endpoint.criticsReviews, request).then(res => res.json());
    yield put(actions.criticsReviewSuccess(response));

}

function* userReview(data) {

    let body = { header: { callingAPI: "string", channel: "string", transactionId: "string" }, ...data.data }
    let request = { method: 'POST', headers: yield Utils.getHeader(), body: JSON.stringify(body) };
    let response = yield fetch(Utils.endpoint.userReviews, request).then(res => res.json());
    yield put(actions.userReviewSuccess(response));

}

export function* castCrewWatcher() {
    yield takeEvery(CAST_CREW_REQUEST, castCrewList);
    yield takeEvery(RELATED_MOVIES, relatedMovies);
    yield takeEvery(CRITICS_REVIEW_REQUEST, criticsReview);
    yield takeEvery(USER_REVIEW_REQUEST, userReview);
}


