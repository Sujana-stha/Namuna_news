import * as types from '../actions/action-types';
import _ from 'lodash';

const initialState = {
    provincesTrans: [],
    fetching: false,
    activePage: 1,
    itemsCountPerPage: 10,
    totalItemsCount: 1,
    pageRangeDisplayed: 5,
    sending: false
}

const provincesTransReducer =  function(state = initialState, action) {
    switch(action.type) {
        
        case types.REQUEST_PROVINCE_TRANSLATION: 

            return {...state, fetching: true};
           
        case types.GET_PROVINCE_TRANSLATION_SUCCESS:
            return Object.assign({}, state, {
                provincesTrans: action.provincesTrans.data.data,
                fetching: false,
                itemsCountPerPage: action.provincesTrans.data.meta.per_page,
                totalItemsCount: action.provincesTrans.data.meta.total,
                activePage: action.provincesTrans.data.meta.current_page,
                sending: false
            })
        
        case types.REQUEST_ADD_PROVINCE_TRANSLATION:
            return {...state, sending: true}

        case types.REQUEST_EDIT_PROVINCE_TRANSLATION:
            return {...state, sending: true}

        case types.EDIT_PROVINCE_TRANSLATION_SUCCESS:
            return {
                ...state, 
                provincesTrans: state.provincesTrans.map(provinceTrans => {
                    if (provinceTrans.id === action.resp.id) {
                    return action.resp;
                    }
                    return provinceTrans;
                }),
                sending: false
            };
        
            case types.DELETE_PROVINCE_TRANSLATION_SUCCESS:
                console.log(action)
                const newProvincesTrans = _.filter(state.provincesTrans, provinceTrans => provinceTrans.id !== action.provinceTransId);
                return Object.assign({}, state, {
                    provincesTrans: newProvincesTrans
                });
    
            default: 
            return state;
    }
}

export default provincesTransReducer;