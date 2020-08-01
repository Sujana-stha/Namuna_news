import axios from 'axios';
// import {getHeaders} from './axiosInstance'

const URL = `http://127.0.0.1:8000`

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