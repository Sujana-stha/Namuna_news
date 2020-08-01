
import axios, {getHeaders} from './axiosInstance'

//GET ALL LANGUAGES API
export function getLanguages() {
    const access_token = window.localStorage.getItem('access_token')
    const headers = getHeaders(access_token)
    return axios.get('/api/languages',{headers})
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    });
}

// ADD NEW LANGUAGES API
export function addLanguages(values) {
    const access_token = window.localStorage.getItem('access_token')
    const headers = getHeaders(access_token)
    return axios.post('/api/languages', values,{headers})
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    });
}

//DELETE LANGUAGES API
export function deleteLanguages(languageId) {
    const access_token = window.localStorage.getItem('access_token')
    const headers = getHeaders(access_token)
    return axios.delete('/api/languages/'+ languageId,{headers})
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    });
}

// UPDATE LANGUAGES API
export function updateLanguages(languageId, values) {
    const access_token = window.localStorage.getItem('access_token')
    const headers = getHeaders(access_token)
    return axios.put('/api/languages/'+ languageId, values,{headers})
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    });
}

// GET SINGLE DATA OF LANGUAGES
export function getSingleLanguages (languageId) {
    const access_token = window.localStorage.getItem('access_token')
    const headers = getHeaders(access_token)
    return axios.get('/api/languages/'+languageId,{headers})
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    });
}