
import axios, {getHeaders} from './axiosInstance'

//GET ALL NEWS API
export function getNews(pageNumber) {
    const access_token = window.localStorage.getItem('access_token')
    const headers = getHeaders(access_token)
    return axios.get(`/api/news?page=${pageNumber}`,{headers})
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    });
}

function formValues(values) {
    let images = values.featured_image;
    var formData = new FormData();

    formData.append('slug', values.slug);
    formData.append('author_id', values.author_id);
    formData.append('category_id', values.category_id);
    formData.append('keywords', values.keywords);
    formData.append('news_label', values.news_label);
    formData.append('province_id', values.province_id);
    formData.append('status', values.status);
    // if(images) { images.map(image=>{
        formData.append('featured_image', images)
        
    // })
    return formData;
// }
}

// ADD NEW NEWS API
export function addNews(values) {
    const access_token = window.localStorage.getItem('access_token')
    const headers = getHeaders(access_token)
    console.log(headers);
    const data = formValues(values)
    return axios.post('/api/news', data,{headers})
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
    console.log("Updated:");
    console.log(values);
    const access_token = window.localStorage.getItem('access_token')
    const headers = getHeaders(access_token)
    const data = formValues(values)
    return axios.put('/api/news/'+ newsId, data,{headers})
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
