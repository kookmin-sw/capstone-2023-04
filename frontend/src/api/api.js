import axios from 'axios';

const API = axios.create({
    baseURL: process.env.REACT_APP_IP,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});
axios.defaults.baseURL = process.env.REACT_APP_IP;
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

export default API;