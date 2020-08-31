import { put, takeEvery } from "redux-saga/effects";
import * as Constants from "./constants";
import * as AppConstants from '../AppConstants'
import * as actions from "./actions";
import { AsyncStorage } from 'react-native';
import Utils from '../Utils'

function* walletSummary() {

    let body = {
        header: {
            calling_api: "string",
            channel: "string",
            transaction_id: "string"
        },
        user_id: yield Utils.getMobileNo()
        // user_id: 'bindupothuri@gmail.com'
    }

    let request = {
        method: 'POST',
        headers: yield Utils.getHeader(),
        body: JSON.stringify(body)
    };
    
    console.log('walletSummary Request ' + JSON.stringify(request))
    let response = yield fetch(Utils.endpoint.walletSummary, request).then(res => res.json());
    console.log('walletSummary Response ' + JSON.stringify(response))
    yield put(actions.walletSummaryResponse(response));
   
}

export function* walletWatchers() {
    yield takeEvery(Constants.WALLET_SUMMARY_REQUEST, walletSummary);
}


