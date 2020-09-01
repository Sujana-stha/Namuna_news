import * as types from './action-types';

//GET LIST OF CATEGORIES
export function requestLanguages(pageNumber) {
    return {
        type: types.REQUEST_LANGUAGES,
        pageNumber
    }
}

export function getLanguagesSuccess(languages) {
    return {
        type: types.GET_LANGUAGES_SUCCESS,
        languages
    }
}

export function requestLanguagesFailed() {
    return {
        type: types.REQUEST_LANGUAGES_FAILED
    }
}

// ADD NEW CATEGORIES
export function requestAddLanguages(values, pageNumber) {
    return {
        type: types.REQUEST_ADD_LANGUAGES,
        values, pageNumber
    }
}

export function addLanguagesSuccess(values, message) {
    return {
        type: types.ADD_LANGUAGES_SUCCESS,
        values,
        message
    }
}

//EDIT CATEGORIES
export function requestUpdateLanguages( values, pageNumber) {
    return {
        type: types.REQUEST_EDIT_LANGUAGES,
        values, pageNumber
    }
}

export function updateLanguagesSuccess(languageId, values, message) {
    return {
        type: types.EDIT_LANGUAGES_SUCCESS,
        values, languageId, message
    }
}

//DELETE CATEGORIES ACTION
export function requestDeleteLanguages(languageId) {
    return {
        type: types.REQUEST_DELETE_LANGUAGES,
        languageId
    }
}

export function deleteLanguagesSuccess(languageId, message) {
    return {
        type: types.DELETE_LANGUAGES_SUCCESS,
        languageId, message
    }
}
