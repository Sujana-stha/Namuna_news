import * as types from './action-types';

//GET LIST OF NEWS_TRANSLATION
export function requestNewsTranslation(pageNumber) {
    return {
        type: types.REQUEST_NEWS_TRANSLATION,
        pageNumber
    }
}

export function getNewsTranslationSuccess(newsTrans) {
    return {
        type: types.GET_NEWS_TRANSLATION_SUCCESS,
        newsTrans
    }
}

//ERROR FOR TRANSLATED NEWS
export function requestNewsTranslationFailed() {
    return {
        type: types.REQUEST_NEWS_TRANSLATION_FAILED
    }
}

// ADD NEW NEWS_TRANSLATION
export function requestAddNewsTranslation(values, pageNumber, newsValues) {
    return {
        type: types.REQUEST_ADD_NEWS_TRANSLATION,
        values, pageNumber, newsValues
    }
}

export function addNewsTranslationSuccess(values, message) {
    return {
        type: types.ADD_NEWS_TRANSLATION_SUCCESS,
        values,
        message
    }
}

//EDIT NEWS_TRANSLATION
export function requestUpdateNewsTranslation( values, pageNumber) {
    return {
        type: types.REQUEST_EDIT_NEWS_TRANSLATION,
        values, pageNumber
    }
}

export function updateNewsTranslationSuccess(newsTransId, values, message) {
    return {
        type: types.EDIT_NEWS_TRANSLATION_SUCCESS,
        values, newsTransId, message
    }
}

//DELETE NEWS_TRANSLATION ACTION
export function requestDeleteNewsTranslation(newsTransId) {
    return {
        type: types.REQUEST_DELETE_NEWS_TRANSLATION,
        newsTransId
    }
}

export function deleteNewsTranslationSuccess(newsTransId, message) {
    return {
        type: types.DELETE_NEWS_TRANSLATION_SUCCESS,
        newsTransId, message
    }
}
