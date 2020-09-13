import * as types from '../actions/action-types';
import _ from 'lodash';

const initialState = {
    languages: [],
    fetching: false,
    activePage: 1,
    itemsCountPerPage: 10,
    totalItemsCount: 1,
    pageRangeDisplayed: 5,
    sending: false,
    all_languages: []
}

const languagesReducer =  function(state = initialState, action) {
    switch(action.type) {
        //reducers to get all languages
        case types.ALL_LANGUAGE:
            return Object.assign({}, state, {
                all_languages: action.languages.data
            })

        case types.REQUEST_LANGUAGES: 

            return {...state, fetching: true};
           
        case types.GET_LANGUAGES_SUCCESS:
            return Object.assign({}, state, {
                languages: action.languages.data.data,
                fetching: false,
                itemsCountPerPage: action.languages.data.meta.per_page,
                totalItemsCount: action.languages.data.meta.total,
                activePage: action.languages.data.meta.current_page,
                sending: false
            })
        
        case types.REQUEST_ADD_LANGUAGES:
            return {...state, sending: true}

        case types.REQUEST_EDIT_LANGUAGES:
            return {...state, sending: true}

        case types.EDIT_LANGUAGES_SUCCESS:
            return {
                ...state, 
                languages: state.languages.map(language => {
                    if (language.id === action.resp.id) {
                    return action.resp;
                    }
                    return language;
                }),
                sending: false
            };
        
        case types.DELETE_LANGUAGES_SUCCESS:
            const newLanguage = _.filter(state.languages, language => language.id !== action.languageId);
            return Object.assign({}, state, {
                languages: newLanguage
            });

        default: 
        return state;
    }
}

export default languagesReducer;