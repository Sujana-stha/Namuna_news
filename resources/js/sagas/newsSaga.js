import {takeLatest, call, put } from 'redux-saga/effects';
import { startSubmit, stopSubmit, reset } from 'redux-form';
import * as types from '../actions/action-types';
import * as api from '../api/news-api';
import * as newsAction from '../actions/news-action';
import {notify} from 'react-notify-toast';
import { push } from 'connected-react-router';

// watcher to call saga function to get all languages
export function* AllNewsWatcher() {
    yield takeLatest(types.REQUEST_ALL_NEWS, AllNewsSaga)
}

function* AllNewsSaga() {
    const response = yield call(api.getAllNews);
    const news = response.data

    if (response) {
        yield put({type: types.ALL_NEWS, news});
    } else {
        yield put({ type: types.REQUEST_NEWS_FAILED, errors: response.error});
    }
}


//Get news data in table
export function* NewsWatcher() {
    yield takeLatest(types.REQUEST_NEWS, NewsSaga)
}
function* NewsSaga(action) {
    const response = yield call(api.getNews, action.pageNumber);
    const news = response

    if (response.errors) {
        yield put({ type: types.REQUEST_NEWS_FAILED, errors: response.error});
        error = response.errors;
        notify.show("Cannot get all news", "error", 5000)
    } else {
        yield put({type: types.GET_NEWS_SUCCESS, news});
    }
}

// Submit form data of NEWS
export function* submitNewsSaga() {
    yield takeLatest(types.REQUEST_ADD_NEWS, callNewsSubmit)
}
function* callNewsSubmit(action) {
    yield put(startSubmit('AddNews'));
    
    const result =  yield call(api.addNews, action.values);
    const resp = result.data
    const pageNumber= action.pageNumber

    if ((result.errors && !resp.success)|| (result.errors || !resp.success)) {
        yield put({ type: types.REQUEST_NEWS_FAILED, errors: result.error || resp.errormsg});
        error = result.error || resp.errormsg;
        if(resp.errorcode==23000) {
            notify.show("News Description already exists!","error", 5000);
        }
        notify.show("Cannot create new News!", "error", 5000)
    } else {
        
        yield put({type: types.REQUEST_NEWS, pageNumber})
        notify.show("News created successfully!", "success", 5000);
        yield put(push('/news'));
    }

    yield put(stopSubmit('AddNews', error));
    yield put(reset('AddNews'));
}

//edit form data of NEWS
export function* editNewsSaga() {
    yield takeLatest(types.REQUEST_EDIT_NEWS, callEditNews);
}

function* callEditNews (action) {
    yield put(startSubmit('EditNews'));
    let error = {};
    const result =  yield call(api.updateNews, action.values.id, action.values);
    const pageNumber = action.pageNumber
    
    if (result.errors) {
        yield put({ type: types.REQUEST_NEWS_FAILED, errors: result.error});
        error = result.error;
        notify.show("Update failed", "error", 5000)
    } else {
        
        yield put({type: types.REQUEST_NEWS, pageNumber})
        notify.show("Updated successfully!", "success", 5000)
        yield put(push('/news'));
    }
    yield put(stopSubmit('EditNews', error));
    yield put(reset('EditNews'));

}

// delete NEWS data from table
export function* deleteNewsSaga() {
    yield takeLatest(types.REQUEST_DELETE_NEWS, callDeleteNews)
}

function* callDeleteNews(action) {
    const result = yield call(api.deleteNews, action.newsId);

    if(result.errors) {
        yield put({ type: types.REQUEST_NEWS_FAILED, errors: result.error});
        error = result.error;
        notify.show("Delete failed", "error", 5000)
    } else {
        yield put(newsAction.deleteNewsSuccess(action.newsId));
        notify.show("Deleted successfully!", "error", 5000)
    }
} 

