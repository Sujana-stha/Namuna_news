import {takeLatest, call, put } from 'redux-saga/effects';
import { startSubmit, stopSubmit, reset } from 'redux-form';
import * as types from '../actions/action-types';
import * as api from '../api/newsTrans-api';
import * as newsTransAction from '../actions/newsTranslation-action';
import {notify} from 'react-notify-toast';
import { push } from 'connected-react-router';

//Get news data in table
export function* NewsTransWatcher() {
    yield takeLatest(types.REQUEST_NEWS_TRANSLATION, NewsTransSaga)
}
function* NewsTransSaga(action) {
    console.log('aaa', action);
    const response = yield call(api.getNewsTrans, action.pageNumber);
    console.log('cat', response)
    const newsTrans = response
    if (response.errors) {
        yield put({ type: types.REQUEST_NEWS_TRANSLATION_FAILED, errors: response.error});
        error = response.errors;
        notify.show("Cannot get all news Translation", "error", 5000)
    } else {
        yield put({type: types.GET_NEWS_TRANSLATION_SUCCESS, newsTrans});
    }
}

// Submit form data of NEWS_TRANSLATION
export function* submitNewsTransSaga() {
    yield takeLatest(types.REQUEST_ADD_NEWS_TRANSLATION, callNewsTransSubmit)
}
function* callNewsTransSubmit(action) {
    yield put(startSubmit('AddNewsTrans'));
    let error = {};
    const result =  yield call(api.addNewsTrans, action.values);
    const resp = result.data
    const pageNumber= action.pageNumber

    if ((result.errors && !resp.success)|| (result.errors || !resp.success)) {
        yield put({ type: types.REQUEST_NEWS_TRANSLATION_FAILED, errors: result.error || resp.errormsg});
        error = result.error || resp.errormsg;
        if(resp.errorcode==23000) {
            notify.show("News Translation Description already exists!","error", 5000);
        }
        notify.show("Cannot create new News Translation!", "error", 5000)
    } else {
        // yield put({type: types.ADD_CATEGORIES_SUCCESS, resp, message: result.statusText});
        yield put({type: types.REQUEST_NEWS_TRANSLATION, pageNumber})
        notify.show("News Translation created successfully!", "success", 5000)
        yield put(push('/news-translation'));
    }
    yield put(stopSubmit('AddNewsTrans', error));
    yield put(reset('AddNewsTrans'));
}

//edit form data of NEWS_TRANSLATION
export function* editNewsTransSaga() {
    yield takeLatest(types.REQUEST_EDIT_NEWS_TRANSLATION, callEditNewsTrans);
}

function* callEditNewsTrans (action) {
    yield put(startSubmit('EditNewsTrans'));
    let error = {};
    const result =  yield call(api.updateNewsTrans, action.values.id, action.values);
    const resp = result.data;
    const pageNumber= action.pageNumber
   
    if (result.errors) {
        yield put({ type: types.REQUEST_NEWS_TRANSLATION_FAILED, errors: result.error});
        error = result.error;
        notify.show("Update failed", "error", 5000)
    } else {
        // yield put({type: types.UPDATE_CATEGORIES_SUCCESS, resp, message: result.statusText});
        yield put({type: types.REQUEST_NEWS_TRANSLATION, pageNumber})
        notify.show("Updated successfully!", "success", 5000)
        yield put(push('/news-translation'));
    }
    yield put(stopSubmit('EditNewsTrans', error));
    yield put(reset('EditNewsTrans'));

}

// delete NEWS_TRANSLATION data from table
export function* deleteNewsTransSaga() {
    yield takeLatest(types.REQUEST_DELETE_NEWS_TRANSLATION, callDeleteNewsTrans)
}

function* callDeleteNewsTrans(action) {
    const result = yield call(api.deleteNewsTrans, action.newsTransId);

    if(result.errors) {
        yield put({ type: types.REQUEST_NEWS_TRANSLATION_FAILED, errors: result.error});
        error = result.error;
        notify.show("Delete failed", "error", 5000)
    } else {
        yield put(newsTransAction.deleteNewsTranslationSuccess(action.newsTransId));
        notify.show("Deleted successfully!", "error", 5000)
    }
} 

