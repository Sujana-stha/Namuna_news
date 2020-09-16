import * as types from './action-types';


//GET LIST OF CATEGORIES ACTION
export function requestUsers(pageNumber) {
    return {
        type: types.REQUEST_USERS,
        pageNumber
        
    }
}

export function getUsersSuccess(users) {
    return {
        type: types.GET_USERS_SUCCESS,
        users
    }
}

// CATEGORIES FAILED ACTION
export function requestUsersFailed() {
    return {
        type: types.REQUEST_USERS_FAILED
    }
}

// ADD NEW CATEGORIES ACTION
export function requestAddUsers(values, pageNumber) {
    return {
        type: types.REQUEST_ADD_USERS,
        values, pageNumber
    }
}

export function addUsersSuccess(values, message) {
    return {
        type: types.ADD_USERS_SUCCESS,
        values,
        message
    }
}

//EDIT CATEGORIES ACTION
export function requestUpdateUsers( values, pageNumber) {
    return {
        type: types.REQUEST_EDIT_USERS,
        values, pageNumber
    }
}

export function updateUsersSuccess(userId, values, message) {
    return {
        type: types.EDIT_USERS_SUCCESS,
        values, userId, message
    }
}

//DELETE CATEGORIES ACTION ACTION
export function requestDeleteUsers(userId) {
    return {
        type: types.REQUEST_DELETE_USERS,
        userId
    }
}

export function deleteUsersSuccess(userId, message) {
    return {
        type: types.DELETE_USERS_SUCCESS,
        userId, message
    }
}

