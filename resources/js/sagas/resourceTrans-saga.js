import {takeLatest, call, put } from 'redux-saga/effects';
import { startSubmit, stopSubmit, reset } from 'redux-form';
import * as types from '../actions/action-types';
import * as api from '../api/resourcesTrans-api';
import * as resourceTransAction from '../actions/resourceTranslation-action';
import {notify} from 'react-notify-toast';
import { push } from 'connected-react-router';

//Get RESOURCES_TRANSLATION data in table
export function* ResourcesTransWatcher() {
    yield takeLatest(types.REQUEST_RESOURCE_TRANSLATION, ResourcesTransSaga)
}
function* ResourcesTransSaga(action) {
    
    const response = yield call(api.getResourcesTrans, action.pageNumber);
    console.log('cat', response)
    const resourcesTrans = response
    if (response.errors) {
        yield put({ type: types.REQUEST_RESOURCE_TRANSLATION_FAILED, errors: response.error});
        error = response.errors;
        notify.show("Cannot get all resources Translation", "error", 5000)
    } else {
        yield put({type: types.GET_RESOURCE_TRANSLATION_SUCCESS, resourcesTrans});
    }
}

// Submit form data of RESOURCES_TRANSLATION
export function* submitResourcesTransSaga() {
    yield takeLatest(types.REQUEST_ADD_RESOURCE_TRANSLATION, callResourcesTransSubmit)
}
function* callResourcesTransSubmit(action) {
    yield put(startSubmit('AddResourcesTrans'));
    let error = {};
    const result =  yield call(api.addResourcesTrans, action.values);
    const resp = result.data
    const pageNumber= action.pageNumber

    if ((result.errors && !resp.success)|| (result.errors || !resp.success)) {
        yield put({ type: types.REQUEST_RESOURCE_TRANSLATION_FAILED, errors: result.error || resp.errormsg});
        error = result.error || resp.errormsg;
        if(resp.errorcode==23000) {
            notify.show("Resource Translation Description already exists!","error", 5000);
        }
        notify.show("Cannot create new Resource Translation!", "error", 5000)
    } else {
        // yield put({type: types.ADD_RESOURCES_TRANSLATION_SUCCESS, resp, message: result.statusText});
        yield put({type: types.REQUEST_RESOURCE_TRANSLATION, pageNumber})
        notify.show("Resources Translation created successfully!", "success", 5000)
        yield put(push('/translated-resources'));
    }
    yield put(stopSubmit('AddResourcesTrans', error));
    yield put(reset('AddResourcesTrans'));
}

//edit form data of RESOURCES_TRANSLATION
export function* editResourcesTransSaga() {
    yield takeLatest(types.REQUEST_EDIT_RESOURCE_TRANSLATION, callEditResourceTrans);
}

function* callEditResourceTrans (action) {
    yield put(startSubmit('EditResourcesTrans'));
    let error = {};
    console.log(action);
    const result =  yield call(api.updateResourcesTrans, action.values.id, action.values);
    const resp = result.data;
    const pageNumber= action.pageNumber
    
    if (result.errors) {
        yield put({ type: types.REQUEST_RESOURCE_TRANSLATION_FAILED, errors: result.error});
        error = result.error;
        notify.show("Update failed", "error", 5000)
    } else {
        // yield put({type: types.UPDATE_RESOURCES_TRANSLATION_SUCCESS, resp, message: result.statusText});
        yield put({type: types.REQUEST_RESOURCE_TRANSLATION, pageNumber})
        notify.show("Updated successfully!", "success", 5000)
        yield put(push('/translated-resources'));
    }
    yield put(stopSubmit('EditResourcesTrans', error));
    yield put(reset('EditResourcesTrans'));

}

// delete RESOURCES_TRANSLATION data from table
export function* deleteResourcesTransSaga() {
    yield takeLatest(types.REQUEST_DELETE_RESOURCE_TRANSLATION, callDeleteResourceTrans)
}

function* callDeleteResourceTrans(action) {
    const result = yield call(api.deleteResourcesTrans, action.resourceTransId);

    if(result.errors) {
        yield put({ type: types.REQUEST_RESOURCE_TRANSLATION_FAILED, errors: result.error});
        error = result.error;
        notify.show("Delete failed", "error", 5000)
    } else {
        yield put(resourceTransAction.deleteResourcesTranslationSuccess(action.resourceTransId));
        notify.show("Deleted successfully!", "error", 5000)
    }
} 

