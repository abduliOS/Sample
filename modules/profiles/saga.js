import { put, takeEvery } from "redux-saga/effects";
import { GET_USER_PROFILE, SET_USER_PROFILE, GENRE_LIST_REQUEST, VENUE_LIST_REQUEST, ADD_VENUE_REQUEST, USER_VENUES_REQUEST, REMOVE_VENUE_REQUEST, ADD_GENRE_REQUEST, USER_GENRES_REQUEST, REMOVE_GENRE_REQUEST } from "./constants";
import * as AppConstants from '../AppConstants'
import * as actions from "./actions";
import { AsyncStorage } from 'react-native';
import Utils from '../Utils'

function* fetchProfile() {

    let body = {
        header: {
            callingAPI: "string",
            channel: "string",
            transactionId: "string"
        }
    }

    let request = { method: 'POST', headers: yield Utils.getHeader(), body: JSON.stringify(body) };
    console.log('getProfile Request ' + JSON.stringify(request))
    let response = yield fetch(Utils.endpoint.getProfile, request).then(res => res.json());
    console.log('getProfile Response ' + JSON.stringify(response))
    yield put(actions.fetchProfileResponse(response));

    yield AsyncStorage.setItem(AppConstants.USER_PROFILE, JSON.stringify(response))

}

function* updateProfile(data) {

    let body = {
        header: {
            callingAPI: "string",
            channel: "string",
            transactionId: "string"
        },
        ...data.data
    }

    let request = {
        method: 'POST',
        headers: yield Utils.getHeader(),
        body: JSON.stringify(body)
    };

    console.log('updateProfile Request ' + JSON.stringify(request))

    let response = yield fetch(Utils.endpoint.setProfile, request).then(res => res.json());
    console.log('updateProfile Response ' + JSON.stringify(response))

    if (response.status) {
        // alert(response.status.statusDescription)
        if (response.status.statusCode == 2001) {
            yield fetchProfile('')
        }
    }

    // yield put(actions.sendOTPResponse(response));
}

function* genreList() {

    let body = { header: { callingAPI: "string", channel: "string", transactionId: "string" } }
    let request = { method: 'POST', headers: yield Utils.getHeader(), body: JSON.stringify(body) };
    let response = yield fetch(Utils.endpoint.genreList, request).then(res => res.json());
    console.log('genreList Response ' + JSON.stringify(response))
    yield put(actions.genreListResponse(response));
}

function* venueList() {

    let body = { city: yield Utils.getCity(), header: { callingAPI: "string", channel: "string", transactionId: "string" } }
    let request = { method: 'POST', headers: yield Utils.getHeader(), body: JSON.stringify(body) };
    let response = yield fetch(Utils.endpoint.venuesByCity, request).then(res => res.json());
    console.log('venueList Response ' + JSON.stringify(response))
    yield put(actions.venueListResponse(response));
}

function* addVenue(data) {

    let body = { header: { callingAPI: "string", channel: "string", transactionId: "string" }, venueId: data.data }
    let request = { method: 'POST', headers: yield Utils.getHeader(), body: JSON.stringify(body) };
    console.log('addVenue request ' + JSON.stringify(request))
    let response = yield fetch(Utils.endpoint.addVenue, request).then(res => res.json());
    console.log('addVenue Response ' + JSON.stringify(response))
    // yield put(actions.addVenueResponse(response));
    yield put(actions.userVenuesRequest());
}

function* removeVenue(data) {

    console.log('removeVenue ' + JSON.stringify(data))

    let venueId = data.data.venueId
    let userVenuePreferenceId = data.data.userVenuePreferenceId
    let userCredentialId = data.data.userCredentialId

    let body = { header: { callingAPI: "string", channel: "string", transactionId: "string" }, venueId: venueId, userVenuePreferenceId: userVenuePreferenceId, userCredentialId: userCredentialId }
    let request = { method: 'POST', headers: yield Utils.getHeader(), body: JSON.stringify(body) };
    console.log('removeVenue request ' + JSON.stringify(request))
    let response = yield fetch(Utils.endpoint.removeVenue, request).then(res => res.json());
    console.log('removeVenue Response ' + JSON.stringify(response))
    // yield put(actions.removeVenueResponse(response));
    yield put(actions.userVenuesRequest());

}

function* userVenues() {

    let body = { header: { callingAPI: "string", channel: "string", transactionId: "string" } }
    let request = { method: 'POST', headers: yield Utils.getHeader(), body: JSON.stringify(body) };
    console.log('userVenues request ' + JSON.stringify(request))
    let response = yield fetch(Utils.endpoint.userVenues, request).then(res => res.json());
    console.log('userVenues Response ' + JSON.stringify(response))
    yield put(actions.userVenuesResponse(response));
}

function* addGenre(data) {

    let body = { header: { callingAPI: "string", channel: "string", transactionId: "string" }, generId: data.data }
    let request = { method: 'POST', headers: yield Utils.getHeader(), body: JSON.stringify(body) };
    console.log('addGenre request ' + JSON.stringify(request))
    let response = yield fetch(Utils.endpoint.addGenre, request).then(res => res.json());
    console.log('addGenre Response ' + JSON.stringify(response))
    // yield put(actions.addGenreResponse(response));
    yield put(actions.userGenresRequest());
}

function* userGenre() {

    let body = { header: { callingAPI: "string", channel: "string", transactionId: "string" } }
    let request = { method: 'POST', headers: yield Utils.getHeader(), body: JSON.stringify(body) };
    console.log('userGenre request ' + JSON.stringify(request))
    let response = yield fetch(Utils.endpoint.userGenres, request).then(res => res.json());
    console.log('userGenre Response ' + JSON.stringify(response))
    yield put(actions.userGenresResponse(response));
}

function* removeGenre(data) {

    console.log('removeVenue ' + JSON.stringify(data))

    let genreId = data.data.genreId
    let userPreferenceGenreId = data.data.userPreferenceGenreId
    let userCredentialId = data.data.userCredentialId

    let body = { header: { callingAPI: "string", channel: "string", transactionId: "string" }, genreId: genreId, userPreferenceGenreId: userPreferenceGenreId, userCredentialId: userCredentialId }
    let request = { method: 'POST', headers: yield Utils.getHeader(), body: JSON.stringify(body) };
    console.log('removeGenre request ' + JSON.stringify(request))
    let response = yield fetch(Utils.endpoint.removeGenre, request).then(res => res.json());
    console.log('removeGenre Response ' + JSON.stringify(response))
    // yield put(actions.removeVenueResponse(response));
    yield put(actions.userGenresRequest());

}

export function* profileWatchers() {
    yield takeEvery(GET_USER_PROFILE, fetchProfile);
    yield takeEvery(SET_USER_PROFILE, updateProfile);
    yield takeEvery(GENRE_LIST_REQUEST, genreList);
    yield takeEvery(VENUE_LIST_REQUEST, venueList);
    yield takeEvery(ADD_VENUE_REQUEST, addVenue);
    yield takeEvery(ADD_GENRE_REQUEST, addGenre);
    yield takeEvery(USER_VENUES_REQUEST, userVenues);
    yield takeEvery(USER_GENRES_REQUEST, userGenre);
    yield takeEvery(REMOVE_VENUE_REQUEST, removeVenue);
    yield takeEvery(REMOVE_GENRE_REQUEST, removeGenre);
}


