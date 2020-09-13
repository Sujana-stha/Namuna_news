import * as types from '../actions/action-types';
import _ from 'lodash';

const initialState = {
    categories: [],
    fetching: false,
    sending: false,
    activePage: 1,
    itemsCountPerPage: 10,
    totalItemsCount: 1,
    pageRangeDisplayed: 5,
    all_categories: []
}

const categoriesReducer =  function(state = initialState, action) {
    switch(action.type) {
        case types.CATEGORIES_LIST_ALL:
            
            return Object.assign({}, state, {
                all_categories: action.categories.data,
                
            })

        // reducer to get paginated categories
        case types.REQUEST_CATEGORIES: 
            return {...state, fetching: true};
           
        case types.GET_CATEGORIES_SUCCESS:
            return Object.assign({}, state, {
                categories: action.categories.data.data,
                fetching: false,
                itemsCountPerPage: action.categories.data.meta.per_page,
                totalItemsCount: action.categories.data.meta.total,
                activePage: action.categories.data.meta.current_page,
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