
import axios, {getHeaders} from './axiosInstance'

//GET ALL CATEGORIES TRANSLATION TRANSLATION API
export function getCategoriesTrans() {
    const access_token = window.localStorage.getItem('access_token')
    const headers = getHeaders(access_token)
    console.log('api', headers)
    return axios.get('/api/category-translation',{headers})
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    });
}

// ADD NEW CATEGORIES TRANSLATION TRANSLATION API
export function addCategoriesTrans(values) {
    const access_token = window.localStorage.getItem('access_token')
    const headers = getHeaders(access_token)
    return axios.post('/api/category-translation', values,{headers})
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    });
}

//DELETE CATEGORIES TRANSLATION TRANSLATION API
export function deleteCategoriesTrans(categoryTransId) {
    const access_token = window.localStorage.getItem('access_token')
    const headers = getHeaders(access_token)
    return axios.delete('/api/category-translation/'+ categoryTransId,{headers})
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    });
}

// UPDATE CATEGORIES TRANSLATION API
export function updateCategoriesTrans(categoryTransId, values) {
    const access_token = window.localStorage.getItem('access_token')
    const headers = getHeaders(access_token)
    return axios.put('/api/category-translation/'+ categoryTransId, values,{headers})
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    });
}

// GET SINGLE DATA OF CAtegories
export function getSingleCategoriesTrans (categoryTransId) {
    const access_token = window.localStorage.getItem('access_token')
    const headers = getHeaders(access_token)
    return axios.get('/api/category-translation/'+categoryTransId,{headers})
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    });
}