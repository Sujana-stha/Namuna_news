import {takeLatest, call, put } from 'redux-saga/effects';
import { startSubmit, stopSubmit, reset } from 'redux-form';
import * as types from '../actions/action-types';
import * as api from '../api/resources-api';
import * as resourceAction from '../actions/resource-action';
import {notify} from 'react-notify-toast';


//Get RESOURCES data in table
export function* ResourcesWatcher() {
    yield takeLatest(types.REQUEST_RESOURCES, ResourcesSaga)
}
function* ResourcesSaga(action) {
    
    const response = yield call(api.getResources);
    console.log('cat', response)
    const resources = response
    if (response.errors) {
        yield put({ type: types.REQUEST_RESOURCES_FAILED, errors: response.error});
        error = response.errors;
        notify.show("Cannot get all resources", "error", 5000)
    } else {
        yield put({type: types.GET_RESOURCES_SUCCESS, resources});
    }
}

// Submit form data of RESOURCES
export function* submitResourcesSaga() {
    yield takeLatest(types.REQUEST_ADD_RESOURCES, callResourcesSubmit)
}
function* callResourcesSubmit(action) {
    yield put(startSubmit('AddResources'));
    let error = {};
    const result =  yield call(api.addResources, action.values);
    const resp = result.data
    const pageNumber= action.pageNumber

    if ((result.errors && !resp.success)|| (result.errors || !resp.success)) {
        yield put({ type: types.REQUEST_RESOURCES_FAILED, errors: result.error || resp.errormsg});
        error = result.error || resp.errormsg;
        if(resp.errorcode==23000) {
            notify.show("Resource Description already exists!","error", 5000);
        }
        notify.show("Cannot create new Resource!", "error", 5000)
    } else {
        // yield put({type: types.ADD_RESOURCES_SUCCESS, resp, message: result.statusText});
        yield put({type: types.REQUEST_RESOURCES, pageNumber})
        notify.show("Resources created successfully!", "success", 5000)
    }
    yield put(stopSubmit('AddResources', error));
    yield put(reset('AddResources'));
}

//edit form data of RESOURCES
export function* editResourcesSaga() {
    yield takeLatest(types.REQUEST_EDIT_RESOURCES, callEditResource);
}

function* callEditResource (action) {
    yield put(startSubmit('EditResources'));
    let error = {};
    const result =  yield call(api.updateResources, action.values.id, action.values);
    const resp = result.data;
    const pageNumber= action.pageNumber
    
    if (result.errors) {
        yield put({ type: types.REQUEST_RESOURCES_FAILED, errors: result.error});
        error = result.error;
        notify.show("Update failed", "error", 5000)
    } else {
        // yield put({type: types.UPDATE_RESOURCES_SUCCESS, resp, message: result.statusText});
        yield put({type: types.REQUEST_RESOURCES, pageNumber})
        notify.show("Updated successfully!", "success", 5000)
    }
    yield put(stopSubmit('EditResources', error));
    yield put(reset('EditResources'));

}

// delete RESOURCES data from table
export function* deleteResourcesSaga() {
    yield takeLatest(types.REQUEST_DELETE_RESOURCES, callDeleteResource)
}

function* callDeleteResource(action) {
    const result = yield call(api.deleteResources, action.resourceId);

    if(result.errors) {
        yield put({ type: types.REQUEST_RESOURCES_FAILED, errors: result.error});
        error = result.error;
        notify.show("Delete failed", "error", 5000)
    } else {
        yield put(resourceAction.deleteResourcesSuccess(action.resourceId));
        notify.show("Deleted successfully!", "error", 5000)
    }
} 

