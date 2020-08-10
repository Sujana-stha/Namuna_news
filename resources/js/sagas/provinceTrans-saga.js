import {takeLatest, call, put } from 'redux-saga/effects';
import { startSubmit, stopSubmit, reset } from 'redux-form';
import * as types from '../actions/action-types';
import * as api from '../api/provinceTrans-api';
import * as provinceTransAction from '../actions/provinceTranslation-action';
import {notify} from 'react-notify-toast';


//Get PROVINCES_TRANSLATION data in table
export function* ProvincesTransWatcher() {
    yield takeLatest(types.REQUEST_PROVINCE_TRANSLATION, ProvincesTransSaga)
}
function* ProvincesTransSaga(action) {
    console.log('sagaProvince', action);
    const response = yield call(api.getProvincesTrans);
    console.log('catPror', response)
    const provincesTrans = response.data
    if (response.errors) {
        yield put({ type: types.REQUEST_PROVINCE_TRANSLATION_FAILED, errors: response.error});
        error = response.errors;
        notify.show("Cannot get all provinces Translation", "error", 5000)
    } else {
        yield put({type: types.GET_PROVINCE_TRANSLATION_SUCCESS, provincesTrans});
    }
}

// Submit form data of PROVINCES_TRANSLATION
export function* submitProvincesTransSaga() {
    yield takeLatest(types.REQUEST_ADD_PROVINCE_TRANSLATION, callProvincesTransSubmit)
}
function* callProvincesTransSubmit(action) {
    yield put(startSubmit('AddProvincesTrans'));
    let error = {};
    const result =  yield call(api.addProvincesTrans, action.values);
    const resp = result.data

    if ((result.errors && !resp.success)|| (result.errors || !resp.success)) {
        yield put({ type: types.REQUEST_PROVINCE_TRANSLATION_FAILED, errors: result.error || resp.errormsg});
        error = result.error || resp.errormsg;
        if(resp.errorcode==23000) {
            notify.show("Province Translation Description already exists!","error", 5000);
        }
        notify.show("Cannot create new Province Translation!", "error", 5000)
    } else {
        // yield put({type: types.ADD_PROVINCES_TRANSLATION_SUCCESS, resp, message: result.statusText});
        yield put({type: types.REQUEST_PROVINCE_TRANSLATION})
        notify.show("Provinces Translation created successfully!", "success", 5000)
    }
    yield put(stopSubmit('AddProvincesTrans', error));
    yield put(reset('AddProvincesTrans'));
}

//edit form data of PROVINCES_TRANSLATION
export function* editProvincesTransSaga() {
    yield takeLatest(types.REQUEST_EDIT_PROVINCE_TRANSLATION, callEditProvinceTrans);
}

function* callEditProvinceTrans (action) {
    yield put(startSubmit('EditProvincesTrans'));
    let error = {};
    const result =  yield call(api.updateProvincesTrans, action.values.id, action.values);
    const resp = result.data;
    
    if (result.errors) {
        yield put({ type: types.REQUEST_PROVINCE_TRANSLATION_FAILED, errors: result.error});
        error = result.error;
        notify.show("Update failed", "error", 5000)
    } else {
        // yield put({type: types.UPDATE_PROVINCES_TRANSLATION_SUCCESS, resp, message: result.statusText});
        yield put({type: types.REQUEST_PROVINCE_TRANSLATION})
        notify.show("Updated successfully!", "success", 5000)
    }
    yield put(stopSubmit('EditProvincesTrans', error));
    yield put(reset('EditProvincesTrans'));

}

// delete PROVINCES_TRANSLATION data from table
export function* deleteProvincesTransSaga() {
    yield takeLatest(types.REQUEST_DELETE_PROVINCE_TRANSLATION, callDeleteProvinceTrans)
}

function* callDeleteProvinceTrans(action) {
    console.log('prdel', action)
    const result = yield call(api.deleteProvincesTrans, action.procinceTransId);

    if(result.errors) {
        yield put({ type: types.REQUEST_PROVINCE_TRANSLATION_FAILED, errors: result.error});
        error = result.error;
        notify.show("Delete failed", "error", 5000)
    } else {
        yield put(provinceTransAction.deleteProvincesTranslationSuccess(action.provinceTransId));
        notify.show("Deleted successfully!", "error", 5000)
    }
} 

