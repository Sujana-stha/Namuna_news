import * as types from './action-types';

//GET LIST OF PROVINCES_TRANSLATION
export function requestProvincesTranslation(pageNumber) {
    return {
        type: types.REQUEST_PROVINCE_TRANSLATION,
        pageNumber
    }
}

export function getProvincesTranslationSuccess(procincesTrans) {
    return {
        type: types.GET_PROVINCE_TRANSLATION_SUCCESS,
        procincesTrans
    }
}

export function requestProvincesTranslationFailed() {
    return {
        type: types.REQUEST_PROVINCE_TRANSLATION_FAILED
    }
}

// ADD NEW PROVINCES_TRANSLATION
export function requestAddProvincesTranslation(values, pageNumber) {
    return {
        type: types.REQUEST_ADD_PROVINCE_TRANSLATION,
        values, pageNumber
    }
}

export function addProvincesTranslationSuccess(values, message) {
    return {
        type: types.ADD_PROVINCE_TRANSLATION_SUCCESS,
        values,
        message
    }
}

//EDIT PROVINCES_TRANSLATION
export function requestUpdateProvincesTranslation( values, pageNumber) {
    return {
        type: types.REQUEST_EDIT_PROVINCE_TRANSLATION,
        values, pageNumber
    }
}

export function updateProvincesTranslationSuccess(procinceTransId, values, message) {
    return {
        type: types.EDIT_PROVINCE_TRANSLATION_SUCCESS,
        values, procinceTransId, message
    }
}

//DELETE PROVINCES_TRANSLATION ACTION
export function requestDeleteProvincesTranslation(procinceTransId) {
    return {
        type: types.REQUEST_DELETE_PROVINCE_TRANSLATION,
        procinceTransId
    }
}

export function deleteProvincesTranslationSuccess(procinceTransId, message) {
    return {
        type: types.DELETE_PROVINCE_TRANSLATION_SUCCESS,
        procinceTransId, message
    }
}
