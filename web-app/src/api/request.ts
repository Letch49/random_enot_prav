import axios from 'axios';

export const API_URL = 'http://192.168.1.118/'

const getAuthorization = () => {
    const authorization = `Bearer ${localStorage.getItem('token')}`;

    const isToken = Boolean(localStorage.getItem('token'));
    return isToken ? {authorization} : {}
}

const request = (url: string) => ({
    get: async () => await axios.get(`${API_URL}${url}`, {headers: getAuthorization()}),
    post: async (data) => await axios.post(`${API_URL}${url}`, {...data}, {headers: getAuthorization()})
})

export default request