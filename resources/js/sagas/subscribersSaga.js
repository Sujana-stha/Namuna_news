import {takeLatest, call, put } from 'redux-saga/effects';
import * as types from '../actions/action-types';
import * as api from '../api/subscribe-api';
import * as subscribeAction from '../actions/subscriber-action';
import {notify} from 'react-notify-toast';


//Get SUBSCRIBERS data in table
export function* SubscriberWatcher() {
    yield takeLatest(types.REQUEST_SUBSCRIBERS, SubscriberSaga)
}
function* SubscriberSaga(action) {
    const response = yield call(api.getSubscribers, action.pageNumber);
    const subscribers = response
    if (response.errors) {
        notify.show("Cannot get all Subscribers", "error", 5000)
        yield put({ type: types.REQUEST_SUBSCRIBERS_FAILED, errors: response.errors});
        error = response.errors;
    } else {
        yield put({type: types.GET_SUBSCRIBERS_SUCCESS, subscribers});
    }
}

// delete SUBSCRIBERS data from table
export function* deleteSubscribersSaga() {
    yield takeLatest(types.REQUEST_DELETE_SUBSCRIBERS, callDeleteSubscriber)
}

function* callDeleteSubscriber(action) {
    const result = yield call(api.deleteSubscribers, action.subscribeId);

    if(result.errors) {
        yield put({ type: types.REQUEST_SUBSCRIBERS_FAILED, errors: result.error});
        error = result.error;
        notify.show("Delete failed", "error", 5000)
    } else {
        yield put(subscribeAction.deleteSubscribeSuccess(action.subscribeId));
        notify.show("Deleted successfully!", "error", 5000)
    }
} 

