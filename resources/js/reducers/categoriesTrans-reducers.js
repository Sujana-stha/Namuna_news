import * as types from '../actions/action-types';
import _ from 'lodash';

const initialState = {
    categoriesTrans: [],
    fetching: false,
    activePage: 1,
    itemsCountPerPage: 10,
    totalItemsCount: 1,
    pageRangeDisplayed: 5,
    sending: false
}

const categoriesTransReducer =  function(state = initialState, action) {
    switch(action.type) {
        
        case types.REQUEST_CATEGORIES_TRANSLATION: 
            

            return {...state, fetching: true};
           
        case types.GET_CATEGORIES_TRANSLATION_SUCCESS:
            return Object.assign({}, state, {
                categoriesTrans: action.categoriesTrans.data.data,
                fetching: false,
                itemsCountPerPage: action.categoriesTrans.data.meta.per_page,
                totalItemsCount: action.categoriesTrans.data.meta.total,
                activePage: action.categoriesTrans.data.meta.current_page,
                sending: false
            })
        
        case types.REQUEST_ADD_CATEGORIES_TRANSLATION:
            return {...state, sending: true}

        case types.REQUEST_EDIT_CATEGORIES_TRANSLATION:
            return {...state, sending: true}

        case types.EDIT_CATEGORIES_TRANSLATION_SUCCESS:
            return {
                ...state, 
                categoriesTrans: state.categoriesTrans.map(categoryTrans => {
                    if (categoryTrans.id === action.resp.id) {
                    return action.resp;
                    }
                    return categoryTrans;
                }),
                sending: false
            };
            
        case types.DELETE_CATEGORIES_TRANSLATION_SUCCESS:
            const newCategoryTrans = _.filter(state.categoriesTrans, categoryTrans => categoryTrans.id !== action.categoryTransId);
            return Object.assign({}, state, {
                categoriesTrans: newCategoryTrans
            });

        default: 
        return state;
    }
}

export default categoriesTransReducer;