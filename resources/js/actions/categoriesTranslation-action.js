import * as types from './action-types';

//GET LIST OF TRANSLATED CATEGORIES ACTION
export function requestCategoriesTranslation(pageNumber) {
    return {
        type: types.REQUEST_CATEGORIES_TRANSLATION,
        pageNumber
    }
}

export function getCategoriesTranslationSuccess(categoriesTrans) {
    return {
        type: types.GET_CATEGORIES_TRANSLATION_SUCCESS,
        categoriesTrans
    }
}

// FAILED ACTION FOR TRANSLATED CATEGORIES 
export function requestCategoriesTranslationFailed() {
    return {
        type: types.REQUEST_CATEGORIES_TRANSLATION_FAILED
    }
}

// ADD NEW TRANSLATED CATEGORIES
export function requestAddCategoriesTranslation(values, pageNumber) {
    return {
        type: types.REQUEST_ADD_CATEGORIES_TRANSLATION,
        values, pageNumber
    }
}

export function addCategoriesTranslationSuccess(values, message) {
    return {
        type: types.ADD_CATEGORIES_TRANSLATION_SUCCESS,
        values,
        message
    }
}

//EDIT TRANSLATED CATEGORIES
export function requestUpdateCategoriesTranslation( values, pageNumber) {
    return {
        type: types.REQUEST_EDIT_CATEGORIES_TRANSLATION,
        values, pageNumber
    }
}

export function updateCategoriesTranslationSuccess(categoryTransId, values, message) {
    return {
        type: types.EDIT_CATEGORIES_TRANSLATION_SUCCESS,
        values, categoryTransId, message
    }
}

//DELETE TRANSLATED CATEGORIES ACTION
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

