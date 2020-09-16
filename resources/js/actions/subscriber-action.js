import * as types from './action-types';

//GET LIST OF Subscription
export function requestSubscription(pageNumber) {
    return {
        type: types.REQUEST_SUBSCRIBERS,
        pageNumber
    }
}

export function getSubscriptionSuccess(subscription) {
    return {
        type: types.GET_SUBSCRIBERS_SUCCESS,
        subscription
    }
}

//ERROR FOR TRANSLATED RESOURCES
export function requestSubscriptionError() {
    return {
        type: types.REQUEST_SUBSCRIBERS_FAILED
    }
}

//DELETE RESOURCES_TRANSLATION ACTION
export function requestDeleteSubscription(subscribeId) {
    return {
        type: types.REQUEST_DELETE_SUBSCRIBERS,
        subscribeId
    }
}

export function deleteSubscribeSuccess(subscribeId) {
    return {
        type: types.DELETE_SUBSCRIBERS_SUCCESS,
        subscribeId
    }
}
