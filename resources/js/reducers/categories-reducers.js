import * as types from '../actions/action-types';
import _ from 'lodash';

const initialState = {
    categories: [],
    fetching: false,
    sending: false
}

const categoriesReducer =  function(state = initialState, action) {
    switch(action.type) {
        
        case types.REQUEST_CATEGORIES: 
            

            return {...state, fetching: true};
           
        case types.GET_CATEGORIES_SUCCESS:
            console.log('reducer',state);
            return Object.assign({}, state, {
                categories: action.categories.data,
                fetching: false,
                sending: false
            })
        
        case types.REQUEST_ADD_CATEGORIES:
            return {...state, sending: true}

        case types.REQUEST_EDIT_CATEGORIES:
            return {...state, sending: true}

        case types.EDIT_CATEGORIES_SUCCESS:
            return {
                ...state, 
                categories: state.categories.map(category => {
                    if (category.id === action.resp.id) {
                    return action.resp;
                    }
                    return category;
                }),
                sending: false
            };
            case types.REQUEST_CHANGE_CATEGORIES_STATUS:
                return {...state, fetching: true}
            case types.CHANGE_CATEGORIES_STATUS_SUCCESS:
                return {
                    ...state,
                    categories: state.categories.map(category => {
                        if(category.id === action.resp.id) {
                            return action.resp;
                        }
                        return category;
                    }),
                    fetching: false
                }
        case types.DELETE_CATEGORIES_SUCCESS:
            const newCategory = _.filter(state.categories, category => category.id !== action.categoryId);
            return Object.assign({}, state, {
                categories: newCategory
            });

        default: 
        return state;
    }
}

export default categoriesReducer;