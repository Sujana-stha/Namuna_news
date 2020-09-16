import {takeLatest, call, put } from 'redux-saga/effects';
import { startSubmit, stopSubmit, reset } from 'redux-form';
import * as types from '../actions/action-types';
import * as api from '../api/users-api';
import * as userAction from '../actions/users-action';
import {notify} from 'react-notify-toast';


//Get USERS data in table
export function* UserWatcher() {
    yield takeLatest(types.REQUEST_USERS, UserSaga)
}
function* UserSaga(action) {
    const response = yield call(api.getUsers, action.pageNumber);
    const users = response.data
    if (response.errors) {
        yield put({ type: types.REQUEST_USERS_FAILED, errors: response.error});
        error = response.errors;
        notify.show("Cannot get all Users", "error", 5000)
    } else {
        yield put({type: types.GET_USERS_SUCCESS, users});
    }
}

// Submit form data of USERS
export function* submitUsersSaga() {
    yield takeLatest(types.REQUEST_ADD_USERS, callUsersSubmit)
}
function* callUsersSubmit(action) {
    yield put(startSubmit('AddUsers'));
    const result =  yield call(api.addUsers, action.values);
    const resp = result.data
    const pageNumber= action.pageNumber
    let error  = {}

    if (result.errors) {
        yield put({ type: types.REQUEST_USERS_FAILED, errors: result.errors});
        if(resp.errorcode==23000) {
            notify.show("User Description already exists!","error", 5000);
        }
        error = result.errors
        notify.show("Cannot create new Users!", "error", 5000)
    } else {
        yield put({type: types.REQUEST_USERS, pageNumber})
        notify.show("Categories created successfully!", "success", 5000)
    }

    yield put(stopSubmit('AddUser', error));
    yield put(reset('AddUser'));
}

//edit form data of USERS
export function* editUsersSaga() {
    yield takeLatest(types.REQUEST_EDIT_USERS, callEditUser);
}

function* callEditUser (action) {
    
    yield put(startSubmit('EditUsers'));
    const result =  yield call(api.updateUsers, action.values.id, action.values);
    const pageNumber= action.pageNumber
    let error = {} 
    
    if (result.errors) {
        yield put({ type: types.REQUEST_USERS_FAILED, errors: result.error});
        notify.show("Update failed", "error", 5000)
        error = result.errors
    
    } else {
        yield put({type: types.REQUEST_USERS, pageNumber})
        notify.show("Updated successfully!", "success", 5000)
    }

    yield put(stopSubmit('EditUsers', error));
    yield put(reset('EditUsers'));

}

// delete USERS data from table
export function* deleteUsersSaga() {
    yield takeLatest(types.REQUEST_DELETE_USERS, callDeleteUser)
}

function* callDeleteUser(action) {
    const result = yield call(api.deleteUsers, action.userId);

    if(result.errors) {
        yield put({ type: types.REQUEST_USERS_FAILED, errors: result.errors});
        error = result.errors;
        notify.show("Delete failed", "error", 5000)
    } else {
        yield put(userAction.deleteUsersSuccess(action.userId));
        notify.show("Deleted successfully!", "error", 5000)
    }
} 

