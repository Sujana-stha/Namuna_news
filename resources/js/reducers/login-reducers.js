import * as types from '../actions/action-types';

const initialState = {
    request: false,
    isAuthenticated: false,
}

const loginReducer = function (state = initialState, action) {
    switch(action.type) {
        case types.REQUEST_LOGIN:
            return {
                ...state,
                requesting: true,
                isAuthenticated: false
            }
        case types.LOGIN_SUCCESS:
            return {
                ...state,
                requesting: false,
                isAuthenticated: true,
            }
        default:
        return state;
    }
}

export default loginReducer;