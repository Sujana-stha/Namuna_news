import {takeLatest, call, put } from 'redux-saga/effects';
import { startSubmit, stopSubmit, reset } from 'redux-form';
import * as types from '../actions/action-types';
import * as api from '../api/provinces-api';
import * as provinceAction from '../actions/province-action';
import {notify} from 'react-notify-toast';


//Get PROVINCES data in table
export function* ProvincesWatcher() {
    yield takeLatest(types.REQUEST_PROVINCES, ProvincesSaga)
}
function* ProvincesSaga(action) {
    
    const response = yield call(api.getProvinces);
    console.log('cat', response)
    const provinces = response
    if (response.errors) {
        yield put({ type: types.REQUEST_PROVINCES_FAILED, errors: response.error});
        error = response.errors;
        notify.show("Cannot get all provinces", "error", 5000)
    } else {
        yield put({type: types.GET_PROVINCES_SUCCESS, provinces});
    }
}

// Submit form data of PROVINCES
export function* submitProvincesSaga() {
    yield takeLatest(types.REQUEST_ADD_PROVINCES, callProvincesSubmit)
}
function* callProvincesSubmit(action) {
    yield put(startSubmit('AddProvinces'));
    let error = {};
    const result =  yield call(api.addProvinces, action.values);
    const resp = result.data
    const pageNumber= action.pageNumber

    if ((result.errors && !resp.success)|| (result.errors || !resp.success)) {
        yield put({ type: types.REQUEST_PROVINCES_FAILED, errors: result.error || resp.errormsg});
        error = result.error || resp.errormsg;
        if(resp.errorcode==23000) {
            notify.show("Province Description already exists!","error", 5000);
        }
        notify.show("Cannot create new Province!", "error", 5000)
    } else {
        // yield put({type: types.ADD_PROVINCES_SUCCESS, resp, message: result.statusText});
        yield put({type: types.REQUEST_PROVINCES, pageNumber})
        notify.show("Provinces created successfully!", "success", 5000)
    }
    yield put(stopSubmit('AddProvinces', error));
    yield put(reset('AddProvinces'));
}

//edit form data of PROVINCES
export function* editProvincesSaga() {
    yield takeLatest(types.REQUEST_EDIT_PROVINCES, callEditProvince);
}

function* callEditProvince (action) {
    yield put(startSubmit('EditProvinces'));
    let error = {};
    const result =  yield call(api.updateProvinces, action.values.id, action.values);
    const resp = result.data;
    const pageNumber= action.pageNumber
    
    if (result.errors) {
        yield put({ type: types.REQUEST_PROVINCES_FAILED, errors: result.error});
        error = result.error;
        notify.show("Update failed", "error", 5000)
    } else {
        // yield put({type: types.UPDATE_PROVINCES_SUCCESS, resp, message: result.statusText});
        yield put({type: types.REQUEST_PROVINCES, pageNumber})
        notify.show("Updated successfully!", "success", 5000)
    }
    yield put(stopSubmit('EditProvinces', error));
    yield put(reset('EditProvinces'));

}

// delete PROVINCES data from table
export function* deleteProvincesSaga() {
    yield takeLatest(types.REQUEST_DELETE_PROVINCES, callDeleteProvince)
}

function* callDeleteProvince(action) {
    const result = yield call(api.deleteProvinces, action.provinceId);

    if(result.errors) {
        yield put({ type: types.REQUEST_PROVINCES_FAILED, errors: result.error});
        error = result.error;
        notify.show("Delete failed", "error", 5000)
    } else {
        yield put(provinceAction.deleteProvincesSuccess(action.provinceId));
        notify.show("Deleted successfully!", "error", 5000)
    }
} 

