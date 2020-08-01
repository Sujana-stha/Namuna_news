import {takeLatest, call, put} from 'redux-saga/effects';
import {startSubmit, stopSubmit, reset} from 'redux-form';
import {push} from 'connected-react-router';
import * as types from '../actions/action-types';
import * as api from '../api/login-api';

// LOGIN REQUEST
export function* loginWatcher() {
    yield takeLatest(types.REQUEST_LOGIN, loginFlow)
}

function* loginFlow(action) {
    yield put(startSubmit('LoginForm'))
    console.log(action);
    try {
        const result =  yield call(api.login, action.data)
        console.log('saga',result);
        const resp= result.data;
        if(result.status == 200) {
            window.localStorage.setItem("access_token", resp.access_token);
            window.localStorage.setItem("refresh_token", resp.refresh_token);
            yield put({ type: types.LOGIN_SUCCESS, resp});
            // yield put({type: types.REQUEST_LOGGED_USER});
            yield put(push('/'));
            // notify.show("Login Successfull!", "success", 5000);
        } else if(result.errors) {
            notify.show("Incorrect Email or Password!","error",5000);
        }
    } catch(error) {
        yield put({type: types.LOGIN_ERROR, error})
        // notify.show("Cannot Login!", "error", 5000);
    }
    yield put(stopSubmit('LoginForm')); 
    yield put(reset('LoginForm'));
}