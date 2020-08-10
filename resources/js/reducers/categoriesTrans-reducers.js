import * as types from '../actions/action-types';
import _ from 'lodash';

const initialState = {
    categoriesTrans: [],
    fetching: false,
    sending: false
}

const categoriesTransReducer =  function(state = initialState, action) {
    switch(action.type) {
        
        case types.REQUEST_CATEGORIES_TRANSLATION: 
            

            return {...state, fetching: true};
           
        case types.GET_CATEGORIES_TRANSLATION_SUCCESS:
            console.log('reducer',action);
            return Object.assign({}, state, {
                categoriesTrans: action.categoriesTrans,
                fetching: false,
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