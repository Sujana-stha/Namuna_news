
import axios, {getHeaders} from './axiosInstance'

//GET ALL PROVINCES API
export function getProvinces() {
    const access_token = window.localStorage.getItem('access_token')
    const headers = getHeaders(access_token)
    return axios.get('/api/province',{headers})
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    });
}

// ADD NEW PROVINCES API
export function addProvinces(values) {
    const access_token = window.localStorage.getItem('access_token')
    const headers = getHeaders(access_token)
    return axios.post('/api/province', values,{headers})
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    });
}

//DELETE PROVINCES API
export function deleteProvinces(provinceId) {
    const access_token = window.localStorage.getItem('access_token')
    const headers = getHeaders(access_token)
    return axios.delete('/api/province/'+ provinceId,{headers})
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    });
}

// UPDATE PROVINCES API
export function updateProvinces(provinceId, values) {
    const access_token = window.localStorage.getItem('access_token')
    const headers = getHeaders(access_token)
    return axios.put('/api/province/'+ provinceId, values,{headers})
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    });
}

// GET SINGLE DATA OF PROVINCES
export function getSingleProvinces (provinceId) {
    const access_token = window.localStorage.getItem('access_token')
    const headers = getHeaders(access_token)
    return axios.get('/api/province/'+provinceId,{headers})
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    });
}