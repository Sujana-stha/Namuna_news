import {takeLatest, call, put } from 'redux-saga/effects';
import { startSubmit, stopSubmit, reset } from 'redux-form';
import * as types from '../actions/action-types';
import * as api from '../api/categoriesTrans-api';
import * as categoryTransAction from '../actions/categoriesTranslation-action';
import {notify} from 'react-notify-toast';


//Get CATEGORIES_TRANSLATION data in table
export function* CategoryTransWatcher() {
    yield takeLatest(types.REQUEST_CATEGORIES_TRANSLATION, CategoryTransSaga)
}
function* CategoryTransSaga(action) {
    const response = yield call(api.getCategoriesTrans, action.pageNumber);
    console.log('cat', response)
    const categoriesTrans = response
    if (response.errors) {
        yield put({ type: types.REQUEST_CATEGORIES_TRANSLATION_FAILED, errors: response.error});
        error = response.errors;
        notify.show("Cannot get all categories Translation", "error", 5000)
    } else {
        yield put({type: types.GET_CATEGORIES_TRANSLATION_SUCCESS, categoriesTrans});
    }
}

// Submit form data of CATEGORIES_TRANSLATION
export function* submitCategoriesTransSaga() {
    yield takeLatest(types.REQUEST_ADD_CATEGORIES_TRANSLATION, callCategoriesTransSubmit)
}
function* callCategoriesTransSubmit(action) {
    yield put(startSubmit('AddCategoriesTrans'));
    let error = {};
    const result =  yield call(api.addCategoriesTrans, action.values);
    const resp = result.data
    console.log('cccs', resp)
    const pageNumber= action.pageNumber
    if (result.errors) {
        yield put({ type: types.REQUEST_CATEGORIES_TRANSLATION_FAILED, errors: result.error});
        error = result.error;
        if(resp.errorcode==23000) {
            notify.show("Category Translation Description already exists!","error", 5000);
        }
        notify.show("Cannot create new category Translation!", "error", 5000)
    } else {
        // yield put({type: types.ADD_CATEGORIES_TRANSLATION_SUCCESS, resp, message: result.statusText});
        yield put({type: types.REQUEST_CATEGORIES_TRANSLATION, pageNumber})
        notify.show("Categories Translation created successfully!", "success", 5000)
    }
    yield put(stopSubmit('AddCategoriesTrans', error));
    yield put(reset('AddCategoriesTrans'));
}

//edit form data of CATEGORIES_TRANSLATION
export function* editCategoriesTransSaga() {
    yield takeLatest(types.REQUEST_EDIT_CATEGORIES_TRANSLATION, callEditCategoryTrans);
}

function* callEditCategoryTrans (action) {
    yield put(startSubmit('EditCategoriesTrans'));
    console.log(action);
    let error = {};
    const result =  yield call(api.updateCategoriesTrans, action.values.id, action.values);
    const resp = result.data;
    const pageNumber= action.pageNumber
    if (result.errors) {
        yield put({ type: types.REQUEST_CATEGORIES_TRANSLATION_FAILED, errors: result.error});
        error = result.error;
        notify.show("Update failed", "error", 5000)
    } else {
        // yield put({type: types.UPDATE_CATEGORIES_TRANSLATION_SUCCESS, resp, message: result.statusText});
        yield put({type: types.REQUEST_CATEGORIES_TRANSLATION, pageNumber})
        notify.show("Updated successfully!", "success", 5000)
    }
    yield put(stopSubmit('EditCategoriesTrans', error));
    yield put(reset('EditCategoriesTrans'));

}



// delete CATEGORIES_TRANSLATION data from table
export function* deleteCategoriesTransSaga() {
    yield takeLatest(types.REQUEST_DELETE_CATEGORIES_TRANSLATION, callDeleteCategoryTrans)
}

function* callDeleteCategoryTrans(action) {
    const result = yield call(api.deleteCategoriesTrans, action.categoryTransId);

    if(result.errors) {
        yield put({ type: types.REQUEST_CATEGORIES_TRANSLATION_FAILED, errors: result.error});
        error = result.error;
        notify.show("Delete failed", "error", 5000)
    } else {
        yield put(categoryTransAction.deleteCategoriesTranslationSuccess(action.categoryTransId));
        notify.show("Deleted successfully!", "error", 5000)
    }
} 

