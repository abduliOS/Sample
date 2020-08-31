import { put, takeEvery } from "redux-saga/effects";
import { MOVIE_LIST_REQUEST, MOVIE_LIST_SUCCESS,  MOVIE_LIST_FAILURE } from "./constants"; 
import * as actions from "./actions";
import Utils from '../Utils'

function* movieList() {

    let body = {
        header : { callingAPI : "string",
                channel: "booking-android",
                transactionId: "b04b2f6b-9c6f-1a30-1ecd-ee20bcc6131a"
            }
    }

    let request = {
        // method: 'POST',
        method: 'GET',
        headers: yield Utils.getHeader(),
        //body: JSON.stringify(body)
    };
    let response = yield fetch(Utils.endpoint.movieList, request).then(res=>res.json());

    console.log('cityList ' + response)

    yield put(actions.movieListSuccess(response));
}

export function* movieListWatcher() {
    yield takeEvery(MOVIE_LIST_REQUEST, movieList);
}
