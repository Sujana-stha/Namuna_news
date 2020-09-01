
import axios, {getHeaders} from './axiosInstance'

//GET ALL RESOURCES TRANSLATION  API
export function getResourcesTrans(pageNumber) {
    const access_token = window.localStorage.getItem('access_token')
    const headers = getHeaders(access_token)
    return axios.get(`/api/resource-translation?page=${pageNumber}`,{headers})
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    });
}

// ADD NEW RESOURCES TRANSLATION API
export function addResourcesTrans(values) {
    const access_token = window.localStorage.getItem('access_token')
    const headers = getHeaders(access_token)
    return axios.post('/api/resource-translation', values,{headers})
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    });
}

//DELETE RESOURCES TRANSLATION API
export function deleteResourcesTrans(resourceTransId) {
    const access_token = window.localStorage.getItem('access_token')
    const headers = getHeaders(access_token)
    return axios.delete('/api/resource-translation/'+ resourceTransId,{headers})
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    });
}

// UPDATE RESOURCES TRANSLATION API
export function updateResourcesTrans(resourceTransId, values) {
    const access_token = window.localStorage.getItem('access_token')
    const headers = getHeaders(access_token)
    return axios.put('/api/resource-translation/'+ resourceTransId, values,{headers})
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    });
}

// GET SINGLE DATA OF RESOURCES TRANSLATION
export function getSingleResourcesTrans (resourceTransId) {
    const access_token = window.localStorage.getItem('access_token')
    const headers = getHeaders(access_token)
    return axios.get('/api/resource-translation/'+resourceTransId,{headers})
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    });
}