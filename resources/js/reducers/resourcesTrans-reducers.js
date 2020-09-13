import * as types from '../actions/action-types';
import _ from 'lodash';

const initialState = {
    resourcesTrans: [],
    fetching: false,
    activePage: 1,
    itemsCountPerPage: 10,
    totalItemsCount: 1,
    pageRangeDisplayed: 5,
    sending: false
}

const resourcesTransReducer =  function(state = initialState, action) {
    switch(action.type) {
        
        case types.REQUEST_RESOURCE_TRANSLATION: 

            return {...state, fetching: true};
           
        case types.GET_RESOURCE_TRANSLATION_SUCCESS:
            return Object.assign({}, state, {
                resourcesTrans: action.resourcesTrans.data.data,
                fetching: false,
                itemsCountPerPage: action.resourcesTrans.data.meta.per_page,
                totalItemsCount: action.resourcesTrans.data.meta.total,
                activePage: action.resourcesTrans.data.meta.current_page,
                sending: false
            })
        
        case types.REQUEST_ADD_RESOURCE_TRANSLATION:
            return {...state, sending: true}

        case types.REQUEST_EDIT_RESOURCE_TRANSLATION:
            return {...state, sending: true}

        case types.EDIT_RESOURCE_TRANSLATION_SUCCESS:
            return {
                ...state, 
                resourcesTrans: state.resourcesTrans.map(resourceTrans => {
                    if (resourceTrans.id === action.resp.id) {
                    return action.resp;
                    }
                    return resourceTrans;
                }),
                sending: false
            };
        
        case types.DELETE_RESOURCE_TRANSLATION_SUCCESS:
            const newResourceTrans = _.filter(state.resourcesTrans, resourceTrans => resourceTrans.id !== action.resourceTransId);
            return Object.assign({}, state, {
                resourcesTrans: newResourceTrans
            });

        default: 
        return state;
    }
}

export default resourcesTransReducer;