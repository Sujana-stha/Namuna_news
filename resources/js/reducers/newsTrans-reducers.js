import * as types from '../actions/action-types';
import _ from 'lodash';

const initialState = {
    newsTrans: [],
    fetching: false,
    sending: false
}

const newsTransReducer =  function(state = initialState, action) {
    switch(action.type) {
        
        case types.REQUEST_NEWS_TRANSLATION: 
            console.log(state);

            return {...state, fetching: true};
           
        case types.GET_NEWS_TRANSLATION_SUCCESS:
            return Object.assign({}, state, {
                newsTrans: action.newsTrans.data,
                fetching: false,
                sending: false
            })
        
        case types.REQUEST_ADD_NEWS_TRANSLATION:
            return {...state, sending: true}

        case types.REQUEST_EDIT_NEWS_TRANSLATION:
            return {...state, sending: true}

        case types.EDIT_NEWS_TRANSLATION_SUCCESS:
            return {
                ...state, 
                newsTrans: state.newsTrans.map(newsTrans => {
                    if (newsTrans.id === action.resp.id) {
                    return action.resp;
                    }
                    return newsTrans;
                }),
                sending: false
            };
        
        case types.DELETE_NEWS_TRANSLATION_SUCCESS:
            const newNewsTrans= _.filter(state.newsTrans, newsTrans => newsTrans.id !== action.newsTransId);
            return Object.assign({}, state, {
                newsTrans: newNewsTrans
            });

        default: 
        return state;
    }
}

export default newsTransReducer;