
import axios, {getHeaders} from './axiosInstance'

//GET ALL PROVINCES TRANSLATION TRANSLATION API
export function getProvincesTrans(pageNumber) {
    const access_token = window.localStorage.getItem('access_token')
    const headers = getHeaders(access_token)
    return axios.get(`/api/province-translation?page=${pageNumber}`,{headers})
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    });
}

// ADD NEW PROVINCES TRANSLATION TRANSLATION API
export function addProvincesTrans(values) {
    const access_token = window.localStorage.getItem('access_token')
    const headers = getHeaders(access_token)
    return axios.post('/api/province-translation', values,{headers})
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    });
}

//DELETE PROVINCES TRANSLATION API
export function deleteProvincesTrans(provinceTransId) {
    const access_token = window.localStorage.getItem('access_token')
    const headers = getHeaders(access_token)
    return axios.delete('/api/province-translation/'+ provinceTransId,{headers})
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    });
}

// UPDATE PROVINCES TRANSLATION API
export function updateProvincesTrans(provinceTransId, values) {
    const access_token = window.localStorage.getItem('access_token')
    const headers = getHeaders(access_token)
    return axios.put('/api/province-translation/'+ provinceTransId, values,{headers})
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    });
}

// GET SINGLE DATA OF PROVINCES TRANSLATION
export function getSingleProvincesTrans (provinceTransId) {
    const access_token = window.localStorage.getItem('access_token')
    const headers = getHeaders(access_token)
    return axios.get('/api/province-translation/'+provinceTransId,{headers})
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    });
}