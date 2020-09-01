
import axios, {getHeaders} from './axiosInstance'

//GET ALL NEWS TRANSLATION API
export function getNewsTrans(pageNumber) {
    const access_token = window.localStorage.getItem('access_token')
    const headers = getHeaders(access_token)
    return axios.get(`/api/news-translation?page=${pageNumber}`,{headers})
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    });
}

// ADD NEW NEWS TRANSLATION API
export function addNewsTrans(values) {
    const access_token = window.localStorage.getItem('access_token')
    const headers = getHeaders(access_token)
    return axios.post('/api/news-translation', values,{headers})
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    });
}

//DELETE NEWS TRANSLATION API
export function deleteNewsTrans(newsTransId) {
    const access_token = window.localStorage.getItem('access_token')
    const headers = getHeaders(access_token)
    return axios.delete('/api/news-translation/'+ newsTransId,{headers})
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    });
}

// UPDATE NEWS TRANSLATION API
export function updateNewsTrans(newsTransId, values) {
    const access_token = window.localStorage.getItem('access_token')
    const headers = getHeaders(access_token)
    return axios.put('/api/news-translation/'+ newsTransId, values,{headers})
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    });
}

// GET SINGLE DATA OF NEWS TRANSLATION
export function getSingleNewsTrans (newsTransId) {
    const access_token = window.localStorage.getItem('access_token')
    const headers = getHeaders(access_token)
    return axios.get('/api/news-translation/'+newsTransId,{headers})
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    });
}