import * as types from '../actions/action-types';
import _ from 'lodash';

const initialState = {
    news: [],
    fetching: false,
    sending: false,
    activePage: 1,
    itemsCountPerPage: 10,
    totalItemsCount: 1,
    pageRangeDisplayed: 5,
    all_news: []
}

const newsReducer =  function(state = initialState, action) {
    switch(action.type) {

        case types.ALL_NEWS:
            return Object.assign({}, state, {
                all_news: action.news.data
            })

        
        case types.REQUEST_NEWS: 

            return {...state, fetching: true};
           
        case types.GET_NEWS_SUCCESS:
            return Object.assign({}, state, {
                news: action.news.data.data,
                fetching: false,
                itemsCountPerPage: action.news.data.meta.per_page,
                totalItemsCount: action.news.data.meta.total,
                activePage: action.news.data.meta.current_page,
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