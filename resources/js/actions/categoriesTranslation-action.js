import * as types from './action-types';

//GET LIST OF CATEGORIES
export function requestCategoriesTranslation() {
    return {
        type: types.REQUEST_CATEGORIES_TRANSLATION
        
    }
}

export function getCategoriesTranslationSuccess(categoriesTrans) {
    return {
        type: types.GET_CATEGORIES_TRANSLATION_SUCCESS,
        categoriesTrans
    }
}

export function requestCategoriesTranslationFailed() {
    return {
        type: types.REQUEST_CATEGORIES_TRANSLATION_FAILED
    }
}

// ADD NEW CATEGORIES
export function requestAddCategoriesTranslation(values) {
    return {
        type: types.REQUEST_ADD_CATEGORIES_TRANSLATION,
        values
    }
}

export function addCategoriesTranslationSuccess(values, message) {
    return {
        type: types.ADD_CATEGORIES_TRANSLATION_SUCCESS,
        values,
        message
    }
}

//EDIT CATEGORIES
export function requestUpdateCategoriesTranslation( values) {
    return {
        type: types.REQUEST_EDIT_CATEGORIES_TRANSLATION,
        values
    }
}

export function updateCategoriesTranslationSuccess(categoryTransId, values, message) {
    return {
        type: types.EDIT_CATEGORIES_TRANSLATION_SUCCESS,
        values, categoryTransId, message
    }
}

//DELETE CATEGORIES ACTION
export function requestDeleteCategoriesTranslation(categoryTransId) {
    return {
        type: types.REQUEST_DELETE_CATEGORIES_TRANSLATION,
        categoryTransId
    }
}

export function deleteCategoriesTranslationSuccess(categoryTransId, message) {
    return {
        type: types.DELETE_CATEGORIES_TRANSLATION_SUCCESS,
        categoryTransId, message
    }
}

