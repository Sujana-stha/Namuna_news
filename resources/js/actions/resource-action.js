import * as types from './action-types';

//GET LIST OF RESOURCES
export function requestResources() {
    return {
        type: types.REQUEST_RESOURCES
    }
}

export function getResourcesSuccess(resources) {
    return {
        type: types.GET_RESOURCES_SUCCESS,
        resources
    }
}

export function requestResourcesFailed() {
    return {
        type: types.REQUEST_RESOURCES_FAILED
    }
}

// ADD NEW RESOURCES
export function requestAddResources(values) {
    return {
        type: types.REQUEST_ADD_RESOURCES,
        values
    }
}

export function addResourcesSuccess(values, message) {
    return {
        type: types.ADD_RESOURCES_SUCCESS,
        values,
        message
    }
}

//EDIT RESOURCES
export function requestUpdateResources( values) {
    return {
        type: types.REQUEST_EDIT_RESOURCES,
        values
    }
}

export function updateResourcesSuccess(resourceId, values, message) {
    return {
        type: types.EDIT_RESOURCES_SUCCESS,
        values, resourceId, message
    }
}

//DELETE RESOURCES ACTION
export function requestDeleteResources(resourceId) {
    return {
        type: types.REQUEST_DELETE_RESOURCES,
        resourceId
    }
}

export function deleteResourcesSuccess(resourceId, message) {
    return {
        type: types.DELETE_RESOURCES_SUCCESS,
        resourceId, message
    }
}
