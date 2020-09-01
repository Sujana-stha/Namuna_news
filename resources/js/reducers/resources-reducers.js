import * as types from '../actions/action-types';
import _ from 'lodash';

const initialState = {
    resources: [],
    fetching: false,
    activePage: 1,
    itemsCountPerPage: 10,
    totalItemsCount: 1,
    pageRangeDisplayed: 5,
    sending: false
}

const resourcesReducer =  function(state = initialState, action) {
    switch(action.type) {
        
        case types.REQUEST_RESOURCES: 
            console.log(state);

            return {...state, fetching: true};
           
        case types.GET_RESOURCES_SUCCESS:
            return Object.assign({}, state, {
                resources: action.resources.data.data,
                fetching: false,
                itemsCountPerPage: action.resources.data.meta.per_page,
                totalItemsCount: action.resources.data.meta.total,
                activePage: action.resources.data.meta.current_page,
                sending: false
            })
        
        case types.REQUEST_ADD_RESOURCES:
            return {...state, sending: true}

        case types.REQUEST_EDIT_RESOURCES:
            return {...state, sending: true}

        case types.EDIT_RESOURCES_SUCCESS:
            return {
                ...state, 
                resources: state.resources.map(resource => {
                    if (resource.id === action.resp.id) {
                    return action.resp;
                    }
                    return resource;
                }),
                sending: false
            };
        
        case types.DELETE_RESOURCES_SUCCESS:
            const newResource = _.filter(state.resources, resource => resource.id !== action.resourceId);
            return Object.assign({}, state, {
                resources: newResource
            });

        default: 
        return state;
    }
}

export default resourcesReducer;