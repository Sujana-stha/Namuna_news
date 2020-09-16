
import axios, {getHeaders} from './axiosInstance'

//GET ALL USERS API
export function getSubscribers(pageNumber) {
    const access_token = window.localStorage.getItem('access_token')
    const headers = getHeaders(access_token)
    return axios.get(`/api/subscribers?page=${pageNumber}`,{headers})
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    });
}

//DELETE USERS API
export function deleteSubscribers(subscribeId) {
    const access_token = window.localStorage.getItem('access_token')
    const headers = getHeaders(access_token)
    return axios.delete('/api/subscribers/'+ subscribeId,{headers})
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    });
}

