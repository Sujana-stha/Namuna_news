import * as types from '../actions/action-types';
import _ from 'lodash';

const initialState = {
    subscribers: [],
    fetching: false,
    sending: false,
    activePage: 1,
    itemsCountPerPage: 10,
    totalItemsCount: 1,
    pageRangeDisplayed: 5,
}

const subscriberReducer =  function(state = initialState, action) {
    switch(action.type) {
        
        // reducer to get paginated users
        case types.REQUEST_SUBSCRIBERS: 
            return {...state, fetching: true};
           
        case types.GET_SUBSCRIBERS_SUCCESS:
            return Object.assign({}, state, {
                subscribers: action.subscribers.data.data,
                fetching: false,
                itemsCountPerPage: action.subscribers.data.per_page,
                totalItemsCount: action.subscribers.data.total,
                activePage: action.subscribers.data.current_page,
                sending: false
            })
           
        case types.DELETE_SUBSCRIBERS_SUCCESS:
            const newSubscriber = _.filter(state.subscribers, subscribe => subscribe.id !== action.subscribeId);
            return Object.assign({}, state, {
                subscribers: newSubscriber
            });

        default: 
        return state;
    }
}

export default subscriberReducer;