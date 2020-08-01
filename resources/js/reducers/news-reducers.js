import * as types from '../actions/action-types';
import _ from 'lodash';

const initialState = {
    news: [],
    fetching: false,
    sending: false
}

const newsReducer =  function(state = initialState, action) {
    switch(action.type) {
        
        case types.REQUEST_NEWS: 
            console.log(state);

            return {...state, fetching: true};
           
        case types.GET_NEWS_SUCCESS:
            return Object.assign({}, state, {
                news: action.news.data,
                fetching: false,
                sending: false
            })
        
        case types.REQUEST_ADD_NEWS:
            return {...state, sending: true}

        case types.REQUEST_EDIT_NEWS:
            return {...state, sending: true}

        case types.EDIT_NEWS_SUCCESS:
            return {
                ...state, 
                news: state.news.map(news => {
                    if (news.id === action.resp.id) {
                    return action.resp;
                    }
                    return news;
                }),
                sending: false
            };
        
        case types.DELETE_NEWS_SUCCESS:
            const newNews= _.filter(state.news, news => news.id !== action.newsId);
            return Object.assign({}, state, {
                news: newNews
            });

        default: 
        return state;
    }
}

export default newsReducer;