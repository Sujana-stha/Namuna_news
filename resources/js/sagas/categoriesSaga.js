import {takeLatest, call, put } from 'redux-saga/effects';
import { startSubmit, stopSubmit, reset } from 'redux-form';
import * as types from '../actions/action-types';
import * as api from '../api/categories-api';
import * as categoryAction from '../actions/categories-action';
import {notify} from 'react-notify-toast';

// watcher to call saga function to get all categories
export function* AllCategoryWatcher() {
    yield takeLatest(types.REQUEST_ALL_CATEGORIES, AllCategorySaga)
}

function* AllCategorySaga() {
    const response = yield call(api.getAllCategories);
    const categories = response.data
    if (response) {
        yield put({type: types.CATEGORIES_LIST_ALL, categories});
    } else {
        yield put({ type: types.REQUEST_CATEGORIES_FAILED, errors: response.error});
    }
}

//Get CATEGORIES data in table
export function* CategoryWatcher() {
    yield takeLatest(types.REQUEST_CATEGORIES, CategorySaga)
}
function* CategorySaga(action) {
    const response = yield call(api.getCategories, action.pageNumber);
    const categories = response

    if (response.error) {
        yield put({ type: types.REQUEST_CATEGORIES_FAILED, errors: response.error});
        error = response.errors;
        notify.show("Cannot get all categories", "error", 5000)
    } else {
        yield put({type: types.GET_CATEGORIES_SUCCESS, categories});
    }
}

// Submit form data of CATEGORIES
export function* submitCategoriesSaga() {
    yield takeLatest(types.REQUEST_ADD_CATEGORIES, callCategoriesSubmit)
}
function* callCategoriesSubmit(action) {
    yield put(startSubmit('AddCategories'));
    const result =  yield call(api.addCategories, action.values);
    const resp = result.data
    const pageNumber= action.pageNumber
    
    if (result.error) {
        yield put({ type: types.REQUEST_CATEGORIES_FAILED, errors: result.error});
        if(resp.errorcode==23000) {
            notify.show("Category Description already exists!","error", 5000);
        }
        notify.show("Cannot create new category!", "error", 5000)
    } else {
        yield put({type: types.REQUEST_CATEGORIES, pageNumber})
        notify.show("Categories created successfully!", "success", 5000)
    }

    yield put(stopSubmit('AddCategories', error));
    yield put(reset('AddCategories'));
}

//edit form data of CATEGORIES
export function* editCategoriesSaga() {
    yield takeLatest(types.REQUEST_EDIT_CATEGORIES, callEditCategory);
}

function* callEditCategory (action) {
    
    yield put(startSubmit('EditCategories'));
    const result =  yield call(api.updateCategories, action.values.id, action.values);
    const pageNumber= action.pageNumber
    
    if (result.error) {
        yield put({ type: types.REQUEST_CATEGORIES_FAILED, errors: result.error});
        notify.show("Update failed", "error", 5000)
    
    } else {
        yield put({type: types.REQUEST_CATEGORIES, pageNumber})
        notify.show("Updated successfully!", "success", 5000)
    }

    yield put(stopSubmit('EditCategories', error));
    yield put(reset('EditCategories'));

}

// delete CATEGORIES data from table
export function* deleteCategoriesSaga() {
    yield takeLatest(types.REQUEST_DELETE_CATEGORIES, callDeleteCategory)
}

function* callDeleteCategory(action) {
    const result = yield call(api.deleteCategories, action.categoryId);

    if(result.error) {
        yield put({ type: types.REQUEST_CATEGORIES_FAILED, errors: result.error});
        error = result.error;
        notify.show("Delete failed", "error", 5000)
    } else {
        yield put(categoryAction.deleteCategoriesSuccess(action.categoryId));
        notify.show("Deleted successfully!", "error", 5000)
    }
} 

