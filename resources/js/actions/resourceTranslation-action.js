import * as types from './action-types';

//GET LIST OF RESOURCES_TRANSLATION
export function requestResourcesTranslation() {
    return {
        type: types.REQUEST_RESOURCE_TRANSLATION
    }
}

export function getResourcesTranslationSuccess(resourceTrans) {
    return {
        type: types.GET_RESOURCE_TRANSLATION_SUCCESS,
        resourceTrans
    }
}

export function requestResourcesTranslationFailed() {
    return {
        type: types.REQUEST_RESOURCE_TRANSLATION_FAILED
    }
}

// ADD NEW RESOURCES_TRANSLATION
export function requestAddResourcesTranslation(values) {
    return {
        type: types.REQUEST_ADD_RESOURCE_TRANSLATION,
        values
    }
}

export function addResourcesTranslationSuccess(values, message) {
    return {
        type: types.ADD_RESOURCE_TRANSLATION_SUCCESS,
        values,
        message
    }
}

//EDIT RESOURCES_TRANSLATION
export function requestUpdateResourcesTranslation( values) {
    return {
        type: types.REQUEST_EDIT_RESOURCE_TRANSLATION,
        values
    }
}

export function updateResourcesTranslationSuccess(resourceTransId, values, message) {
    return {
        type: types.EDIT_RESOURCE_TRANSLATION_SUCCESS,
        values, resourceTransId, message
    }
}

//DELETE RESOURCES_TRANSLATION ACTION
export function requestDeleteResourcesTranslation(resourceTransId) {
    return {
        type: types.REQUEST_DELETE_RESOURCE_TRANSLATION,
        resourceTransId
    }
}

export function deleteResourcesTranslationSuccess(resourceTransId, message) {
    return {
        type: types.DELETE_RESOURCE_TRANSLATION_SUCCESS,
        resourceTransId, message
    }
}
