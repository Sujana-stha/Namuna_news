import axios from 'axios';
const base_url = `http://localhost:8000`
const access_token = window.localStorage.getItem('access_token')
const axiosInstance = axios.create ({
    baseURL: base_url,
    headers: {'Authorization':`Bearer ${access_token}`, 'X-Requested-With': 'XMLHttpRequest'}
})

export const getHeaders = ()=> {
    const access_token = window.localStorage.getItem('access_token')
    return {
        Authorization: `Bearer ${access_token}`
    }
}
export default axiosInstance;
