import * as types from '../actions/action-types';
import _ from 'lodash';

const initialState = {
    languages: [],
    fetching: false,
    sending: false
}

const languagesReducer =  function(state = initialState, action) {
    switch(action.type) {
        
        case types.REQUEST_LANGUAGES: 
            console.log(state);

            return {...state, fetching: true};
           
        case types.GET_LANGUAGES_SUCCESS:
            return Object.assign({}, state, {
                languages: action.languages,
                fetching: false,
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