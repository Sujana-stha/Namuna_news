
import axios, {getHeaders} from './axiosInstance'

//GET ALL CATEGORIES API
export function getCategories(pageNumber) {
    const access_token = window.localStorage.getItem('access_token')
    const headers = getHeaders(access_token)
    return axios.get(`/api/categories?page=${pageNumber}`,{headers})
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    });
}

// ADD NEW CATEGORIES API
export function addCategories(values) {
    // console.log(values);
    const access_token = window.localStorage.getItem('access_token')
    const headers = getHeaders(access_token)
    console.log(headers);
    return axios.post('/api/categories', values,{headers})
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    });
}

//DELETE CATEGORIES API
export function deleteCategories(categoryId) {
    const access_token = window.localStorage.getItem('access_token')
    const headers = getHeaders(access_token)
    return axios.delete('/api/categories/'+ categoryId,{headers})
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    });
}

// UPDATE CATEGORIES API
export function updateCategories(categoryId, values) {
    const access_token = window.localStorage.getItem('access_token')
    const headers = getHeaders(access_token)
    return axios.put('/api/categories/'+ categoryId, values,{headers})
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    });
}

// GET SINGLE DATA OF CAtegories
export function getSingleCategories (categoryId) {
    const access_token = window.localStorage.getItem('access_token')
    const headers = getHeaders(access_token)
    return axios.get('/api/categories/'+categoryId,{headers})
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    });
}

// Get all data of categories
export function getAllCategories() {
    const access_token = window.localStorage.getItem('access_token')
    const headers = getHeaders(access_token)
    return axios.get(`/api/categories/all`,{headers})
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    });
}
