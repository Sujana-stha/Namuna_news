import * as types from '../actions/action-types';
import _ from 'lodash';

const initialState = {
    provinces: [],
    fetching: false,
    activePage: 1,
    itemsCountPerPage: 10,
    totalItemsCount: 1,
    pageRangeDisplayed: 5,
    sending: false
}

const provincesReducer =  function(state = initialState, action) {
    switch(action.type) {
        
        case types.REQUEST_PROVINCES: 
            console.log(state);

            return {...state, fetching: true};
           
        case types.GET_PROVINCES_SUCCESS:
            return Object.assign({}, state, {
                provinces: action.provinces.data.data,
                fetching: false,
                itemsCountPerPage: action.provinces.data.meta.per_page,
                totalItemsCount: action.provinces.data.meta.total,
                activePage: action.provinces.data.meta.current_page,
                sending: false
            })
        
        case types.REQUEST_ADD_PROVINCES:
            return {...state, sending: true}

        case types.REQUEST_EDIT_PROVINCES:
            return {...state, sending: true}

        case types.EDIT_PROVINCES_SUCCESS:
            return {
                ...state, 
                provinces: state.provinces.map(province => {
                    if (province.id === action.resp.id) {
                    return action.resp;
                    }
                    return province;
                }),
                sending: false
            };
        
        case types.DELETE_PROVINCES_SUCCESS:
            const newProvince = _.filter(state.provinces, province => province.id !== action.provinceId);
            return Object.assign({}, state, {
                provinces: newProvince
            });

        default: 
        return state;
    }
}

export default provincesReducer;