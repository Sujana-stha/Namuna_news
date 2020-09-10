import * as types from './action-types';

// REQUEST LOGIN
export function loginRequest(data) {
    return {
        type: types.REQUEST_LOGIN,
        data
    }
}

// LOGIN SUCCESS
export function loginSuccess(data) {
    return {
        type: types.LOGIN_SUCCESS,
        data
    }
}

// REQUEST LOGOUT
export function logoutRequest(){
    return {
        type: types.LOGOUT_REQUEST
    }
}

//LOGOUT SUCCESS
export function logout() {
    return {
        type: types.LOGOUT_SUCCESS
    }
}