import axios from 'axios';
// import {getHeaders} from './axiosInstance'

const URL = `http://54.254.62.41`

//LOGIN API
export function login(values) {
    console.log('api', values)
    // const headers = getHeaders
    return axios.post(`${URL}/api/auth/login`, values)
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    });
}

//LOGOUT API
export function logout() {
    const access_token = window.localStorage.getItem('access_token')
    const headers = {Accept: "application/json", Authorization: `Bearer ${access_token}`};
    return axios.post('/api/auth/logout',{},{headers: {...headers}})
    .catch(error=> {
        return {
            errors: error
        }
    })
}