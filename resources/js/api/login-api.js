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