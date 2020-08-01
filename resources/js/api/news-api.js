
import axios, {getHeaders} from './axiosInstance'

//GET ALL NEWS API
export function getNews() {
    const access_token = window.localStorage.getItem('access_token')
    const headers = getHeaders(access_token)
    return axios.get('/api/news',{headers})
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    });
}

// ADD NEW NEWS API
export function addNews(values) {
    const access_token = window.localStorage.getItem('access_token')
    const headers = getHeaders(access_token)
    return axios.post('/api/news', values,{headers})
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    });
}

//DELETE NEWS API
export function deleteNews(newsId) {
    const access_token = window.localStorage.getItem('access_token')
    const headers = getHeaders(access_token)
    return axios.delete('/api/news/'+ newsId,{headers})
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    });
}

// UPDATE NEWS API
export function updateNews(newsId, values) {
    const access_token = window.localStorage.getItem('access_token')
    const headers = getHeaders(access_token)
    return axios.put('/api/news/'+ newsId, values,{headers})
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    });
}

// GET SINGLE DATA OF NEWS
export function getSingleNews (newsId) {
    const access_token = window.localStorage.getItem('access_token')
    const headers = getHeaders(access_token)
    return axios.get('/api/news/'+newsId,{headers})
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    });
}