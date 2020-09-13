import {takeLatest, call, put } from 'redux-saga/effects';
import { startSubmit, stopSubmit, reset } from 'redux-form';
import * as types from '../actions/action-types';
import * as api from '../api/languages-api';
import * as languageAction from '../actions/languages-action';
import {notify} from 'react-notify-toast';


// watcher to call saga function to get all languages
export function* AllLanguagesWatcher() {
    yield takeLatest(types.REQUEST_ALL_LANGUAGE, AllLanguageSaga)
}

function* AllLanguageSaga() {
    const response = yield call(api.getAllLanguages);
    const languages = response.data

    if (response) {
        yield put({type: types.ALL_LANGUAGE, languages});
    } else {
        yield put({ type: types.REQUEST_LANGUAGES_FAILED, errors: response.error});
    }
}

//Get makes data in table
export function* LanguageWatcher() {
    yield takeLatest(types.REQUEST_LANGUAGES, LanguageSaga)
}
function* LanguageSaga(action) {
    const response = yield call(api.getLanguages, action.pageNumber);
    const languages = response

    if (response.errors) {
        yield put({ type: types.REQUEST_LANGUAGES_FAILED, errors: response.error});
        error = response.errors;
        notify.show("Cannot get all languages", "error", 5000)
    } else {
        yield put({type: types.GET_LANGUAGES_SUCCESS, languages});
    }
}

// Submit form data of makes
export function* submitLanguagesSaga() {
    yield takeLatest(types.REQUEST_ADD_LANGUAGES, callLanguagesSubmit)
}
function* callLanguagesSubmit(action) {

    yield put(startSubmit('AddLanguages'));
    const result =  yield call(api.addLanguages, action.values);
    const resp = result.data
    const pageNumber= action.pageNumber

    if ((result.errors && !resp.success)|| (result.errors || !resp.success)) {
        yield put({ type: types.REQUEST_LANGUAGES_FAILED, errors: result.error || resp.errormsg});
        error = result.error || resp.errormsg;
        if(resp.errorcode==23000) {
            notify.show("Languages Description already exists!","error", 5000);
        }
        notify.show("Cannot create new Language!", "error", 5000)
    } else {
        yield put({type: types.REQUEST_LANGUAGES, pageNumber})
        notify.show("Languages created successfully!", "success", 5000)
    }

    yield put(stopSubmit('AddLanguages', error));
    yield put(reset('AddLanguages'));
}

//edit form data of makes
export function* editLanguagesSaga() {
    yield takeLatest(types.REQUEST_EDIT_LANGUAGES, callEditLanguage);
}

function* callEditLanguage (action) {
    yield put(startSubmit('EditLanguages'));
    const result =  yield call(api.updateLanguages, action.values.id, action.values);
    const pageNumber= action.pageNumber

    if (result.errors) {
        yield put({ type: types.REQUEST_LANGUAGES_FAILED, errors: result.error});
        notify.show("Update failed", "error", 5000)
    } else {
        yield put({type: types.REQUEST_LANGUAGES, pageNumber})
        notify.show("Updated successfully!", "success", 5000)
    }

    yield put(stopSubmit('EditLanguages', error));
    yield put(reset('EditLanguages'));

}

// delete makes data from table
export function* deleteLanguagesSaga() {
    yield takeLatest(types.REQUEST_DELETE_LANGUAGES, callDeleteLanguage)
}

function* callDeleteLanguage(action) {
    const result = yield call(api.deleteLanguages, action.languageId);

    if(result.errors) {
        yield put({ type: types.REQUEST_LANGUAGES_FAILED, errors: result.error});
        error = result.error;
        notify.show("Delete failed", "error", 5000)
    } else {
        yield put(languageAction.deleteLanguagesSuccess(action.languageId));
        notify.show("Deleted successfully!", "error", 5000)
    }
} 

