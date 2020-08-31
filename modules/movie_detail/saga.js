import { put, takeEvery } from "redux-saga/effects";
import { ADD_REVIEW_REQUEST } from "./constants";
import * as AppConstants from '../AppConstants'
import * as actions from "./actions";
import { AsyncStorage } from 'react-native';
import Utils from '../Utils'

function* addReview(data) {

    console.log('addReview ' + JSON.stringify(data))

    let params = {

    }

    let body = { header: { callingAPI: "string", channel: "string", transactionId: "string" }, ...data.data }
    let request = { method: 'POST', headers: yield Utils.getHeader(), body: JSON.stringify(body) };
    console.log('addReview Request ' + JSON.stringify(request))

    let response = yield fetch(Utils.endpoint.addReview, request).then(res => res.json());
    console.log('addReview Response ' + JSON.stringify(response))

    // yield put(actions.addReviewResponse(response));

}


export function* movieDetailWatchers() {
    yield takeEvery(ADD_REVIEW_REQUEST, addReview);
}


