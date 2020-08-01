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