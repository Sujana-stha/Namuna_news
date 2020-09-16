import * as types from '../actions/action-types';
import _ from 'lodash';

const initialState = {
    users: [],
    fetching: false,
    sending: false,
    activePage: 1,
    itemsCountPerPage: 10,
    totalItemsCount: 1,
    pageRangeDisplayed: 5,
}

const usersReducer =  function(state = initialState, action) {
    switch(action.type) {
        
        // reducer to get paginated users
        case types.REQUEST_USERS: 
            return {...state, fetching: true};
           
        case types.GET_USERS_SUCCESS:
            return Object.assign({}, state, {
                users: action.users.data,
                fetching: false,
                itemsCountPerPage: action.users.per_page,
                totalItemsCount: action.users.total,
                activePage: action.users.current_page,
                sending: false
            })
        
        case types.REQUEST_ADD_USERS:
            return {...state, sending: true}

        case types.REQUEST_EDIT_USERS:
            return {...state, sending: true}

        case types.EDIT_USERS_SUCCESS:
            return {
                ...state, 
                users: state.users.map(user => {
                    if (user.id === action.resp.id) {
                    return action.resp;
                    }
                    return user;
                }),
                sending: false
            };
            
        case types.DELETE_USERS_SUCCESS:
            const newUser = _.filter(state.users, user => user.id !== action.userId);
            return Object.assign({}, state, {
                users: newUser
            });

        default: 
        return state;
    }
}

export default usersReducer;