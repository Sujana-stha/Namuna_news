import * as types from './action-types';

//Get list of all categories
export function requestAllCategories() {
    return {
        type: types.REQUEST_ALL_CATEGORIES
    }
}
export function getAllCategories(categories) {
    return {
        type: types.CATEGORIES_LIST_ALL,
        categories
    }
}

//GET LIST OF CATEGORIES ACTION
export function requestCategories(pageNumber) {
    return {
        type: types.REQUEST_CATEGORIES,
        pageNumber
        
    }
}

export function getCategoriesSuccess(categories) {
    return {
        type: types.GET_CATEGORIES_SUCCESS,
        categories
    }
}

// CATEGORIES FAILED ACTION
export function requestCategoriesFailed() {
    return {
        type: types.REQUEST_CATEGORIES_FAILED
    }
}

// ADD NEW CATEGORIES ACTION
export function requestAddCategories(values, pageNumber) {
    return {
        type: types.REQUEST_ADD_CATEGORIES,
        values, pageNumber
    }
}

export function addCategoriesSuccess(values, message) {
    return {
        type: types.ADD_CATEGORIES_SUCCESS,
        values,
        message
    }
}

//EDIT CATEGORIES ACTION
export function requestUpdateCategories( values, pageNumber) {
    return {
        type: types.REQUEST_EDIT_CATEGORIES,
        values, pageNumber
    }
}

export function updateCategoriesSuccess(categoryId, values, message) {
    return {
        type: types.EDIT_CATEGORIES_SUCCESS,
        values, categoryId, message
    }
}

//DELETE CATEGORIES ACTION ACTION
export function requestDeleteCategories(categoryId) {
    return {
        type: types.REQUEST_DELETE_CATEGORIES,
        categoryId
    }
}

export function deleteCategoriesSuccess(categoryId, message) {
    return {
        type: types.DELETE_CATEGORIES_SUCCESS,
        categoryId, message
    }
}

