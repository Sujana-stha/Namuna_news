import * as types from './action-types';

//GET LIST OF NEWS
export function requestNews(pageNumber) {
    return {
        type: types.REQUEST_NEWS,
        pageNumber
    }
}

export function getNewsSuccess(news) {
    return {
        type: types.GET_NEWS_SUCCESS,
        news
    }
}

// ERROR FOR NEWS
export function requestNewsFailed() {
    return {
        type: types.REQUEST_NEWS_FAILED
    }
}

// ADD NEW NEWS
export function requestAddNews(values, pageNumber) {
    return {
        type: types.REQUEST_ADD_NEWS,
        values, pageNumber
    }
}

export function addNewsSuccess(values, message) {
    return {
        type: types.ADD_NEWS_SUCCESS,
        values,
        message
    }
}

//EDIT NEWS
export function requestUpdateNews( values, pageNumber) {
    return {
        type: types.REQUEST_EDIT_NEWS,
        values, pageNumber
    }
}

export function updateNewsSuccess(newsId, values, message) {
    return {
        type: types.EDIT_NEWS_SUCCESS,
        values, newsId, message
    }
}

//DELETE NEWS ACTION
export function requestDeleteNews(newsId) {
    return {
        type: types.REQUEST_DELETE_NEWS,
        newsId
    }
}

export function deleteNewsSuccess(newsId, message) {
    return {
        type: types.DELETE_NEWS_SUCCESS,
        newsId, message
    }
}
