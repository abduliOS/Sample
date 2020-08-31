import { put, takeEvery } from "redux-saga/effects";
import { CITY_LIST_REQUEST, CITY_LIST_SUCCESS, CITY_LIST_FAILURE } from "./constants";
import * as actions from "./actions";
import Utils from '../Utils'

function* cityList() {

    let body = {
        header: {
            callingAPI: "string",
            channel: "BOOKING-ANDROID",
            transactionId: "string"
        }
    }

    let request = {
        method: 'POST',
        headers: yield Utils.getHeader(),
        body: JSON.stringify(body)
    };
    let response = yield fetch(Utils.endpoint.cityList, request).then(res => res.json());
    console.log('cityList' + JSON.stringify(response))

    if (response != null) {
        if (response.status.success == true) {
            yield put(actions.cityListSuccess(response));
        }
    }

}

export function* cityWatcher() {
    yield takeEvery(CITY_LIST_REQUEST, cityList);
}


