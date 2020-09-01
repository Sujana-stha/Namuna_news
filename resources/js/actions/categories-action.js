import * as types from './action-types';

//GET LIST OF CATEGORIES
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

export function requestCategoriesFailed() {
    return {
        type: types.REQUEST_CATEGORIES_FAILED
    }
}

// ADD NEW CATEGORIES
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

//EDIT CATEGORIES
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

//DELETE CATEGORIES ACTION
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

//CHANHE CATEGORIES STATUS
export function requestCategoriesStatus (categoryId,values) {
    return {
        type: types.REQUEST_CHANGE_CATEGORIES_STATUS,
        values,
        categoryId 
    }
}

export function CategoriesStatusSuccess (categoryId, values) {
    return {
        type: types.CHANGE_CATEGORIES_STATUS_SUCCESS,
        values,
        categoryId,
        message
    }
}